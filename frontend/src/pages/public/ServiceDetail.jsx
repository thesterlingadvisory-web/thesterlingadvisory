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
    <div style={{ width: '100%', minHeight: '100vh', background: 'var(--color-primary)' }}>

      {/* ── Institutional Breadcrumb & Header ── */}
      {/* ── Institutional Compact Header (Sleek Agency Banner) ── */}
      <section className="bg-institutional-grid" style={{
        paddingTop: '3.25rem', paddingBottom: '2.25rem',
        borderBottom: '1px solid rgba(255,255,255,0.08)'
      }}>
        <div style={{ maxWidth: '88rem', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)' }}>
          
          {/* Breadcrumbs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem', color: 'var(--color-text-light)', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <Link to="/" style={{ color: 'var(--color-text-light)', transition: 'color 160ms ease' }} onMouseEnter={e => e.currentTarget.style.color = '#ffffff'} onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-light)'}>Home</Link>
            <ChevronRight size={13} style={{ color: 'rgba(255,255,255,0.3)' }} />
            <Link to="/services" style={{ color: 'var(--color-text-light)', transition: 'color 160ms ease' }} onMouseEnter={e => e.currentTarget.style.color = '#ffffff'} onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-light)'}>Services</Link>
            <ChevronRight size={13} style={{ color: 'rgba(255,255,255,0.3)' }} />
            <span style={{ color: 'var(--color-gold)', fontWeight: 600 }}>{serviceData.title}</span>
          </div>

          {/* Balanced Horizontal Layout (Left: Overview, Right: Practice Passport) */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', flexWrap: 'wrap', gap: '2.5rem' }}>
            
            {/* Left Column: Title & Overview */}
            <div style={{ flex: '1 1 480px', maxWidth: '62ch', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
                <div style={{ width: '28px', height: '28px', backgroundColor: 'var(--color-gold)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <IconComponent size={15} style={{ color: 'var(--color-navy)' }} />
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-gold)' }}>
                  {serviceData.category || 'Statutory Discipline'}
                </span>
              </div>

              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.1rem, 4vw, 3.25rem)', fontWeight: 800, color: '#ffffff', marginBottom: '1rem', lineHeight: 1.12, letterSpacing: '-0.03em' }}>
                {serviceData.title}
              </h1>

              <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.72)', lineHeight: '1.65', margin: 0, fontFamily: 'var(--font-body)' }}>
                {content.overview}
              </p>
            </div>

            {/* Right Column: Institutional Practice Credentials Card (Fills empty top space while anchoring pills below) */}
            <div style={{
              flex: '1 1 360px',
              maxWidth: '450px',
              backgroundColor: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 'var(--radius-xl)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 12px 32px -8px rgba(0,0,0,0.4)'
            }}>
              {/* Top Authority & Practice Credentials */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShieldCheck size={15} style={{ color: 'var(--color-gold)' }} />
                    <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 700 }}>
                      Practice Credentials
                    </span>
                  </div>
                  <span style={{ fontSize: '0.68rem', fontWeight: 600, color: 'rgba(255,255,255,0.5)', backgroundColor: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: '4px' }}>
                    Government Liaison
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-gold)', marginTop: '6px', flexShrink: 0 }} />
                    <div>
                      <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff' }}>Direct Authority Submission: </span>
                      <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.65)' }}>Filed before central and state regulatory registries.</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-gold)', marginTop: '6px', flexShrink: 0 }} />
                    <div>
                      <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff' }}>Senior Practice Counsel: </span>
                      <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.65)' }}>Dedicated Senior Advisory supervision across all milestones.</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-gold)', marginTop: '6px', flexShrink: 0 }} />
                    <div>
                      <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff' }}>Pre-Filing Document Audit: </span>
                      <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.65)' }}>Zero-rejection verification before official processing.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Governance Pills */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.75rem',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(255,255,255,0.08)'
              }}>
                <div>
                  <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.45)', display: 'block', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Supervision</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff', marginTop: '2px', display: 'block' }}>Senior Advisory & Counsel</span>
                </div>
                <div style={{ borderLeft: '1px solid rgba(255,255,255,0.08)', paddingLeft: '0.75rem' }}>
                  <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.45)', display: 'block', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Jurisdiction</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-gold)', marginTop: '2px', display: 'block' }}>All 28 States</span>
                </div>
                <div style={{ borderLeft: '1px solid rgba(255,255,255,0.08)', paddingLeft: '0.75rem' }}>
                  <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.45)', display: 'block', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Execution</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff', marginTop: '2px', display: 'block' }}>100% Digital</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Main Engagement Content & Retainer Dashboard ── */}
      <section style={{ padding: '4.5rem 0 6.5rem', maxWidth: '88rem', margin: '0 auto' }}>
        <div style={{ padding: '0 clamp(1rem, 5vw, 2rem)' }}>
          <div className="grid-service-tier" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '4rem', alignItems: 'flex-start' }}>

            {/* Left Column: Architectural Practice Dossier */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4.5rem' }}>

              {content.type === 'bundle' ? (
                /* --- HUB BUNDLE LAYOUT --- */
                <motion.div variants={FADE_UP} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
                    <span className="section-label" style={{ margin: 0 }}>Strategic Advisory</span>
                    <div style={{ height: '1px', flex: 1, backgroundColor: 'rgba(10,15,29,0.08)' }} />
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 3vw, 2.1rem)', fontWeight: 800, color: 'var(--color-navy)', marginBottom: '0.5rem', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
                    Pros & Cons (Unbiased Advisory)
                  </h2>
                  <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
                    Honest advice to help you decide if this structure is right for you.
                  </p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                    {/* Pros Card */}
                    <div style={{ background: '#F8FAFC', border: '1px solid rgba(10,15,29,0.06)', borderRadius: 'var(--radius-xl)', padding: '1.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <CheckCircle2 size={16} color="#16A34A" />
                        </div>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-navy)' }}>The Good Stuff</h3>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {content.pros.map((pro, i) => (
                          <div key={i}>
                            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-navy)', marginBottom: '4px' }}>{pro.title}</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>{pro.desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Cons Card */}
                    <div style={{ background: '#FEF2F2', border: '1px solid rgba(220,38,38,0.1)', borderRadius: 'var(--radius-xl)', padding: '1.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(220, 38, 38, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <ShieldAlert size={16} color="#DC2626" />
                        </div>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-navy)' }}>Things to Keep in Mind</h3>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {content.cons.map((con, i) => (
                          <div key={i}>
                            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-navy)', marginBottom: '4px' }}>{con.title}</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>{con.desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Verdict Card */}
                  <div className="glass-panel hover-lift" style={{ borderRadius: 'var(--radius-xl)', padding: '1.75rem', border: '1px solid var(--color-gold)' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '1rem' }}>Our Honest Verdict</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <span style={{ fontSize: '1.2rem' }}>🎯</span>
                        <div>
                          <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-navy)', display: 'block' }}>Perfect For:</span>
                          <span style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>{content.verdict.ideal}</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <span style={{ fontSize: '1.2rem' }}>🛑</span>
                        <div>
                          <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-navy)', display: 'block' }}>Skip This If:</span>
                          <span style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>{content.verdict.avoid}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Child Services / Spokes */}
                  <div style={{ marginTop: '3.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                      <span className="section-label" style={{ margin: 0 }}>What You Need</span>
                      <div style={{ height: '1px', flex: 1, backgroundColor: 'rgba(10,15,29,0.08)' }} />
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', fontWeight: 800, color: 'var(--color-navy)', marginBottom: '1.5rem', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
                      Required Registrations
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                      {content.childServices.map((child, i) => (
                        <Link key={i} to={child.link} className="hover-lift" style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          padding: '1.25rem', background: '#ffffff', borderRadius: 'var(--radius-lg)',
                          border: '1px solid rgba(10,15,29,0.08)', textDecoration: 'none', color: 'var(--color-navy)'
                        }}>
                          <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{child.title}</span>
                          <ChevronRight size={16} color="var(--color-gold)" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* --- STANDARD EXECUTION PROTOCOL LAYOUT --- */
                <motion.div variants={FADE_UP} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
                    <span className="section-label" style={{ margin: 0 }}>Practice Workflow</span>
                    <div style={{ height: '1px', flex: 1, backgroundColor: 'rgba(10,15,29,0.08)' }} />
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 3vw, 2.1rem)', fontWeight: 800, color: 'var(--color-navy)', marginBottom: '0.5rem', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
                    How We Register Your Business
                  </h2>
                  <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', marginBottom: '1.75rem', lineHeight: 1.6 }}>
                    A simple, transparent process handled by experienced professionals.
                  </p>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
                    gap: '1.5rem'
                  }}>
                    {[
                      { step: 'STAGE 01', title: 'Understand Your Business', desc: 'We discuss your business idea and recommend the right company structure, registrations, and documents required to get started.', highlight: 'Expert Guidance' },
                      { step: 'STAGE 02', title: 'Document Collection & Filing', desc: 'Our team prepares, verifies, and files all required applications with the relevant government authorities on your behalf.', highlight: 'Accurate & Hassle-Free Filing' },
                      { step: 'STAGE 03', title: 'Application Tracking', desc: 'We continuously track your application, resolve any queries raised by the authorities, and keep you updated throughout the process.', highlight: 'Regular Status Updates' },
                      { step: 'STAGE 04', title: 'Registration Completed', desc: 'Receive your registration certificates along with clear next steps for GST, compliance, banking, and future business requirements.', highlight: 'Post-Registration Support' }
                    ].map((item, idx) => (
                      <div key={idx} style={{
                        background: '#ffffff',
                        border: '1px solid rgba(10,15,29,0.08)',
                        borderRadius: 'var(--radius-xl)',
                        padding: '1.75rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: '0 4px 20px -4px rgba(10,15,29,0.05)',
                        transition: 'transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease'
                      }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 32px -6px rgba(10,15,29,0.12)'; e.currentTarget.style.borderColor = 'var(--color-gold-dark)'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px -4px rgba(10,15,29,0.05)'; e.currentTarget.style.borderColor = 'rgba(10,15,29,0.08)'; }}
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                            <span style={{
                              fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700,
                              letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-gold-dark)',
                              backgroundColor: 'rgba(223,186,115,0.12)', padding: '4px 10px', borderRadius: 'var(--radius-sm)'
                            }}>
                              {item.step}
                            </span>
                            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                              Verified Protocol
                            </span>
                          </div>
                          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '0.75rem', lineHeight: 1.3 }}>
                            {item.title}
                          </h3>
                          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                            {item.desc}
                          </p>
                        </div>
                        <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(10,15,29,0.06)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <CheckCircle2 size={13} style={{ color: 'var(--color-gold-dark)' }} />
                          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-navy)' }}>{item.highlight}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* 2. Key Advantages (Institutional Feature Grid) */}
              <motion.div variants={FADE_UP} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
                  <span className="section-label" style={{ margin: 0 }}>Practice Standards</span>
                  <div style={{ height: '1px', flex: 1, backgroundColor: 'rgba(10,15,29,0.08)' }} />
                </div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 3vw, 2.1rem)', fontWeight: 800, color: 'var(--color-navy)', marginBottom: '1.75rem', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
                  Professional Service & Execution Assurance
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.25rem' }}>
                  {content.whyUs.map((point, idx) => (
                    <div key={idx} style={{
                      display: 'flex', alignItems: 'flex-start', gap: '14px',
                      padding: '1.5rem',
                      background: '#ffffff',
                      border: '1px solid rgba(10,15,29,0.08)',
                      borderRadius: 'var(--radius-xl)',
                      boxShadow: '0 4px 16px -4px rgba(10,15,29,0.04)',
                      transition: 'border-color 160ms ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(223,186,115,0.4)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(10,15,29,0.08)'}
                    >
                      <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-md)', background: 'var(--color-navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <CheckCircle2 size={16} style={{ color: 'var(--color-gold)' }} />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-navy)', lineHeight: '1.4', display: 'block', marginBottom: '4px' }}>
                          {point}
                        </span>
                        <span style={{ fontSize: '0.81rem', color: 'var(--color-text-muted)', lineHeight: '1.5', display: 'block' }}>
                          Guaranteed by senior practice counsel across all filings.
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* 3. Statutory Documentation Checklist (Audit Matrix Card) */}
              {serviceData.documents && serviceData.documents.length > 0 && (
                <motion.div variants={FADE_UP} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
                    <span className="section-label" style={{ margin: 0 }}>Required Verification</span>
                    <div style={{ height: '1px', flex: 1, backgroundColor: 'rgba(10,15,29,0.08)' }} />
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 3vw, 2.1rem)', fontWeight: 800, color: 'var(--color-navy)', marginBottom: '1.75rem', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
                    Pre-Submission Documentation Checklist
                  </h2>
                  
                  <div style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid rgba(10,15,29,0.08)',
                    borderRadius: 'var(--radius-2xl)',
                    overflow: 'hidden',
                    boxShadow: '0 12px 32px -8px rgba(10,15,29,0.06)'
                  }}>
                    {/* Header Banner */}
                    <div style={{
                      backgroundColor: 'var(--color-navy)',
                      padding: '1.5rem clamp(1rem, 5vw, 2rem)',
                      borderBottom: '1px solid rgba(255,255,255,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem'
                    }}>
                      <div>
                        <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                          Statutory Audit Standard
                        </span>
                        <h3 style={{ fontSize: '1.15rem', color: '#ffffff', fontWeight: 700, margin: 0 }}>
                          Required Documentation Matrix
                        </h3>
                      </div>
                      <div style={{ backgroundColor: 'rgba(255,255,255,0.08)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.12)' }}>
                        <span style={{ fontSize: '0.78rem', color: '#ffffff', fontWeight: 600 }}>100% Digital Submission</span>
                      </div>
                    </div>

                    {/* Document Items Grid */}
                    <div style={{ padding: 'clamp(1rem, 5vw, 2rem)', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
                      {serviceData.documents.map((doc, idx) => (
                        <div key={idx} style={{
                          display: 'flex', alignItems: 'center', gap: '12px',
                          padding: '1rem 1.25rem',
                          backgroundColor: 'var(--color-secondary)',
                          border: '1px solid rgba(10,15,29,0.06)',
                          borderRadius: 'var(--radius-lg)',
                          transition: 'background-color 160ms ease, border-color 160ms ease'
                        }}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.borderColor = 'var(--color-gold-dark)'; }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--color-secondary)'; e.currentTarget.style.borderColor = 'rgba(10,15,29,0.06)'; }}
                        >
                          <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'rgba(223,186,115,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <CheckCircle size={13} style={{ color: 'var(--color-gold-dark)' }} />
                          </div>
                          <span style={{ fontSize: '0.88rem', color: 'var(--color-navy)', fontWeight: 600, lineHeight: '1.4' }}>{doc}</span>
                        </div>
                      ))}
                    </div>

                    {/* Legal Note */}
                    {serviceData.documents.some(doc => doc.includes('*')) && (
                      <div style={{ backgroundColor: 'var(--color-secondary)', padding: '1.25rem clamp(1rem, 5vw, 2rem)', borderTop: '1px solid rgba(10,15,29,0.06)', display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <span style={{ color: 'var(--color-gold-dark)', fontWeight: 800, fontSize: '1.1rem' }}>*</span>
                        <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', fontStyle: 'italic', fontWeight: 500 }}>
                          Constitutional deeds, affidavits, and statutory declarations (* marked) are drafted and attested directly by our practice legal counsel.
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Related Disciplines */}
              {related.length > 0 && (
                <motion.div variants={FADE_UP} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
                    <span className="section-label" style={{ margin: 0 }}>Related Disciplines</span>
                    <div style={{ height: '1px', flex: 1, backgroundColor: 'rgba(10,15,29,0.08)' }} />
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 2.8vw, 1.85rem)', fontWeight: 800, color: 'var(--color-navy)', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                    Complementary Corporate Services
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
                    {related.map((s) => (
                      <Link
                        key={s.id}
                        to={`/services/${s.slug}`}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          padding: '1.25rem 1.5rem',
                          background: '#ffffff', border: '1px solid rgba(10,15,29,0.08)',
                          borderRadius: 'var(--radius-xl)',
                          boxShadow: '0 4px 16px -4px rgba(10,15,29,0.04)',
                          transition: 'border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease', gap: '1rem',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-gold-dark)'; e.currentTarget.style.boxShadow = '0 10px 28px -6px rgba(10,15,29,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(10,15,29,0.08)'; e.currentTarget.style.boxShadow = '0 4px 16px -4px rgba(10,15,29,0.04)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                      >
                        <span style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--color-navy)' }}>{s.title}</span>
                        <ArrowRight size={15} style={{ color: 'var(--color-gold-dark)', flexShrink: 0 }} />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Column: Unified Executive Retainer & Governance Sidebar (No more scattered boxes!) */}
            <div style={{ position: 'sticky', top: '6.5rem' }}>
              <div style={{
                backgroundColor: 'var(--color-navy)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 'var(--radius-2xl)',
                overflow: 'hidden',
                boxShadow: '0 24px 64px -12px rgba(10,15,29,0.22)'
              }}>
                
                {/* Tier 1: Action Header */}
                <div style={{ padding: '2.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                    <div style={{ width: '26px', height: '26px', borderRadius: '6px', backgroundColor: 'var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Award size={14} style={{ color: 'var(--color-navy)' }} />
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 700 }}>
                      Expert Retainer Desk
                    </span>
                  </div>
                  
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.875rem', letterSpacing: '-0.02em' }}>
                    Get Started with Us
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.68)', lineHeight: '1.65', marginBottom: '2rem' }}>
                    Our specialists manage your entire registration and statutory compliance from initial audit to final authority handover.
                  </p>

                  <Link to="/contact" className="btn-gold" style={{ width: '100%', marginBottom: '0.875rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '1rem' }}>
                    Talk to an Expert <ArrowRight size={16} />
                  </Link>

                  <a
                    href={`https://wa.me/918448803143?text=Hi%2C%20I'm%20inquiring%20about%20${encodeURIComponent(serviceData.title)}`}
                    target="_blank" rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                      width: '100%', padding: '0.875rem', borderRadius: 'var(--radius-md)',
                      background: 'rgba(37,211,102,0.14)', border: '1px solid rgba(37,211,102,0.35)',
                      fontSize: '0.85rem', fontWeight: 700, color: '#25D366',
                      transition: 'background-color 160ms ease, transform 160ms ease'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(37,211,102,0.22)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(37,211,102,0.14)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    <MessageCircle size={16} /> Chat on WhatsApp
                  </a>
                </div>

                {/* Tier 2: Statutory Turnaround & Fee Bar */}
                <div style={{
                  backgroundColor: '#ffffff',
                  padding: 'clamp(1rem, 5vw, 2rem) clamp(1rem, 5vw, 2.25rem)',
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                  borderBottom: '1px solid rgba(10,15,29,0.08)'
                }}>
                  {serviceData.timeline && (
                    <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(10,15,29,0.06)' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-light)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
                        <Clock size={13} style={{ color: 'var(--color-gold-dark)' }} /> Estimated Turnaround
                      </div>
                      <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'var(--color-navy)', fontWeight: 800, margin: 0 }}>
                        {serviceData.timeline}
                      </p>
                    </div>
                  )}

                  {serviceData.fees && (
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-light)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
                        <CreditCard size={13} style={{ color: 'var(--color-gold-dark)' }} /> Government & Package Fee
                      </div>
                      <p style={{ fontSize: '1rem', color: 'var(--color-navy)', fontWeight: 700, marginBottom: '1rem' }}>
                        {serviceData.fees}
                      </p>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '0.875rem 1rem', backgroundColor: 'var(--color-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(10,15,29,0.08)' }}>
                        <ShieldAlert size={15} style={{ color: 'var(--color-gold-dark)', flexShrink: 0, marginTop: '2px' }} />
                        <span style={{ fontSize: '0.82rem', color: 'var(--color-navy)', lineHeight: '1.5', fontWeight: 600 }}>
                          Transparent Pricing. Comprehensive service packages with clear commercial terms.
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Tier 3: Institutional Trust Assurances */}
                <div style={{ backgroundColor: 'var(--color-secondary)', padding: '1.75rem 2.25rem' }}>
                  <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-light)', fontWeight: 700, display: 'block', marginBottom: '1.25rem' }}>
                    Practice Guarantees
                  </span>
                  {[
                    { icon: CheckCircle, label: 'Secure Online Process', desc: 'Zero physical visits required across India' },
                    { icon: Award, label: 'Experienced Specialists', desc: 'Dedicated Senior Advisors & Legal Counsel' },
                    { icon: ShieldCheck, label: '100% Confidential', desc: 'Strict fiduciary client data protection' },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} style={{ display: 'flex', gap: '14px', padding: '0.875rem 0', borderBottom: i < 2 ? '1px solid rgba(10,15,29,0.06)' : 'none' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(223,186,115,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Icon size={14} style={{ color: 'var(--color-gold-dark)' }} />
                        </div>
                        <div>
                          <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '2px' }}>{item.label}</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{item.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
