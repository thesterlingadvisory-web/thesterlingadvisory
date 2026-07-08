export const serviceCategories = [
  {
    id: 'business-registrations',
    title: 'Business Registrations',
    icon: 'Landmark',
    description: 'Establish your entity with proper legal structure and compliance.',
    services: [
      {
        id: 'proprietorship',
        title: 'Proprietorship Setup',
        slug: 'proprietorship-setup',
        shortDesc: 'Quickest way to start a business for single founders.',
        documents: [
          'PAN Card of Proprietor',
          'Aadhaar Card',
          'Bank Statement or Cancelled Cheque',
          'Passport Size Photograph',
          'Office Address Proof (Utility Bill < 2 months old)',
          'NOC from Property Owner'
        ],
        fees: '₹0 Govt fee (Usually established via MSME Udyam or GST which have no base govt fee).',
        timeline: '2-4 Business Days',
      },
      {
        id: 'partnership',
        title: 'Partnership Firm Registration',
        slug: 'partnership-firm-registration',
        shortDesc: 'Formalize a business with two or more co-founders via a Registered Deed.',
        documents: ['Partnership Deed*', 'PAN & Aadhaar of all partners', 'Office Address Proof (Utility Bill)', 'NOC from Premises Owner'],
        fees: 'Approx ₹1,500 - ₹3,000 Govt Fee (Varies significantly by State Registrar of Firms).',
        timeline: '7-12 Business Days',
      },
      {
        id: 'llp',
        title: 'LLP Registration',
        slug: 'llp-registration',
        shortDesc: 'Limited Liability Partnership offering corporate benefits with flexible management.',
        documents: [
          'PAN Card of all Partners',
          'Aadhaar Card of all Partners',
          'Address Proof (Bank Statement or Utility Bill < 2 months old)',
          'Passport Size Photographs',
          'Digital Signature Certificate (DSC) for all Partners',
          'Registered Office Proof (Electricity/Water Bill < 2 months old)',
          'NOC from Property Owner'
        ],
        fees: '₹500 - ₹5,000 Govt Fee (Based on capital contribution and state stamp duty).',
        timeline: '10-15 Business Days',
      },
      {
        id: 'private-limited',
        title: 'Private Limited Company Incorporation',
        slug: 'private-limited-company',
        shortDesc: 'The most preferred structure for startups and scalable businesses.',
        documents: [
          'Memorandum & Articles of Association (MoA & AoA)*',
          'PAN Card of all Directors',
          'Aadhaar Card of all Directors',
          'Identity Proof (Voter ID / Passport / Driving License)',
          'Address Proof (Bank Statement or Utility Bill < 2 months old)',
          'Passport Size Photographs',
          'Digital Signature Certificate (DSC) for all Directors',
          'Registered Office Proof (Electricity/Water Bill < 2 months old)',
          'NOC from Property Owner'
        ],
        fees: '₹7,500 - ₹15,000+ (Zero SPICe+ Govt fee for Capital < 15L, but State Stamp Duty, MoA/AoA, and Name Reservation fees apply).',
        timeline: '10-15 Business Days',
      },
      { id: 'opc', title: 'One Person Company (OPC)', slug: 'opc-registration', shortDesc: 'Corporate structure for a single founder.' },
      { id: 'section-8', title: 'Section 8 Company Registration', slug: 'section-8-company', shortDesc: 'Non-profit organization setup.' },
      { id: 'trust', title: 'Trust Registration', slug: 'trust-registration', shortDesc: 'Private or public trust setup.' },
      { id: 'society', title: 'Society Registration', slug: 'society-registration', shortDesc: 'State-level society incorporation.' },
    ]
  },
  {
    id: 'tax-registrations',
    title: 'Tax Registrations',
    icon: 'BarChart2',
    description: 'Ensure compliance with central and state taxation laws.',
    services: [
      {
        id: 'gst',
        title: 'GST Registration',
        slug: 'gst-registration',
        shortDesc: 'Mandatory for businesses crossing threshold turnover or engaging in inter-state sales.',
        documents: ['PAN Card of Business/Applicant', 'Aadhaar Card of Auth. Signatory', 'Proof of Business Registration', 'Address Proof (Electricity Bill/Rent Agreement)', 'Bank Statement/Cancelled Cheque'],
        fees: '₹0 (No Government Fee for basic new registration).',
        timeline: '3-7 Business Days (Subject to Aadhaar Auth/Physical verification)',
      },
      { id: 'gst-amendment', title: 'GST Amendment/Cancellation', slug: 'gst-amendment', shortDesc: 'Modify or cancel existing GST.' },
      { id: 'pan-tan', title: 'PAN & TAN Application', slug: 'pan-tan-application', shortDesc: 'Permanent Account & Tax Deduction Numbers.' },
      { id: 'pt', title: 'Professional Tax Registration', slug: 'professional-tax', shortDesc: 'State-specific tax on professionals and employers.' },
      { id: 'tds', title: 'TDS Registration', slug: 'tds-registration', shortDesc: 'Registration for deducting tax at source.' }
    ]
  },
  {
    id: 'labour-law',
    title: 'Labour Law Registrations',
    icon: 'Users',
    description: 'Manage workforce compliance seamlessly.',
    services: [
      {
        id: 'epf',
        title: 'EPF Registration',
        slug: 'epf-registration',
        shortDesc: 'Mandatory Employee Provident Fund registration for 20+ employees.',
        documents: ['PAN of Business', 'Certificate of Incorporation/Registration', 'Crossed Cancelled Cheque', 'Address Proof', 'Digital Signature (DSC) of Director/Partner'],
        fees: '₹0 (No Government Fee via Shram Suvidha Portal).',
        timeline: '3-5 Business Days',
      },
      {
        id: 'esic',
        title: 'ESIC Registration',
        slug: 'esic-registration',
        shortDesc: 'Employee State Insurance for health benefits (Mandatory for 10+ employees).',
        documents: ['PAN Card of Entity', 'Registration Certificate', 'List of Employees with salaries', 'Cancelled Cheque', 'Address Proof'],
        fees: '₹0 (No Government Fee via Shram Suvidha Portal).',
        timeline: '3-5 Business Days',
      },
      { id: 'lin', title: 'Labour Identification Number (LIN)', slug: 'lin-registration', shortDesc: 'Unified Labour Identification.' },
      { id: 'clra', title: 'CLRA Registration', slug: 'clra-registration', shortDesc: 'Contract Labour regulation and abolition act.' },
      { id: 'shops-est', title: 'Shops & Establishments Registration', slug: 'shops-establishments', shortDesc: 'Mandatory local municipal registration.' },
      { id: 'trade-license', title: 'Trade Licence (municipal)', slug: 'trade-licence', shortDesc: 'Permission to operate business locally.' },
      { id: 'factory-license', title: 'Factory Licence', slug: 'factory-licence', shortDesc: 'Approval for manufacturing setups.' },
    ]
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property',
    icon: 'Shield',
    description: 'Protect your brand, ideas, and innovations.',
    services: [
      {
        id: 'trademark',
        title: 'Trademark Registration',
        slug: 'trademark-registration',
        shortDesc: 'Protect your brand name, logo, or slogan from infringement.',
        documents: ['Logo/Brand Name Image', 'Applicant PAN & Aadhaar', 'Valid Udyam (MSME) Certificate (to claim 50% fee discount)', 'Signed Form TM-48 (Power of Attorney)*', 'User Affidavit (if claiming prior use)*'],
        fees: '₹4,500 per class (MSME/Startups/Individuals) | ₹9,000 per class (Companies/LLPs/Others).',
        timeline: 'Filing: 1-3 Days | Registry Approval: 6-12 Months (if no objections)',
      },
      { id: 'copyright', title: 'Copyright Registration', slug: 'copyright-registration', shortDesc: 'Protect creative, literary, or software works.' },
      { id: 'design', title: 'Design Registration', slug: 'design-registration', shortDesc: 'Protect the visual design of objects.' },
      { id: 'patent', title: 'Patent Filing', slug: 'patent-filing', shortDesc: 'Protect novel inventions (via patent professionals).' },
    ]
  },
  {
    id: 'msme-govt',
    title: 'MSME & Government',
    icon: 'CheckCircle2',
    description: 'Unlock government benefits and tenders.',
    services: [
      {
        id: 'udyam',
        title: 'Udyam (MSME) Registration',
        slug: 'udyam-registration',
        shortDesc: 'Avail priority lending, trademark discounts, and govt scheme benefits.',
        documents: ['Aadhaar Card of Applicant (must be linked to mobile)', 'PAN Card of Business', 'Bank Account Details (IFSC & Account No)', 'NIC Code of Business Activity'],
        fees: '₹0 (No Government Fee on official Udyam portal).',
        timeline: '1-2 Business Days',
      },
      { id: 'gem', title: 'GeM Seller Registration', slug: 'gem-registration', shortDesc: 'Register on Gov e-Marketplace.' },
      { id: 'nsic', title: 'NSIC Registration', slug: 'nsic-registration', shortDesc: 'National Small Industries Corporation.' },
      { id: 'startup-india', title: 'Startup India Recognition', slug: 'startup-india-recognition', shortDesc: 'DPIIT recognition for tax benefits.' },
      { id: 'dpiit', title: 'DPIIT Recognition', slug: 'dpiit-recognition', shortDesc: 'Department for Promotion of Industry.' },
      { id: 'zed', title: 'ZED Certification', slug: 'zed-certification', shortDesc: 'Zero Defect Zero Effect certification.' },
    ]
  },
  {
    id: 'industry-specific',
    title: 'Industry-Specific',
    icon: 'TrendingUp',
    description: 'Sector-specific operational licenses.',
    services: [
      {
        id: 'fssai',
        title: 'FSSAI Licence',
        slug: 'fssai-licence',
        shortDesc: 'Mandatory food safety license for manufacturers, retailers, and cloud kitchens.',
        documents: ['Photo ID (Aadhaar/PAN)', 'Premises Address Proof', 'List of Food Products', 'Layout Plan & Equipment List (Mandatory for Manufacturers)', 'Water Analysis Report (if applicable)'],
        fees: 'Basic (Turnover < 1.5Cr): ₹100/yr | State (1.5Cr - 50Cr): ₹2,000-₹5,000/yr | Central (> 50Cr): ₹7,500/yr.',
        timeline: '7-30 Business Days depending on category and inspection.',
      },
      { id: 'drug', title: 'Drug Licence', slug: 'drug-licence', shortDesc: 'For pharmacy and medical businesses.' },
      { id: 'cosmetics', title: 'Cosmetics Licence', slug: 'cosmetics-licence', shortDesc: 'Licence for cosmetics manufacturing.' },
      { id: 'legal-metrology', title: 'Legal Metrology Registration', slug: 'legal-metrology', shortDesc: 'For packaging and weighing standards.' },
      { id: 'fire-noc', title: 'Fire NOC', slug: 'fire-noc', shortDesc: 'No Objection Certificate from Fire Dept.' },
      { id: 'pollution', title: 'Pollution Control Board Consent', slug: 'pollution-control', shortDesc: 'Environmental consents for factories (CTE/CTO).' },
    ]
  },
  {
    id: 'import-export',
    title: 'Import-Export & Trade',
    icon: 'Landmark',
    description: 'Registrations for global trade.',
    services: [
      {
        id: 'iec',
        title: 'Import Export Code (IEC)',
        slug: 'iec-registration',
        shortDesc: 'Mandatory 10-digit code issued by DGFT for foreign trade.',
        documents: ['PAN Card of Business/Individual', 'Applicant Aadhaar', 'Cancelled Cheque', 'Premises Address Proof'],
        fees: '₹500 (Government DGFT Fee).',
        timeline: '2-4 Business Days',
      },
      { id: 'dgft', title: 'DGFT Authorizations', slug: 'dgft-authorizations', shortDesc: 'Directorate General of Foreign Trade.' },
      { id: 'rcmc', title: 'RCMC Registration', slug: 'rcmc-registration', shortDesc: 'Registration-cum-Membership Certificate.' },
      { id: 'ad-code', title: 'AD Code Registration', slug: 'ad-code', shortDesc: 'Authorized Dealer code for customs.' },
      { id: 'icegate', title: 'ICEGATE Registration', slug: 'icegate-registration', shortDesc: 'Customs e-filing portal registration.' },
    ]
  },
  {
    id: 'digital-other',
    title: 'Digital & Other',
    icon: 'CheckCircle2',
    description: 'Digital signatures and foundational compliance.',
    services: [
      { id: 'dsc', title: 'Digital Signature Certificate (DSC)', slug: 'dsc-registration', shortDesc: 'Class 3 DSC for MCA/GST e-filing.' },
      { id: 'din', title: 'Director Identification Number (DIN)', slug: 'din-registration', shortDesc: 'DIN application and KYC.' },
      { id: 'mca-kyc', title: 'MCA KYC', slug: 'mca-kyc', shortDesc: 'Annual KYC for Directors.' },
      { id: 'lei', title: 'LEI Registration', slug: 'lei-registration', shortDesc: 'Legal Entity Identifier for large transactions.' },
    ]
  }
];

// Helper to flatten and find a service by slug
export function getServiceBySlug(slug) {
  for (const category of serviceCategories) {
    const service = category.services.find(s => s.slug === slug);
    if (service) {
      return { ...service, category: category.title, categoryIcon: category.icon };
    }
  }
  return null;
}
