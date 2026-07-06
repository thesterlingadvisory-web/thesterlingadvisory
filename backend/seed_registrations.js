require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedRegistrations() {
  console.log("Starting registration seed process...");

  console.log("Clearing old capabilities and capability_services...");
  await supabase.from('capability_services').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('capabilities').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  const categories = [
    {
      title: "Business Setup",
      slug: "business-setup",
      overview: "Incorporate your business correctly from day one. We handle Private Limited, LLP, OPC, and NGO registrations with end-to-end guidance.",
      icon_url: "Landmark",
      services: [
        "Proprietorship Setup", "Partnership Firm Registration", "LLP Registration",
        "Private Limited Company Incorporation", "One Person Company (OPC)", 
        "Section 8 Company", "Trust Registration", "Society Registration"
      ]
    },
    {
      title: "Tax & Statutory",
      slug: "tax-statutory",
      overview: "Stay perfectly compliant with federal and state tax authorities. Comprehensive GST, PAN, TAN, and Professional Tax registrations.",
      icon_url: "BarChart2",
      services: [
        "GST Registration", "GST Amendment/Cancellation", "PAN & TAN Application",
        "Professional Tax Registration", "TDS Registration"
      ]
    },
    {
      title: "Workforce & Labour",
      slug: "workforce-labour",
      overview: "Ensure strict adherence to labour laws as you scale your team. Complete EPF, ESIC, and State Establishment registrations.",
      icon_url: "Users",
      services: [
        "EPF Registration", "ESIC Registration", "Labour Identification Number (LIN)",
        "CLRA Registration", "Shops & Establishments", "Trade Licence (Municipal)"
      ]
    },
    {
      title: "Intellectual Property",
      slug: "intellectual-property",
      overview: "Protect your brand, assets, and innovations globally with our specialized trademark, copyright, and patent filing services.",
      icon_url: "Shield",
      services: [
        "Trademark Registration", "Copyright Registration", "Design Registration", "Patent Filing"
      ]
    },
    {
      title: "Industry Licensing",
      slug: "industry-licensing",
      overview: "Navigate complex regulatory environments with specialized licences including FSSAI, Drug Licences, RERA, and Environmental approvals.",
      icon_url: "TrendingUp",
      services: [
        "FSSAI Licence", "Drug & Cosmetics Licence", "Import Export Code (IEC)",
        "RERA Registration", "Fire NOC", "Pollution Control Board Consent (CTE/CTO)"
      ]
    },
    {
      title: "Digital & Compliance",
      slug: "digital-compliance",
      overview: "Secure mandatory digital signatures, director identifications, and ongoing annual compliance filings with the Ministry of Corporate Affairs.",
      icon_url: "CheckCircle2",
      services: [
        "Digital Signature Certificate (DSC)", "Director Identification Number (DIN)",
        "MCA KYC", "LEI Registration", "Udyam (MSME) Registration", "Startup India Recognition"
      ]
    }
  ];

  for (let i = 0; i < categories.length; i++) {
    const cat = categories[i];
    console.log(`Inserting category: ${cat.title}`);
    
    const { data: capData, error: capError } = await supabase.from('capabilities').insert({
      title: cat.title,
      slug: cat.slug,
      overview: cat.overview,
      icon_url: cat.icon_url,
      display_order: i + 1
    }).select();

    if (capError) {
      console.error("Error inserting category:", capError);
      continue;
    }

    const capId = capData[0].id;

    for (let j = 0; j < cat.services.length; j++) {
      await supabase.from('capability_services').insert({
        capability_id: capId,
        title: cat.services[j],
        display_order: j + 1
      });
    }
  }

  console.log("Registration seed process completed successfully.");
}

seedRegistrations().catch(console.error);
