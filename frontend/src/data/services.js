export const serviceCategories = [
  {
    id: 'business-registrations',
    title: 'Corporate Formations',
    icon: 'Landmark',
    description: 'Structural incorporation, capital allocation, and initial statutory compliance.',
    services: [
      {
        id: 'proprietorship',
        title: 'Proprietorship Compliance & Bank Setup',
        slug: 'proprietorship-setup',
        shortDesc: 'Comprehensive statutory licensing (Udyam MSME, GST, and Shops & Establishment) required to formalize commercial identity and open a bank current account under individual PAN.',
        documents: [
          'PAN Card of Proprietor',
          'Aadhaar Card of Proprietor',
          'Active Bank Statement or Cancelled Cheque',
          'Passport Size Photograph',
          'Premises Utility Bill (< 2 months old)',
          'NOC / Consent Letter from Premises Owner'
        ],
        fees: 'Government Fees: As per actuals (Statutory baseline licensing via Udyam, GST & Shops Act).',
        timeline: '2-4 Business Days',
      },
      {
        id: 'partnership',
        title: 'Partnership Deed Registration',
        slug: 'partnership-firm-registration',
        shortDesc: 'Multi-founder governance framework registered with the State Registrar of Firms.',
        documents: ['Executed Partnership Deed*', 'PAN & Aadhaar of all Partners', 'Premises Utility Bill', 'Premises Owner NOC'],
        fees: 'Government Fees: As per actuals (Varies by State jurisdiction).',
        timeline: '7-12 Business Days',
      },
      {
        id: 'llp',
        title: 'Limited Liability Partnership (LLP)',
        slug: 'llp-registration',
        shortDesc: 'Corporate liability protection combined with operational flexibility.',
        documents: [
          'PAN Card of all Designated Partners',
          'Aadhaar Card of all Designated Partners',
          'Address Proof (Bank Statement or Utility Bill < 2 months old)',
          'Passport Size Photographs',
          'Digital Signature Certificate (DSC) for all Partners',
          'Registered Office Proof (Electricity/Water Bill < 2 months old)',
          'NOC from Property Owner'
        ],
        fees: 'Government Fees: As per actuals (Scaled to capital contribution & stamp duty).',
        timeline: '10-15 Business Days',
      },
      {
        id: 'private-limited',
        title: 'Private Limited Company Incorporation',
        slug: 'private-limited-company',
        shortDesc: 'Institutional entity structure designed for venture capital, equity allocation, and scale.',
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
        fees: 'Government Fees: As per actuals (State Stamp Duty & Name Reservation apply).',
        timeline: '10-15 Business Days',
      },
      { id: 'opc', title: 'One Person Company (OPC)', slug: 'opc-registration', shortDesc: 'Corporate liability isolation tailored for sole proprietors.' },
      { id: 'section-8', title: 'Section 8 Company Incorporation', slug: 'section-8-company', shortDesc: 'Statutory non-profit organization structure.' },
      { id: 'trust', title: 'Trust Deed Registration', slug: 'trust-registration', shortDesc: 'Fiduciary trust structuring for private and charitable estates.' },
      { id: 'society', title: 'Society Incorporation', slug: 'society-registration', shortDesc: 'State-level registered society framework.' },
    ]
  },
  {
    id: 'tax-registrations',
    title: 'GST & Tax Registrations',
    icon: 'BarChart2',
    description: 'Multi-jurisdictional GST and tax registrations across all Indian states and union territories.',
    services: [
      {
        id: 'gst',
        title: 'GST Registration & Structuring',
        slug: 'gst-registration',
        shortDesc: 'State and central tax registration required for inter-state commerce and threshold compliance.',
        documents: ['PAN Card of Business/Applicant', 'Aadhaar Card of Authorized Signatory', 'Proof of Business Formation', 'Premises Utility Bill / Lease Agreement', 'Bank Statement / Cancelled Cheque'],
        fees: 'Government Fees: As per actuals.',
        timeline: '3-7 Business Days (Subject to Aadhaar & Physical Verification)',
      },
      { id: 'gst-amendment', title: 'GST Amendment & Jurisdictional Transfer', slug: 'gst-amendment', shortDesc: 'Modification of core and non-core GST registration attributes including address, business type, and authorized signatory.' },
      { id: 'pan-tan', title: 'Corporate PAN & TAN Registration', slug: 'pan-tan-application', shortDesc: 'Permanent Account & Tax Deduction Account Number allocation for newly incorporated companies and LLPs.' },
      { id: 'pt', title: 'Professional Tax Enrolment', slug: 'professional-tax', shortDesc: 'State-mandated employer and employee professional tax registration required in applicable states.' },
      { id: 'tds', title: 'TDS Registration', slug: 'tds-registration', shortDesc: 'Tax Deduction at Source account registration required for businesses making payments to employees, vendors, and contractors.' },
    ]
  },
  {
    id: 'labour-law',
    title: 'Labour Law Registrations',
    icon: 'Users',
    description: 'Workforce statutory registrations, social security enrolments, and municipal operating permits.',
    services: [
      {
        id: 'epf',
        title: 'EPF Registration & Governance',
        slug: 'epf-registration',
        shortDesc: 'Employee Provident Fund statutory registration for organizations with 20+ headcount.',
        documents: ['PAN of Business', 'Certificate of Incorporation', 'Crossed Cancelled Cheque', 'Premises Proof', 'Digital Signature (DSC) of Director/Partner'],
        fees: 'Government Fees: As per actuals (Shram Suvidha Portal).',
        timeline: '3-5 Business Days',
      },
      {
        id: 'esic',
        title: 'ESIC Enrolment & Compliance',
        slug: 'esic-registration',
        shortDesc: 'Employee State Insurance medical benefits registration (Mandatory at 10+ headcount).',
        documents: ['PAN Card of Entity', 'Registration Certificate', 'Employee Roster & Wage Data', 'Cancelled Cheque', 'Premises Proof'],
        fees: 'Government Fees: As per actuals (Shram Suvidha Portal).',
        timeline: '3-5 Business Days',
      },
      { id: 'lin', title: 'Labour Identification Number (LIN)', slug: 'lin-registration', shortDesc: 'Unified national labour identification number registration for businesses covered under labour laws.' },
      { id: 'clra', title: 'CLRA Contract Labour Registration', slug: 'clra-registration', shortDesc: 'Principal employer and contractor registration under the Contract Labour (Regulation & Abolition) Act.' },
      { id: 'shops-est', title: 'Shops & Establishments License', slug: 'shops-establishments', shortDesc: 'Mandatory municipal operating permit for commercial premises.' },
      { id: 'trade-license', title: 'Municipal Trade License', slug: 'trade-licence', shortDesc: 'Local civic authorization for commercial operations.' },
      { id: 'factory-license', title: 'Industrial Factory License', slug: 'factory-licence', shortDesc: 'Statutory manufacturing and safety permit under Factories Act.' },
    ]
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property Protection',
    icon: 'Shield',
    description: 'Brand equity defense, patent filings, and proprietary rights registration.',
    services: [
      {
        id: 'trademark',
        title: 'Trademark Filing & Prosecution',
        slug: 'trademark-registration',
        shortDesc: 'Brand name, logo, and wordmark statutory protection against commercial infringement.',
        documents: ['Logo / Brand Mark Asset', 'Applicant PAN & Aadhaar', 'Udyam Certificate (to secure 50% statutory fee reduction)', 'Executed Form TM-48 (Power of Attorney)*', 'Prior Use Affidavit (if claiming retrospective rights)*'],
        fees: 'Government Fees: As per actuals (Based on entity type and number of classes).',
        timeline: 'Filing: 1-3 Business Days | Examination & Registry Approval: 6-12 Months',
      },
      { id: 'copyright', title: 'Copyright Registration', slug: 'copyright-registration', shortDesc: 'Legal ownership establishment for software code, literary, and artistic assets.' },
      { id: 'design', title: 'Industrial Design Protection', slug: 'design-registration', shortDesc: 'Statutory registration for unique product aesthetics and visual ergonomics.' },
      { id: 'patent', title: 'Patent Drafting & Prosecution', slug: 'patent-filing', shortDesc: 'Invention protection executed by specialized patent attorneys.' },
    ]
  },
  {
    id: 'msme-govt',
    title: 'Government Recognition & Capital Access',
    icon: 'CheckCircle2',
    description: 'DPIIT startup accreditation, tender eligibility, and priority lending registration.',
    services: [
      {
        id: 'udyam',
        title: 'Udyam (MSME) Enrolment',
        slug: 'udyam-registration',
        shortDesc: 'Secures priority sector bank financing, trademark fee discounts, and govt tender advantages.',
        documents: ['Applicant Aadhaar Card (Mobile Linked)', 'Business PAN Card', 'Corporate Bank Account Details (IFSC & Account No)', 'NIC Activity Classification Code'],
        fees: 'Government Fees: As per actuals.',
        timeline: '1-2 Business Days',
      },
      { id: 'gem', title: 'GeM Seller Accreditation', slug: 'gem-registration', shortDesc: 'Government e-Marketplace procurement portal registration.' },
      { id: 'nsic', title: 'NSIC Enrolment', slug: 'nsic-registration', shortDesc: 'National Small Industries Corporation government purchase registration.' },
      { id: 'startup-india', title: 'DPIIT Startup India Recognition', slug: 'startup-india-recognition', shortDesc: 'Accreditation for Section 80-IAC tax holiday and angel tax exemptions.' },
      { id: 'dpiit', title: 'DPIIT Tax Holiday Advisory', slug: 'dpiit-recognition', shortDesc: 'Strategic guidance on Inter-Ministerial Board tax exemption applications.' },
      { id: 'zed', title: 'ZED Certification Support', slug: 'zed-certification', shortDesc: 'Zero Defect Zero Effect manufacturing quality accreditation.' },
    ]
  },
  {
    id: 'industry-specific',
    title: 'Sector-Specific Licensing',
    icon: 'TrendingUp',
    description: 'Regulatory authorizations required for specialized vertical operations.',
    services: [
      {
        id: 'fssai',
        title: 'FSSAI Food Safety Licensing',
        slug: 'fssai-licence',
        shortDesc: 'Mandatory statutory food license for manufacturers, retail chains, and cloud kitchens.',
        documents: ['Identity Proof (Aadhaar/PAN)', 'Premises Occupancy Proof', 'Product Matrix', 'Equipment & Layout Blueprint (Manufacturing setups)', 'Water Quality Analysis Report'],
        fees: 'Government Fees: As per actuals (Varies by State, Central or Basic categories based on turnover).',
        timeline: '7-30 Business Days based on inspection criteria.',
      },
      { id: 'drug', title: 'Drug & Cosmetics Regulatory License', slug: 'drug-licence', shortDesc: 'Statutory authorization for pharmaceutical distribution and retail.' },
      { id: 'cosmetics', title: 'Cosmetics Manufacturing Permit', slug: 'cosmetics-licence', shortDesc: 'CDSCO compliance for cosmetic formulation and packaging.' },
      { id: 'legal-metrology', title: 'Legal Metrology Accreditation', slug: 'legal-metrology', shortDesc: 'Weights and measures compliance for pre-packaged commodities.' },
      { id: 'fire-noc', title: 'Fire Safety NOC Acquisition', slug: 'fire-noc', shortDesc: 'Fire department statutory inspection and clearance.' },
      { id: 'pollution', title: 'Pollution Control Board Consent (CTE/CTO)', slug: 'pollution-control', shortDesc: 'State Environmental Board authorizations to establish and operate.' },
    ]
  },
  {
    id: 'import-export',
    title: 'International Trade & Foreign Exchange',
    icon: 'Landmark',
    description: 'DGFT authorizations, customs codes, and cross-border regulatory compliance.',
    services: [
      {
        id: 'iec',
        title: 'Import Export Code (IEC) Allocation',
        slug: 'iec-registration',
        shortDesc: 'Mandatory 10-digit DGFT identifier required for cross-border commercial transactions.',
        documents: ['Business PAN Card', 'Applicant Aadhaar', 'Cancelled Cheque', 'Premises Occupancy Proof'],
        fees: 'Government Fees: As per actuals (DGFT processing).',
        timeline: '2-4 Business Days',
      },
      { id: 'dgft', title: 'DGFT Export Incentive Authorizations', slug: 'dgft-authorizations', shortDesc: 'Strategic structuring under RoDTEP and Advance Authorization schemes.' },
      { id: 'rcmc', title: 'Export Promotion Council RCMC', slug: 'rcmc-registration', shortDesc: 'Registration-cum-Membership Certificate for customs duty benefits.' },
      { id: 'ad-code', title: 'Authorized Dealer (AD) Code Registration', slug: 'ad-code', shortDesc: 'Port-specific banking code registration for customs clearance.' },
      { id: 'icegate', title: 'Customs ICEGATE Enrolment', slug: 'icegate-registration', shortDesc: 'Electronic filing portal setup for import/export documentation.' },
    ]
  },
  {
    id: 'digital-other',
    title: 'Corporate Governance & Identity',
    icon: 'CheckCircle2',
    description: 'Digital authentication, director compliance, and global legal identifiers.',
    services: [
      { id: 'dsc', title: 'Class 3 Digital Signature Certificate (DSC)', slug: 'dsc-registration', shortDesc: 'Encrypted authentication token for MCA, GST, Income Tax, and DGFT portals — mandatory for company directors and LLP partners.' },
      { id: 'din', title: 'Director Identification Number (DIN)', slug: 'din-registration', shortDesc: 'Statutory government-issued unique identifier required for every director of a company registered with MCA.' },
      { id: 'lei', title: 'Legal Entity Identifier (LEI) Issuance', slug: 'lei-registration', shortDesc: 'Global 20-character identifier for cross-border transactions exceeding ₹50 Crore.' },
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
