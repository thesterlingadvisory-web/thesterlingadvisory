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
        documents: ['PAN Card', 'Aadhaar Card', 'Bank Statement', 'Office Address Proof (Utility Bill)'],
        fees: '₹0 (Govt fee) - usually depends on underlying registrations like MSME/GST.',
        timeline: '2-4 Days',
      },
      {
        id: 'partnership',
        title: 'Partnership Firm Registration',
        slug: 'partnership-firm-registration',
        shortDesc: 'Formalize a business with two or more co-founders.',
        documents: ['Partnership Deed', 'PAN & Aadhaar of all partners', 'Office Address Proof'],
        fees: 'Varies by state (Approx ₹1,500 - ₹3,000 Govt Fee)',
        timeline: '7-10 Days',
      },
      {
        id: 'llp',
        title: 'LLP Registration',
        slug: 'llp-registration',
        shortDesc: 'Limited Liability Partnership for professional services.',
        documents: ['PAN & Aadhaar of Partners', 'Passport size photos', 'Office Address Proof (NOC & Utility Bill)'],
        fees: '₹500 - ₹2,000 (Govt Fee based on contribution)',
        timeline: '10-14 Days',
      },
      {
        id: 'private-limited',
        title: 'Private Limited Company Incorporation',
        slug: 'private-limited-company',
        shortDesc: 'The most preferred structure for startups and scalable businesses.',
        documents: ['PAN & Aadhaar of Directors', 'Passport/Voter ID', 'Bank Statement', 'Utility Bill for Regd Office'],
        fees: 'Starts at ₹0 SPICe+ Govt fee for Authorized Capital up to 15L (Stamp duty applies state-wise).',
        timeline: '10-15 Days',
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
        shortDesc: 'Mandatory for businesses crossing threshold turnover or inter-state sales.',
        documents: ['PAN Card', 'Aadhaar Card', 'Proof of Business Registration', 'Address Proof (Electricity Bill/Rent Agreement)', 'Bank Account Statement/Cancelled Cheque'],
        fees: '₹0 (No Govt Fee for basic registration)',
        timeline: '3-7 Days',
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
      { id: 'epf', title: 'EPF Registration', slug: 'epf-registration', shortDesc: 'Provident fund setup for employee benefits.' },
      { id: 'esic', title: 'ESIC Registration', slug: 'esic-registration', shortDesc: 'Employee State Insurance for health benefits.' },
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
        shortDesc: 'Protect your brand name, logo, or slogan.',
        documents: ['Logo/Brand Name', 'Applicant PAN & Aadhaar', 'MSME Certificate (for fee discount)', 'User Affidavit (if already in use)'],
        fees: '₹4,500 (Individuals/MSME/Startups) or ₹9,000 (Others)',
        timeline: 'Filing in 1-2 days (Registry approval 6-12 months)',
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
        shortDesc: 'Avail priority lending and govt scheme benefits.',
        documents: ['Aadhaar Card of Applicant', 'PAN Card of Business', 'Bank Account Details'],
        fees: '₹0 (No Govt Fee)',
        timeline: '1-3 Days',
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
        shortDesc: 'Mandatory food safety license for food businesses.',
        documents: ['Photo ID', 'Address Proof', 'List of Food Products', 'Layout Plan (for Mfg)'],
        fees: '₹100/yr (Basic) to ₹7,500/yr (Central)',
        timeline: '7-30 Days depending on category',
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
      { id: 'iec', title: 'Import Export Code (IEC)', slug: 'iec-registration', shortDesc: 'Mandatory 10-digit code for foreign trade.' },
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
      { id: 'dsc', title: 'Digital Signature Certificate (DSC)', slug: 'dsc-registration', shortDesc: 'Class 3 DSC for e-filing.' },
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
