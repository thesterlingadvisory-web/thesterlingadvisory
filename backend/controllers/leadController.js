const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const leadsFilePath = path.join(__dirname, '../data/leads.json');

// Initialize Supabase if keys exist
let supabase = null;
if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
  try {
    supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  } catch (err) {
    console.error('Supabase client init failed:', err.message);
  }
}

// Helper: read leads from file
function readLeadsFile() {
  try {
    if (!fs.existsSync(leadsFilePath)) {
      return [];
    }
    const data = fs.readFileSync(leadsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading leads.json:', err.message);
    return [];
  }
}

// Helper: write leads to file
function writeLeadsFile(leads) {
  try {
    const dir = path.dirname(leadsFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(leadsFilePath, JSON.stringify(leads, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing leads.json:', err.message);
  }
}

// @desc    Get all leads
// @route   GET /api/leads
exports.getLeads = async (req, res) => {
  try {
    // Check local storage first (plus optional sync with supabase)
    let leads = readLeadsFile();

    if (supabase) {
      try {
        const { data: dbLeads, error } = await supabase
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (!error && dbLeads && dbLeads.length > 0) {
          // Merge or prefer local if local has newer ticket formatting
          // For stability, return combined unique list sorted by date
          const localIds = new Set(leads.map(l => l.id));
          dbLeads.forEach(dl => {
            if (!localIds.has(dl.id)) {
              leads.push({
                id: dl.id,
                name: dl.name,
                email: dl.email,
                phone: dl.phone,
                company_name: dl.company_name,
                business_type: dl.interested_in?.split(' | ')[0] || 'General Inquiry',
                interested_in: dl.interested_in?.split(' | ') || ['General Consultation'],
                timeline: 'Standard (1-2 weeks)',
                message: dl.message,
                status: dl.status || 'NEW',
                created_at: dl.created_at,
                notes: ''
              });
            }
          });
        }
      } catch (e) {
        // Fallback silently to local file
      }
    }

    // Sort newest first
    leads.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    res.status(200).json({ success: true, count: leads.length, data: leads });
  } catch (error) {
    console.error('getLeads error:', error);
    res.status(500).json({ success: false, error: 'Server Error while fetching leads' });
  }
};

// @desc    Create a new consultation lead
// @route   POST /api/leads
exports.createLead = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      company_name = '',
      business_type = 'General Business',
      interested_in = [],
      timeline = 'Exploring',
      message = ''
    } = req.body;

    if (!name || !email) {
      return res.status(400).json({ success: false, error: 'Please provide at least a name and email' });
    }

    const ticketId = `ST-ADV-${Math.floor(1000 + Math.random() * 9000)}`;
    const newLead = {
      id: ticketId,
      name,
      email,
      phone: phone || 'Not Provided',
      company_name: company_name || 'Individual / Setup',
      business_type,
      interested_in: Array.isArray(interested_in) ? interested_in : [interested_in],
      timeline,
      message,
      status: 'NEW',
      created_at: new Date().toISOString(),
      notes: ''
    };

    // Save to local file
    const leads = readLeadsFile();
    leads.unshift(newLead);
    writeLeadsFile(leads);

    // Save to Supabase (non-blocking attempt)
    if (supabase) {
      try {
        await supabase.from('leads').insert([{
          name: newLead.name,
          email: newLead.email,
          phone: newLead.phone,
          company_name: newLead.company_name,
          interested_in: `${newLead.business_type} | ${newLead.interested_in.join(', ')} | Timeline: ${newLead.timeline}`,
          message: newLead.message,
          status: newLead.status,
          created_at: newLead.created_at
        }]);
      } catch (err) {
        console.warn('Supabase lead insert notice:', err.message);
      }
    }

    res.status(201).json({
      success: true,
      message: 'Consultation request booked successfully.',
      ticketId: newLead.id,
      data: newLead
    });
  } catch (error) {
    console.error('createLead error:', error);
    res.status(500).json({ success: false, error: 'Server Error while submitting consultation' });
  }
};

// @desc    Update lead status & notes
// @route   PATCH /api/leads/:id
exports.updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    let leads = readLeadsFile();
    const leadIndex = leads.findIndex(l => l.id === id);

    if (leadIndex === -1) {
      return res.status(404).json({ success: false, error: `No lead found with id ${id}` });
    }

    if (status !== undefined) leads[leadIndex].status = status;
    if (notes !== undefined) leads[leadIndex].notes = notes;

    writeLeadsFile(leads);

    // Also attempt update in Supabase if id matches UUID or stored
    if (supabase && id.length > 15) {
      try {
        const updates = {};
        if (status !== undefined) updates.status = status;
        await supabase.from('leads').update(updates).eq('id', id);
      } catch (err) {}
    }

    res.status(200).json({
      success: true,
      message: 'Lead updated successfully',
      data: leads[leadIndex]
    });
  } catch (error) {
    console.error('updateLead error:', error);
    res.status(500).json({ success: false, error: 'Server Error while updating lead' });
  }
};
