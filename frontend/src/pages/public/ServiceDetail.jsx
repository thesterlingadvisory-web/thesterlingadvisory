import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle2, ArrowRight, FileText, Clock, CreditCard,
  ShieldAlert, Building2, Calculator, ShieldCheck, Scale,
  Landmark, BarChart2, Users, Award, TrendingUp, Star,
  Phone, MessageCircle, ChevronRight, CheckCircle
} from 'lucide-react';
import { getServiceBySlug, serviceCategories } from '../../data/services';

const FADE_UP = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
};

const categoryIconMap = {
  Landmark, BarChart2, Users, Shield: ShieldCheck, CheckCircle2, TrendingUp,
};

const serviceContent = {
  'proprietorship-setup': {
    type: 'bundle',
    overview: 'A Sole Proprietorship is the simplest way to start a business as an individual. It does not create a separate legal company, which makes it fast and cheap to maintain, but it means you are personally responsible for all business risks.',
    pros: [
      { title: 'Easy & Fast Setup', desc: 'No complicated ROC incorporation required. Start billing clients in 3 days.' },
      { title: 'Zero Annual Audit', desc: 'No mandatory CA audits or MCA annual filings if you stay below tax thresholds.' },
      { title: 'Personal PAN Based', desc: 'Taxes are filed easily along with your personal Income Tax Return.' }
    ],
    cons: [
      { title: 'Unlimited Personal Liability', desc: 'If the business takes a loan and fails, your personal assets are at risk.' },
      { title: 'Cannot Raise Investors', desc: 'Venture Capitalists and Angel Investors cannot invest in this structure.' },
      { title: 'Limited Credibility', desc: 'Some large corporate clients or foreign vendors prefer dealing with Private Limited companies.' }
    ],
    verdict: {
      ideal: 'Solo freelancers, local retail shops, and individuals testing an unproven business idea with low risk.',
      avoid: 'Tech startups, businesses seeking venture capital, or founders taking large business loans.'
    },
    childServices: [
      { title: 'Udyam (MSME) Registration', link: '/services/udyam-registration' },
      { title: 'GST Registration', link: '/services/gst-registration' },
      { title: 'Shops & Establishment', link: '/services/shops-establishments' }
    ],
    whyUs: [
      'Udyam (MSME) Registration & Central Priority Certificate Allocation',
      'GST Identification Number (GSTIN) Registration & Jurisdictional Setup',
      'Shops & Establishment Act (State Municipal / Gumasta) Commercial Licensing',
      'Bank Current Account Onboarding Documentation & RBI KYC Advisory'
    ],
  },
  'partnership-firm-registration': {
    overview: 'A Partnership Deed formalizes multi-founder governance, capital contributions, and profit allocation under the Indian Partnership Act 1932, registered with the State Registrar of Firms.',
    whyUs: ['Custom constitutional partnership deed drafting', 'State-specific Registrar of Firms representation', 'Corporate PAN & TAN allocation', 'Retainer-led statutory follow-up'],
  },
  'llp-registration': {
    overview: 'Limited Liability Partnership (LLP) architecture isolates personal liability while preserving flexible internal governance under the LLP Act 2008. Ideal for professional service groups and joint ventures.',
    whyUs: ['Class 3 DSC and Designated Partner DIN allocation', 'Precision MCA FiLLiP statutory filing', 'LLP Agreement constitutional drafting', 'Permanent annual ROC compliance tracking'],
  },
  'private-limited-company': {
    type: 'bundle',
    overview: 'A Private Limited Company is the safest and most popular way to build a serious business. It separates your personal savings from your business risks and makes it easy to bring in partners or investors.',
    pros: [
      { title: 'Your Personal Savings are Safe', desc: 'Banks cannot touch your personal assets (like your house) if the business fails.' },
      { title: 'Easy to Get Investors', desc: 'The only structure Venture Capitalists will invest in because they can easily buy shares.' },
      { title: 'High Trust Factor', desc: 'Big corporations, foreign clients, and banks take you much more seriously.' },
      { title: 'Business Outlives You', desc: 'The business continues to exist legally even if founders leave or retire.' }
    ],
    cons: [
      { title: 'Higher Running Costs', desc: 'You must hire a CA every year to audit your accounts and file annual returns, even on zero revenue.' },
      { title: 'Strict Money Rules', desc: 'You cannot freely withdraw cash for personal use without formal salary or dividend declarations.' },
      { title: 'More Paperwork', desc: 'Mandatory board meetings and official minute books must be maintained throughout the year.' }
    ],
    verdict: {
      ideal: 'Tech startups, businesses raising external funds, and high-risk ventures signing large commercial contracts.',
      avoid: 'Solo freelancers or small unproven lifestyle businesses with zero initial capital.'
    },
    childServices: [
      { title: 'Class 3 DSC & DIN', link: '/services/dsc-registration' },
      { title: 'Name Approval & SPICe+', link: '/services/private-limited-company' },
      { title: 'Corporate PAN & TAN', link: '/services/pan-tan-application' },
      { title: 'GST Registration', link: '/services/gst-registration' },
      { title: 'Bank Account Setup', link: '/contact' }
    ],
    whyUs: ['Complete SPICe+ constitutional incorporation', 'Memorandum & Articles (MoA & AoA) drafting', 'Director Identification Number (DIN) & DSC allocation', 'Statutory bank account opening authorization'],
  },
  'opc-registration': {
    overview: 'One Person Company (OPC) isolates sole founder liability within a corporate structure under the Companies Act 2013, with streamlined statutory pathways to convert into a multi-director Private Limited entity.',
    whyUs: ['Complete MCA incorporation execution', 'Statutory nominee identification drafting', 'Director DIR-3 KYC compliance', 'Annual statutory filing roadmap'],
  },
  'section-8-company': {
    overview: 'Section 8 incorporation establishes a statutory non-profit entity dedicated to charitable, educational, social welfare, or environmental objectives under the Companies Act 2013.',
    whyUs: ['Section 8 statutory license procurement', '12A & 80G tax exemption structuring', 'FCRA eligibility advisory', 'Annual non-profit statutory audit retainers'],
  },
  'trust-registration': {
    overview: 'A Trust Deed establishes fiduciary asset governance for private estates or charitable foundations under the Indian Trusts Act 1882 or state public trust statutory frameworks.',
    whyUs: ['Fiduciary trust deed drafting by specialized counsel', 'Sub-registrar jurisdictional representation', '12A & 80G tax exemption filings', 'Multi-state charitable trust compliance'],
  },
  'society-registration': {
    overview: 'Society Incorporation establishes a registered collective under the Societies Registration Act 1860 for cultural, scientific, educational, or charitable governance.',
    whyUs: ['Constitutional memorandum & rules drafting', 'Registrar of Societies statutory filing', 'Governing body compliance advisory', 'Annual list of governing body filings'],
  },
  'gst-registration': {
    overview: 'Goods and Services Tax (GST) registration is mandatory for commercial entities crossing statutory turnover thresholds or engaging in inter-state e-commerce supply chains.',
    whyUs: ['Aadhaar verification and officer representation', 'Pan-India multi-jurisdictional filings', 'Principal Place of Business structuring', 'Ongoing monthly & quarterly return retainers'],
  },
  'gst-amendment': {
    overview: 'GST Amendment & Jurisdictional Transfer retainers regularize core and non-core registration modifications, additional place of business additions, and formal statutory closures.',
    whyUs: ['Rapid jurisdictional amendment filings', 'Pre-cancellation liability audits', 'Final GSTR-10 statutory return filing', 'Authority notice representation'],
  },
  'pan-tan-application': {
    overview: 'Permanent Account Number (PAN) establishes corporate tax identity, while Tax Deduction Account Number (TAN) is mandatory for entities deducting tax at source across payroll and vendor disbursements.',
    whyUs: ['Corporate PAN & TAN allotment', 'NSDL & UTIITSL direct integration', 'Retrospective PAN correction filings', 'Statutory deduction compliance mapping'],
  },
  'professional-tax': {
    overview: 'Professional Tax (PT) is a state-mandated statutory compliance for employers and salaried professionals, requiring registration with state commercial tax authorities.',
    whyUs: ['State-specific Employer & Employee PT Enrolment', 'Monthly salary deduction matrix setup', 'Statutory monthly & annual return filing', 'Multi-state enterprise compliance'],
  },
  'tds-registration': {
    overview: 'Tax Deduction at Source (TDS) statutory compliance requires TAN allocation, timely deduction across vendor contracts, and quarterly electronic return filings.',
    whyUs: ['Rapid TAN allocation', 'Quarterly Form 24Q & 26Q return filing', 'Form 16 / 16A certificate generation', 'TDS assessment and notice defense'],
  },
  'epf-registration': {
    overview: 'Employee Provident Fund (EPF) registration under the Shram Suvidha portal is mandatory for organizations employing 20+ headcount, securing long-term workforce retirement equity.',
    whyUs: ['Shram Suvidha unified portal registration', 'DSC-authenticated establishment filing', 'Monthly ECR return management', 'PF inspection and audit defense'],
  },
  'esic-registration': {
    overview: 'Employee State Insurance Corporation (ESIC) statutory enrolment provides medical and social security coverage for workforce personnel earning within statutory wage limits.',
    whyUs: ['Shram Suvidha ESIC code allocation', 'Employee Insurance Number (IP) generation', 'Monthly contribution return filings', 'Accident and medical compliance tracking'],
  },
  'lin-registration': {
    overview: 'Labour Identification Number (LIN) consolidates multi-law workforce registrations under a unified national Shram Suvidha statutory identifier.',
    whyUs: ['Unified Shram Suvidha allocation', 'Multi-law statutory mapping', 'Inspection readiness audits', 'Annual consolidated labour returns'],
  },
  'clra-registration': {
    overview: 'Contract Labour (Regulation & Abolition) Act compliance mandates Principal Employer registration and contractor licensing for establishments deploying 20+ contract personnel.',
    whyUs: ['Principal Employer statutory registration', 'Contractor licensing supervision', 'State labour commissioner liaison', 'Annual contract labour return filing'],
  },
  'shops-establishments': {
    overview: 'Shops & Establishments municipal registration is the foundational statutory operating permit required for commercial offices, retail outlets, and administrative establishments.',
    whyUs: ['Rapid municipal registration filing', 'Pan-India state labour compliance', 'Statutory operating hours & leave policies', 'Permit renewal tracking'],
  },
  'trade-licence': {
    overview: 'Municipal Trade License grants civic authorization to conduct commercial operations within designated urban and municipal zoning jurisdictions.',
    whyUs: ['Municipal corporation liaison', 'Zoning & occupancy verification', 'Health & safety compliance mapping', 'Annual trade license renewal'],
  },
  'factory-licence': {
    overview: 'Factory License under the Factories Act 1948 is the mandatory industrial safety and operational authorization for manufacturing plants and processing units.',
    whyUs: ['State Chief Inspector of Factories representation', 'Engineering layout blueprint approval', 'Industrial safety audit prep', 'Annual factory license renewal'],
  },
  'trademark-registration': {
    overview: 'Trademark filing and prosecution secures statutory ownership over brand wordmarks, logos, and taglines across 45 nice classification classes under the Trade Marks Act 1999.',
    whyUs: ['Comprehensive class & phonetic clearance search', 'Priority TM-A filing within 24 hours', 'Statutory examination report defense', 'Brand portfolio maintenance retainers'],
  },
  'copyright-registration': {
    overview: 'Copyright registration establishes indisputable statutory ownership over software source code, architectural plans, literary publications, and artistic assets.',
    whyUs: ['Copyright Office electronic filing', 'Source code & literary deposit preparation', 'Discrepancy notice representation', 'Licensing & assignment deed drafting'],
  },
  'design-registration': {
    overview: 'Industrial Design registration under the Designs Act 2000 grants exclusive statutory monopoly over the visual ergonomics, shape, and aesthetic configuration of manufactured products.',
    whyUs: ['Design Office priority filing', 'Novelty & prior art evaluation', 'Examination objection defense', '10-year statutory protection tracking'],
  },
  'patent-filing': {
    overview: 'Patent prosecution secures a 20-year statutory monopoly over novel technological inventions, processes, and chemical formulations under the Patents Act 1970.',
    whyUs: ['Specialized prior art & patentability search', 'Provisional & complete specification drafting', 'Indian Patent Office representation', 'PCT international patent cooperation advisory'],
  },
  'udyam-registration': {
    overview: 'Udyam (MSME) registration accredits enterprises under the Ministry of Micro, Small & Medium Enterprises, unlocking priority lending, interest subsidies, and trademark fee reductions.',
    whyUs: ['Instant Aadhaar-authenticated filing', 'Precision NIC activity classification', '50% trademark fee reduction linkage', 'Government procurement tender eligibility'],
  },
  'gem-registration': {
    overview: 'Government e-Marketplace (GeM) seller accreditation authorizes commercial entities to participate in central and state government direct procurement and bidding tenders.',
    whyUs: ['Complete GeM seller profile verification', 'OEM & reseller catalogue structuring', 'Tender bidding compliance advisory', 'Caution money & EMD exemption support'],
  },
  'nsic-registration': {
    overview: 'National Small Industries Corporation (NSIC) enlistment qualifies MSMEs for single-point government purchase registration and tender fee waivers.',
    whyUs: ['Single-point enlistment documentation', 'Technical inspection preparation', 'Tender fee exemption structuring', 'Annual enlistment renewal'],
  },
  'startup-india-recognition': {
    overview: 'DPIIT Startup India accreditation formally registers innovative entities with the Ministry of Commerce and Industry, enabling Section 80-IAC tax holiday and angel tax exemptions.',
    whyUs: ['DPIIT application & pitch deck structuring', 'Innovation & scalability assessment', 'Section 80-IAC tax holiday application', 'Self-certification compliance retainers'],
  },
  'dpiit-recognition': {
    overview: 'DPIIT recognition is the mandatory regulatory prerequisite for early-stage ventures seeking tax exemptions, government grant eligibility, and fast-track patent filings.',
    whyUs: ['Eligibility auditing & documentation', 'Inter-Ministerial Board representation', 'Fast-track IP discount enablement', 'Annual DPIIT compliance advisory'],
  },
  'zed-certification': {
    overview: 'Zero Defect Zero Effect (ZED) accreditation verifies world-class manufacturing quality and environmental sustainability, qualifying plants for export subsidies.',
    whyUs: ['ZED portal evaluation and registration', 'Bronze, Silver & Gold maturity mapping', 'Quality engineering advisory', 'Government financial incentive claims'],
  },
  'fssai-licence': {
    overview: 'FSSAI food safety licensing under the Food Safety and Standards Act 2006 is mandatory for food manufacturers, cloud kitchens, retail chains, and import/export distributors.',
    whyUs: ['Basic, State & Central license categorization', 'FoSCoS portal application management', 'Food safety inspection preparation', 'Annual statutory return & renewal retainers'],
  },
  'drug-licence': {
    overview: 'Drug & Cosmetics licensing under the Drugs and Cosmetics Act 1940 is required for pharmaceutical distribution, retail pharmacies, and drug manufacturing facilities.',
    whyUs: ['State Drug Controller representation', 'Retail, wholesale & distribution licenses', 'Pharmacist compliance auditing', 'Annual drug license renewal tracking'],
  },
  'cosmetics-licence': {
    overview: 'Cosmetics Manufacturing Permit ensures statutory CDSCO compliance for formulation, packaging, and distribution of personal care products within Indian jurisdiction.',
    whyUs: ['CDSCO & State Drug Controller filing', 'GMP manufacturing facility compliance', 'Cosmetic formulation dossier auditing', 'Product label statutory compliance'],
  },
  'legal-metrology': {
    overview: 'Legal Metrology registration mandates statutory compliance for pre-packaged commodities, weighing instruments, and measurement accuracy standards across consumer markets.',
    whyUs: ['Packer & importer statutory registration', 'Model approval application management', 'Product label statutory declaration review', 'Weights & measures inspection defense'],
  },
  'fire-noc': {
    overview: 'Fire Safety No Objection Certificate (NOC) verifies compliance with National Building Code safety standards before commercial occupancy and industrial operation.',
    whyUs: ['Comprehensive fire safety architecture check', 'State Fire Department application filing', 'Inspection & testing representation', 'Annual Fire NOC statutory renewal'],
  },
  'pollution-control': {
    overview: 'State Pollution Control Board Consent to Establish (CTE) and Consent to Operate (CTO) authorize industrial manufacturing operations under Water and Air prevention acts.',
    whyUs: ['CTE & CTO statutory filings', 'Environmental engineering documentation', 'Effluent treatment plant (ETP) compliance', 'Annual environmental audit reports'],
  },
  'iec-registration': {
    overview: 'Import Export Code (IEC) is the mandatory 10-digit DGFT identifier required by customs authorities for all cross-border commercial trade and foreign remittance processing.',
    whyUs: ['Instant DGFT portal allocation', 'Authorized Dealer (AD) code integration', 'Pan-India customs port mapping', 'Annual DGFT IEC statutory update'],
  },
  'dgft-authorizations': {
    overview: 'DGFT authorizations and export incentive retainers optimize duty drawback, RoDTEP, and Advance Authorization schemes for international trading enterprises.',
    whyUs: ['Export incentive eligibility auditing', 'Advance Authorization & EPCG filings', 'Export obligation redemption (EODC)', 'DGFT dispute representation'],
  },
  'rcmc-registration': {
    overview: 'Registration-cum-Membership Certificate (RCMC) issued by Export Promotion Councils qualifies exporters for tariff concessions and government export promotion schemes.',
    whyUs: ['Commodity-specific council identification', 'Export Promotion Council filing', 'Market access initiative eligibility', 'Annual RCMC membership renewal'],
  },
  'ad-code': {
    overview: 'Authorized Dealer (AD) Code registration registers your bank branch with customs ports on ICEGATE, enabling automated export remittance and drawback tracking.',
    whyUs: ['Bank AD code letter coordination', 'ICEGATE customs port registration', 'Multi-port EDI linking', 'Drawback account verification'],
  },
  'icegate-registration': {
    overview: 'ICEGATE customs portal enrolment authorizes electronic filing of Bills of Entry and Shipping Bills for international freight clearing and customs compliance.',
    whyUs: ['Complete ICEGATE user registration', 'DSC authentication linking', 'Customs broker integration advisory', 'Real-time customs clearance tracking'],
  },
  'dsc-registration': {
    overview: 'Class 3 Digital Signature Certificate (DSC) provides encrypted statutory authentication for Ministry of Corporate Affairs, GSTN, and Income Tax e-filing portals.',
    whyUs: ['Encrypted Class 3 DSC token issuance', '1-year and 2-year statutory validity', 'Aadhaar / PAN paperless verification', 'Express secure token delivery'],
  },
  'din-registration': {
    overview: 'Director Identification Number (DIN) is the mandatory statutory identifier assigned by the Ministry of Corporate Affairs to individuals appointed as corporate directors.',
    whyUs: ['SPICe+ integrated DIN allotment', 'Standalone DIR-3 application filing', 'Deactivated DIN regularisation', 'DIR-3 KYC annual maintenance'],
  },
  'mca-kyc': {
    overview: 'Annual Director KYC (Form DIR-3 KYC) is the mandatory annual statutory verification required to prevent DIN deactivation and personal director disqualification.',
    whyUs: ['On-time annual statutory submission', 'DSC and OTP authenticated filing', 'Multi-director corporate bulk execution', 'Deactivated DIN restoration retainers'],
  },
  'lei-registration': {
    overview: 'Legal Entity Identifier (LEI) is a 20-character global code mandated by the Reserve Bank of India for corporate entities executing transactions exceeding ₹50 Crore.',
    whyUs: ['CCIL / Global LEI foundation filing', 'Corporate documentation preparation', 'Expedited LEI code allocation', 'Annual LEI statutory renewal tracking'],
  },
  'annual-compliance': {
    overview: 'Complete end-to-end statutory compliance for Private Limited Companies and LLPs, including MCA annual returns, AOC-4, MGT-7, director KYC, and corporate tax audits.',
    whyUs: ['Dedicated Senior Advisory statutory audits', 'Automated MCA/ROC compliance calendars', 'Financial statement preparation & filing', 'Zero-penalty statutory guarantee'],
  }
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [serviceData, setServiceData] = useState(null);

  useEffect(() => {
    const found = getServiceBySlug(slug);
    if (found) {
      setServiceData(found);
    } else {
      navigate('/services', { replace: true });
    }
  }, [slug, navigate]);

  if (!serviceData) return null;

  const content = serviceContent[slug] || {
    overview: serviceData.shortDesc || 'Comprehensive statutory representation and execution retainer.',
    whyUs: [
      'Senior Corporate Advisory & Legal supervision',
      'Secure digital documentation without physical visits',
      'Transparent Pricing',
      'Ongoing post-filing statutory compliance support'
    ]
  };

  const IconComponent = categoryIconMap[serviceData.categoryIcon] || CheckCircle2;

  const related = serviceCategories
    .find(c => c.title === serviceData.category)
    ?.services.filter(s => s.slug !== slug).slice(0, 4) || [];

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#0a0d14', color: '#ffffff' }}>

      {/* ── Cinematic Dark Hero ── */}
      <section style={{ 
        position: 'relative',
        paddingBottom: '2rem',
        background: 'radial-gradient(circle at 70% 30%, rgba(20,27,45,1) 0%, rgba(10,13,20,1) 100%)',
        overflow: 'hidden'
      }}>
        
        {/* Subtle background texture/overlay (simulated) */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.4, backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />

        {/* Top Navbar Border Extension */}
        <div style={{ height: '1px', width: '100%', backgroundColor: 'rgba(255,255,255,0.05)', position: 'relative', zIndex: 2 }} />

        <div style={{ maxWidth: '110rem', margin: '0 auto', padding: '3.5rem clamp(1.25rem, 5vw, 3rem) 0', position: 'relative', zIndex: 2 }}>
          
          {/* Breadcrumbs - Elegant */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: '3.5rem', fontWeight: 500 }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 160ms' }} onMouseEnter={e => e.currentTarget.style.color = '#ffffff'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>Home</Link>
            <span>/</span>
            <Link to="/services" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 160ms' }} onMouseEnter={e => e.currentTarget.style.color = '#ffffff'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>Services</Link>
            <span>/</span>
            <span style={{ color: '#ffffff', fontWeight: 600 }}>{serviceData.title}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '5rem' }}>
            
            {/* Left Column */}
            <div style={{ flex: '1 1 500px', maxWidth: '1100px' }}>
              
              {/* Gold Category Label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
                <IconComponent size={16} style={{ color: 'var(--color-gold)' }} />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {serviceData.category || 'Statutory Discipline'}
                </span>
              </div>

              {/* Massive Serif Title */}
              <h1 style={{ fontFamily: '"Playfair Display", "Georgia", serif', fontSize: 'clamp(3rem, 5.5vw, 4.5rem)', fontWeight: 600, color: '#ffffff', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.01em' }}>
                {serviceData.title}
              </h1>

              {/* Lead Paragraph */}
              <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.7', margin: '0 0 3.5rem 0', fontFamily: 'var(--font-body)', fontWeight: 300, maxWidth: '650px' }}>
                {content.overview}
              </p>

              {/* Documents - Replaced Metrics */}
              {serviceData.documents && serviceData.documents.length > 0 && (
                <div style={{ paddingTop: '1.5rem', marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <h3 style={{ fontSize: '1.1rem', fontFamily: '"Playfair Display", "Georgia", serif', color: '#ffffff', fontWeight: 600, margin: '0 0 1.25rem 0' }}>
                    What You Need to Provide
                  </h3>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                    {serviceData.documents.map((doc, idx) => (
                      <div key={idx} style={{ 
                        display: 'flex', alignItems: 'center', gap: '10px', 
                        padding: '0.75rem 1.25rem', 
                        backgroundColor: 'rgba(20,26,41,0.6)', 
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '100px'
                      }}>
                        <FileText size={15} style={{ color: 'var(--color-gold)' }} />
                        <span style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: 500 }}>{doc.replace('*', '')}</span>
                      </div>
                    ))}
                  </div>

                  {serviceData.documents.some(doc => doc.includes('*')) && (
                    <div style={{ marginTop: '1.25rem', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--color-gold)', fontWeight: 700, fontSize: '1.1rem', marginTop: '-2px' }}>*</span>
                      <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', fontStyle: 'italic', lineHeight: 1.5 }}>
                        Deeds and declarations marked with an asterisk are drafted exclusively by our practice counsel.
                      </span>
                    </div>
                  )}
                </div>
              )}


            </div>

            {/* Right Column: Glassmorphism Snapshot Panel */}
            <div style={{ flex: '1 1 340px', maxWidth: '380px' }}>
              <div style={{
                backgroundColor: 'rgba(20,26,41,0.7)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
              }}>
                {/* Header */}
                <div style={{ padding: '2rem 2rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <h3 style={{ fontFamily: '"Playfair Display", "Georgia", serif', fontSize: '1.4rem', fontWeight: 600, color: '#ffffff', margin: 0 }}>
                    Service Snapshot
                  </h3>
                </div>

                {/* Timeline Row */}
                {serviceData.timeline && (
                  <div style={{ padding: '1.75rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
                      <Clock size={15} style={{ color: 'var(--color-gold)' }} />
                      <span style={{ fontSize: '0.9rem', color: '#ffffff', fontWeight: 700 }}>
                        Estimated Turnaround
                      </span>
                    </div>
                    <div style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)', fontWeight: 400, lineHeight: 1.5, paddingLeft: '25px' }}>
                      {serviceData.timeline}
                    </div>
                  </div>
                )}

                {/* Fees Row */}
                {serviceData.fees && (
                  <div style={{ padding: '1.75rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
                      <CreditCard size={15} style={{ color: 'var(--color-gold)' }} />
                      <span style={{ fontSize: '0.9rem', color: '#ffffff', fontWeight: 700 }}>
                        Government & Filing Fees
                      </span>
                    </div>
                    <div style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)', fontWeight: 400, lineHeight: 1.5, paddingLeft: '25px' }}>
                      {serviceData.fees}
                    </div>
                  </div>
                )}

                {/* Action Buttons Row */}
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <Link to="/contact" className="btn-gold" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', padding: '1rem', width: '100%', textDecoration: 'none', fontSize: '1rem', fontWeight: 600, borderRadius: '8px' }}>
                    Consult an Expert <ArrowRight size={18} />
                  </Link>
                  <a
                    href={`https://wa.me/918448803143?text=Hi%2C%20I'm%20inquiring%20about%20${encodeURIComponent(serviceData.title)}`}
                    target="_blank" rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                      width: '100%', padding: '0.9rem', borderRadius: '8px',
                      backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
                      fontSize: '0.95rem', fontWeight: 600, color: '#ffffff', textDecoration: 'none',
                      transition: 'all 160ms ease'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'; }}
                  >
                    <MessageCircle size={18} /> Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>





      {/* ── 4-Step Process Grid (Bottom Half) ── */}
      <section style={{ padding: '1rem 0 5rem' }}>
        <div style={{ maxWidth: '110rem', margin: '0 auto', padding: '0 clamp(1.25rem, 5vw, 3rem)' }}>
          <h3 style={{ fontSize: '1.25rem', fontFamily: '"Playfair Display", "Georgia", serif', color: '#ffffff', fontWeight: 600, margin: '0 0 2rem 0', textAlign: 'center' }}>
            Our 4-Step Engagement Process
          </h3>
          <div style={{ maxWidth: '70rem', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(20,26,41,1)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold)', fontSize: '0.85rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                01
              </div>
              <h4 style={{ fontSize: '1rem', color: '#ffffff', fontWeight: 600, margin: 0, textAlign: 'center' }}>Consultation & Strategy</h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(20,26,41,1)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold)', fontSize: '0.85rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                02
              </div>
              <h4 style={{ fontSize: '1rem', color: '#ffffff', fontWeight: 600, margin: 0, textAlign: 'center' }}>Document Preparation</h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(20,26,41,1)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold)', fontSize: '0.85rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                03
              </div>
              <h4 style={{ fontSize: '1rem', color: '#ffffff', fontWeight: 600, margin: 0, textAlign: 'center' }}>Regulatory Filings</h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(20,26,41,1)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold)', fontSize: '0.85rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                04
              </div>
              <h4 style={{ fontSize: '1rem', color: '#ffffff', fontWeight: 600, margin: 0, textAlign: 'center' }}>Fast Delivery</h4>
            </div>

          </div>
        </div>
      </section>

      {/* ── Optional: Pros & Cons Block (If available) ── */}
      {content.type === 'bundle' && (
        <section style={{ padding: '0 0 6rem', maxWidth: '80rem', margin: '0 auto' }}>
          <div style={{ padding: '0 clamp(1.25rem, 5vw, 3rem)' }}>
            <h2 style={{ fontFamily: '"Playfair Display", "Georgia", serif', fontSize: '2rem', color: '#ffffff', marginBottom: '2rem' }}>Pros & Cons (Unbiased Advisory)</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {/* Pros Card */}
              <div style={{ background: 'rgba(22,163,74,0.05)', border: '1px solid rgba(22,163,74,0.2)', borderRadius: '16px', padding: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#4ade80', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={18} /> The Good Stuff
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {content.pros.map((pro, i) => (
                    <div key={i}>
                      <div style={{ fontSize: '1rem', fontWeight: 600, color: '#ffffff', marginBottom: '4px' }}>{pro.title}</div>
                      <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>{pro.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cons Card */}
              <div style={{ background: 'rgba(220,38,38,0.05)', border: '1px solid rgba(220,38,38,0.2)', borderRadius: '16px', padding: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#f87171', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ShieldAlert size={18} /> Things to Keep in Mind
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {content.cons.map((con, i) => (
                    <div key={i}>
                      <div style={{ fontSize: '1rem', fontWeight: 600, color: '#ffffff', marginBottom: '4px' }}>{con.title}</div>
                      <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>{con.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
