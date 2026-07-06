require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log("Starting seed process...");

  // Creating a user via admin API
  console.log("Attempting to create admin user...");
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: 'admin@thesterlingadvisory.com',
    password: 'admin123',
    email_confirm: true
  });

  if (authError) {
    if (authError.message.includes('already registered')) {
        console.log("Admin user already exists. Skipping user creation.");
    } else {
        console.error("Error creating user:", authError);
    }
  } else {
    console.log("Admin user created.");
    if (authData.user) {
        await supabase.from('profiles').upsert({
            id: authData.user.id,
            email: 'admin@thesterlingadvisory.com',
            full_name: 'Super Admin',
            role: 'SUPER_ADMIN'
        });
        console.log("Assigned SUPER_ADMIN role.");
    }
  }

  console.log("Seeding Homepage Sections...");
  const homepageSections = [
    { section_type: 'hero', content: { headline: "Strategic Advisory for Modern Businesses", subheadline: "Helping businesses navigate growth, governance, finance, compliance, funding, and transformation through integrated advisory solutions.", cta1: "Talk to an Advisor", cta2: "Explore Solutions" }, display_order: 1 },
    { section_type: 'trusted_by', content: { title: "Trusted By", logos: ["Startups", "MSMEs", "Corporates", "Family Businesses", "Investors", "Entrepreneurs"] }, display_order: 2 }
  ];

  for (const section of homepageSections) {
    await supabase.from('homepage_sections').insert(section);
  }

  console.log("Seeding Capabilities...");
  const capabilities = [
    { title: "Business Advisory", slug: "business-advisory", overview: "Business Structuring, Strategic Planning, Growth Advisory" },
    { title: "Financial Advisory", slug: "financial-advisory", overview: "Financial Planning, Virtual CFO, Business Valuation" },
    { title: "Governance & Compliance", slug: "governance-compliance", overview: "Corporate Compliance, Regulatory Advisory, GST Advisory" },
    { title: "Capital & Funding Advisory", slug: "capital-funding", overview: "Business Loans, Working Capital Finance, Project Reports" },
    { title: "Risk Advisory", slug: "risk-advisory", overview: "Internal Audit, Risk Assessment, Internal Controls" },
    { title: "Business Transformation", slug: "business-transformation", overview: "Digital Transformation, Operational Excellence, Cost Optimisation" }
  ];

  for (let i = 0; i < capabilities.length; i++) {
    const cap = capabilities[i];
    await supabase.from('capabilities').insert({
        ...cap,
        display_order: i + 1
    });
  }

  console.log("Seed process completed.");
}

seed().catch(console.error);
