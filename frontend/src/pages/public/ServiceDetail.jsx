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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

/* ── Map category icon strings to components ── */
const categoryIconMap = {
  Landmark, BarChart2, Users, Shield: ShieldCheck, CheckCircle2, TrendingUp,
};

/* ── Rich content per service (whyUs, overview) ── */
const serviceContent = {
  'proprietorship-setup': {
    overview: 'A Proprietorship is the simplest and quickest form of business registration in India, ideal for solo entrepreneurs and freelancers wanting to formalize their operations without complex legal overhead.',
    whyUs: ['Fast 2-4 day turnaround', 'MSME/Udyam registration included', 'GST guidance post-registration', 'Free post-registration checklist'],
  },
  'partnership-firm-registration': {
    overview: 'A Partnership Firm is formed when two or more individuals co-own a business under a registered deed. It offers shared responsibility, simpler management, and straightforward profit distribution.',
    whyUs: ['Partnership deed drafted by our legal team', 'State-specific compliance guidance', 'PAN & TAN application included', 'Full follow-up with Registrar of Firms'],
  },
  'llp-registration': {
    overview: 'A Limited Liability Partnership (LLP) combines the flexibility of a partnership with limited liability protection for partners. It is a preferred choice for service professionals and small businesses.',
    whyUs: ['DSC procurement assistance', 'MCA filing by experienced CSs', 'LLP agreement drafting', 'Annual compliance calendar provided'],
  },
  'private-limited-company': {
    overview: 'A Private Limited Company is the most preferred business structure for startups and growth-oriented businesses in India. It offers limited liability, ease of fundraising, and a strong corporate identity.',
    whyUs: ['SPICe+ form filing by certified professionals', 'MoA & AoA drafting included', 'DIN & DSC for all directors', 'Bank account opening guidance'],
  },
  'opc-registration': {
    overview: 'One Person Company (OPC) is a unique corporate structure in India that allows a single entrepreneur to enjoy the benefits of a company while operating as a sole owner.',
    whyUs: ['Complete MCA filing support', 'Conversion to Pvt Ltd guidance', 'Director KYC included', 'Post-incorporation compliance brief'],
  },
  'section-8-company': {
    overview: 'A Section 8 Company is a non-profit organization set up under the Companies Act 2013, aimed at promoting charitable objectives such as education, arts, commerce, sports, religion, or environmental protection.',
    whyUs: ['12A & 80G registration guidance', 'FCRA eligibility advisory', 'MOA & AOA for non-profits', 'CSR compliance support'],
  },
  'trust-registration': {
    overview: 'A Trust is a legal arrangement for managing and distributing assets or charitable activities. Public trusts are governed by state-specific laws and are commonly used for educational, religious, and welfare objectives.',
    whyUs: ['Trust deed drafting by our legal team', 'Sub-registrar filing assistance', '12A & 80G advisory', 'Multi-state trust expertise'],
  },
  'society-registration': {
    overview: 'A Society is a group of individuals united for a common objective such as literary, cultural, scientific, charitable or social welfare purposes, registered under the Societies Registration Act.',
    whyUs: ['Memorandum & rules drafting', 'Registrar of Societies filing', 'Committee structure advisory', 'Renewal compliance support'],
  },
  'gst-registration': {
    overview: 'GST Registration is mandatory for businesses exceeding the annual turnover threshold (₹40L for goods, ₹20L for services) and for any inter-state supply of goods or services.',
    whyUs: ['Aadhaar authentication handled', 'GSTIN in 3-7 days', 'Multiple state registrations', 'Post-registration filing guidance'],
  },
  'gst-amendment': {
    overview: 'GST Amendment or Cancellation services cover changes to your existing GST registration — such as adding business verticals, changing address, or voluntarily cancelling when business closes.',
    whyUs: ['Amendment filed within 24 hours', 'Cancellation advisory', 'Liability assessment before closure', 'Final return filing support'],
  },
  'pan-tan-application': {
    overview: 'A Permanent Account Number (PAN) is required for all tax-related transactions. Tax Deduction Account Number (TAN) is mandatory for businesses that deduct TDS from payments.',
    whyUs: ['PAN for individuals, firms & companies', 'TAN registration via TIN-NSDL', 'Urgent processing available', 'PAN corrections handled'],
  },
  'professional-tax': {
    overview: 'Professional Tax is a state-level tax levied on individuals earning income from employment or professions. Employers must register and deduct PT from employee salaries.',
    whyUs: ['State-specific PT registration', 'Employee deduction setup', 'Monthly return filing', 'Multi-state employer support'],
  },
  'tds-registration': {
    overview: 'TDS (Tax Deducted at Source) registration requires obtaining a TAN (Tax Deduction Account Number) for businesses that make payments to vendors, employees, or contractors where TDS is applicable.',
    whyUs: ['TAN registration in 3-5 days', 'TDS payment and return guidance', 'Form 16/16A generation support', 'TDS audit assistance'],
  },
  'epf-registration': {
    overview: 'Employee Provident Fund (EPF) registration is mandatory for establishments employing 20 or more persons. It provides retirement and social security benefits to employees.',
    whyUs: ['Shram Suvidha portal filing', 'DSC-based registration', 'Employee enrollment guidance', 'Monthly PF return compliance'],
  },
  'esic-registration': {
    overview: 'ESIC (Employee State Insurance Corporation) registration is mandatory for establishments with 10 or more employees earning below ₹21,000/month, providing health and maternity benefits.',
    whyUs: ['Shram Suvidha portal registration', 'Employee IP generation', 'Monthly ESI return filing', 'Challan payment guidance'],
  },
  'lin-registration': {
    overview: 'Labour Identification Number (LIN) is a unique identifier for businesses under the Unified Shram Suvidha Platform for managing all labour law compliances centrally.',
    whyUs: ['USSP portal registration', 'Multiple labour law mapping', 'Inspection compliance advisory', 'Annual return guidance'],
  },
  'clra-registration': {
    overview: 'The Contract Labour (Regulation & Abolition) Act requires establishments that employ 20+ contract labourers to obtain a Certificate of Registration from the appropriate authority.',
    whyUs: ['Principal employer registration', 'Contractor licence guidance', 'State-specific compliance', 'Annual return support'],
  },
  'shops-establishments': {
    overview: 'Shops & Establishments Registration is a municipal compliance requirement for all commercial establishments — shops, offices, restaurants, and other service enterprises.',
    whyUs: ['Municipal registration within 7 days', 'State-specific expertise', 'Employee register compliance', 'Renewal reminders'],
  },
  'trade-licence': {
    overview: 'A Trade Licence is issued by the local municipal authority granting permission to carry out a specific trade or business from a particular location.',
    whyUs: ['Municipal authority liaison', 'Fire NOC advisory', 'Location compliance check', 'Annual renewal support'],
  },
  'factory-licence': {
    overview: 'A Factory Licence is required for any premises with 10+ workers using power or 20+ workers without power for manufacturing activity, under the Factories Act 1948.',
    whyUs: ['State Factories Act compliance', 'Plan approval assistance', 'Inspector liaison', 'Annual renewal filing'],
  },
  'trademark-registration': {
    overview: 'Trademark Registration protects your brand identity — name, logo, slogan, or any distinctive mark — giving you exclusive rights to use it and legal remedies against infringers.',
    whyUs: ['Class search & availability check', 'TM-A filing within 24 hours', 'Objection response handled', 'Portfolio management for multiple marks'],
  },
  'copyright-registration': {
    overview: 'Copyright Registration provides legal proof of ownership for creative works — literary, artistic, musical, cinematic, or software code — and helps in enforcement and licensing.',
    whyUs: ['Copyright Office e-filing', 'Examination response support', 'Software & web copyright', 'Literary & artistic works'],
  },
  'design-registration': {
    overview: 'Design Registration protects the unique visual appearance of a product under the Designs Act 2000, preventing unauthorized copying of your product\'s shape, configuration, or ornamentation.',
    whyUs: ['Design Office filing support', 'Novelty search included', 'Restoration of lapsed designs', '10-year protection guidance'],
  },
  'patent-filing': {
    overview: 'Patent protection secures exclusive rights to your novel invention or process for up to 20 years, preventing others from making, using, or selling it without your authorization.',
    whyUs: ['Prior art search included', 'Provisional patent filing', 'Complete specification drafting', 'PCT international filing guidance'],
  },
  'udyam-registration': {
    overview: 'Udyam (MSME) Registration gives your business access to government subsidies, priority lending, trademark fee discounts, and preference in government tenders.',
    whyUs: ['Same-day registration', 'Aadhaar-linked process', 'NIC code selection assistance', 'Benefits advisory included'],
  },
  'gem-registration': {
    overview: 'GeM (Government e-Marketplace) Seller Registration allows your business to supply goods and services directly to government departments, ministries, and PSUs.',
    whyUs: ['Seller profile setup & verification', 'Product listing assistance', 'OEM/Reseller categorization', 'Bid advisory support'],
  },
  'nsic-registration': {
    overview: 'NSIC Registration provides MSMEs with benefits such as credit facilitation, marketing support, and access to raw materials through the National Small Industries Corporation.',
    whyUs: ['NSIC Single Point Registration', 'Tender fee exemption guidance', 'EMD waiver advisory', 'Renewal support'],
  },
  'startup-india-recognition': {
    overview: 'Startup India Recognition (DPIIT) provides tax benefits under Section 80-IAC, easier compliance, and access to the Fund of Funds for qualified startups.',
    whyUs: ['DPIIT application preparation', 'Eligibility assessment', '3-year tax holiday guidance', 'Self-certification compliance'],
  },
  'dpiit-recognition': {
    overview: 'DPIIT (Department for Promotion of Industry and Internal Trade) Recognition is the official gateway to Startup India benefits, including tax exemptions and regulatory relaxations.',
    whyUs: ['Eligibility evaluation', 'Application documentation', 'Fast-track processing', 'Ongoing compliance advisory'],
  },
  'zed-certification': {
    overview: 'ZED (Zero Defect Zero Effect) Certification helps MSMEs achieve quality excellence and reduce environmental impact, unlocking access to export markets and government incentives.',
    whyUs: ['ZED portal registration', 'Bronze to Diamond level guidance', 'Quality process advisory', 'Incentive subsidy support'],
  },
  'fssai-licence': {
    overview: 'FSSAI (Food Safety and Standards Authority of India) Licence is mandatory for all food businesses — manufacturers, processors, retailers, distributors, and cloud kitchens.',
    whyUs: ['Basic, State & Central licence expertise', 'FoSCoS portal application', 'Inspection preparation', 'Annual renewal & modification'],
  },
  'drug-licence': {
    overview: 'A Drug Licence is required for retail pharmacies, wholesale drug distributors, and drug manufacturers under the Drugs and Cosmetics Act 1940.',
    whyUs: ['State Drug Controller filing', 'Retail & wholesale licence', 'Manufacturing licence guidance', 'Annual renewal support'],
  },
  'cosmetics-licence': {
    overview: 'Cosmetics Manufacturing Licence is required under the Drugs and Cosmetics Act for businesses manufacturing beauty and personal care products in India.',
    whyUs: ['GMP compliance guidance', 'State Drug Authority filing', 'Import licence advisory', 'Label compliance review'],
  },
  'legal-metrology': {
    overview: 'Legal Metrology Registration is mandatory for manufacturers and importers of packaged goods, weights, and measuring instruments under the Legal Metrology Act 2009.',
    whyUs: ['Packager registration support', 'Model approval guidance', 'Dealer & repairer licence', 'Label compliance check'],
  },
  'fire-noc': {
    overview: 'A Fire No Objection Certificate (NOC) is mandatory for commercial establishments, hospitals, malls, and factories from the State Fire Department before commencing operations.',
    whyUs: ['Fire safety compliance audit', 'Application filing support', 'Drawing & layout assistance', 'Renewal advisory'],
  },
  'pollution-control': {
    overview: 'Consent to Establish (CTE) and Consent to Operate (CTO) from the State Pollution Control Board are mandatory for manufacturing and industrial units under the Water and Air Acts.',
    whyUs: ['CTE & CTO application support', 'Environmental impact advisory', 'ETP compliance guidance', 'Annual return filing'],
  },
  'iec-registration': {
    overview: 'Import Export Code (IEC) is a mandatory 10-digit code issued by the DGFT (Directorate General of Foreign Trade) for any business engaging in international trade.',
    whyUs: ['DGFT portal e-application', 'IEC in 2-4 days', 'Modification & linkage support', 'AD Code advisory'],
  },
  'dgft-authorizations': {
    overview: 'DGFT Authorizations include Advance Licences, MEIS/SEIS Schemes, Export Promotion Capital Goods (EPCG), and other export incentive schemes administered by DGFT.',
    whyUs: ['Scheme eligibility assessment', 'Application & documentation', 'Export obligation advisory', 'EODC filing support'],
  },
  'rcmc-registration': {
    overview: 'RCMC (Registration-cum-Membership Certificate) is issued by Export Promotion Councils and is required for claiming export benefits and concessions from the Indian government.',
    whyUs: ['Council-specific registration', 'Export product classification', 'Member services advisory', 'Annual renewal'],
  },
  'ad-code': {
    overview: 'AD Code Registration links your bank account with customs for tracking foreign exchange transactions related to imports and exports.',
    whyUs: ['Bank liaison for AD code letter', 'ICEGATE linking assistance', 'Customs registration support', 'Export drawback guidance'],
  },
  'icegate-registration': {
    overview: 'ICEGATE (Indian Customs Electronic Gateway) Registration is mandatory for importers, exporters, and customs agents to file electronic customs declarations.',
    whyUs: ['ICEGATE portal registration', 'DSC linking', 'IEC & AD code integration', 'EDI filing guidance'],
  },
  'dsc-registration': {
    overview: 'A Digital Signature Certificate (DSC) is an electronic signature used for authenticating documents filed with MCA, GST, and Income Tax portals.',
    whyUs: ['Class 3 DSC procurement', '1/2-year validity options', 'Doorstep delivery', 'eSign integration advisory'],
  },
  'din-registration': {
    overview: 'Director Identification Number (DIN) is a unique identifier for company directors, required before appointment and for MCA annual filings.',
    whyUs: ['SPICe+ integrated DIN', 'DIN KYC (DIR-3 KYC)', 'Reactivation of deactivated DIN', 'Annual DIR-3 KYC filing'],
  },
  'mca-kyc': {
    overview: 'MCA KYC (DIR-3 KYC) is mandatory for all DIN holders every year to keep their DIN active and avoid penalty.',
    whyUs: ['Annual KYC filing on time', 'OTP and DSC-based verification', 'Bulk filing for multiple directors', 'Deactivation recovery support'],
  },
  'lei-registration': {
    overview: 'Legal Entity Identifier (LEI) is a 20-digit global reference code for legal entities participating in financial transactions above ₹50 crore.',
    whyUs: ['LEI India registration support', 'Annual renewal reminder', 'Regulatory compliance advisory', 'SWIFT/correspondent bank guidance'],
  },
};

/* ── Get default content ── */
function getContent(slug) {
  return serviceContent[slug] || {
    overview: 'We provide end-to-end professional guidance for this registration, ensuring strict compliance and operational efficiency from day one.',
    whyUs: ['Expert handling by qualified professionals', 'Fast turnaround with real-time updates', 'Transparent pricing — no hidden costs', 'Free post-registration compliance brief'],
  };
}

/* ── Related services for sidebar ── */
function getRelatedServices(slug, category, count = 4) {
  const cat = serviceCategories.find(c => c.title === category);
  if (!cat) return [];
  return cat.services.filter(s => s.slug !== slug).slice(0, count);
}

export default function ServiceDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const serviceData = getServiceBySlug(slug);

  useEffect(() => {
    if (!serviceData) {
      navigate('/services', { replace: true });
    } else {
      document.title = `${serviceData.title} — Sterling Advisory`;
      window.scrollTo(0, 0);
    }
  }, [serviceData, navigate, slug]);

  if (!serviceData) return null;

  const content = getContent(slug);
  const related = getRelatedServices(slug, serviceData.category);

  const deliverables = [
    'Initial Consultation & Strategy Session',
    'Document Collection & Verification',
    'Application Preparation & Review',
    'Government Portal Filing',
    'Liaison with Regulatory Authorities',
    'Certificate Delivery & Post-Registration Brief',
  ];

  return (
    <div style={{ width: '100%', background: 'var(--color-primary)', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <section style={{
        background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(223, 186, 115, 0.15), transparent), linear-gradient(180deg, #05080F 0%, #0A0F1D 60%, #05080F 100%)',
        paddingTop: '8rem', paddingBottom: '4rem', paddingLeft: '1.5rem', paddingRight: '1.5rem',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '64px 64px', pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '88rem', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2rem', flexWrap: 'wrap' }}
          >
            <Link to="/services" style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', transition: 'color 200ms ease' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--color-gold)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
            >
              Services
            </Link>
            <ChevronRight size={12} style={{ color: 'rgba(255,255,255,0.2)' }} />
            <Link
              to={`/services?category=${serviceCategories.find(c => c.title === serviceData.category)?.id}`}
              style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', transition: 'color 200ms ease' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--color-gold)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
            >
              {serviceData.category}
            </Link>
            <ChevronRight size={12} style={{ color: 'rgba(255,255,255,0.2)' }} />
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-gold)' }}>
              {serviceData.title}
            </span>
          </motion.div>

          <div style={{ maxWidth: '800px' }}>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '0.875rem', display: 'block' }}
            >
              ✦ {serviceData.category}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 600, color: '#ffffff', marginBottom: '1.25rem', lineHeight: 1.1 }}
            >
              {serviceData.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.5 }}
              style={{ fontSize: '1.0625rem', color: 'rgba(255,255,255,0.55)', lineHeight: '1.75', maxWidth: '620px' }}
            >
              {content.overview}
            </motion.p>

            {/* Quick stats row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 }}
              style={{ display: 'flex', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap' }}
            >
              {serviceData.timeline && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={15} style={{ color: 'var(--color-gold)' }} />
                  <span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)' }}>{serviceData.timeline}</span>
                </div>
              )}
              {serviceData.fees && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CreditCard size={15} style={{ color: 'var(--color-gold)' }} />
                  <span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', maxWidth: '280px' }}>{serviceData.fees}</span>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section style={{ maxWidth: '88rem', margin: '0 auto', padding: '4rem 1.5rem 6rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '3.5rem', alignItems: 'start' }}>

          {/* ── LEFT: Main Content ── */}
          <div>

            {/* Why Choose Sterling for This Service */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ marginBottom: '3.5rem' }}
            >
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-navy)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Star size={22} style={{ color: 'var(--color-gold)' }} />
                Why Choose Sterling Advisory
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                {content.whyUs.map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: '12px',
                    padding: '1.25rem',
                    background: 'var(--color-secondary)',
                    border: '1px solid var(--color-border-main)',
                    borderLeft: '3px solid var(--color-gold)',
                  }}>
                    <CheckCircle size={17} style={{ color: 'var(--color-gold)', flexShrink: 0, marginTop: '1px' }} />
                    <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-navy)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* What's Included */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ marginBottom: '3.5rem' }}
            >
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-navy)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CheckCircle2 size={22} style={{ color: 'var(--color-gold)' }} />
                What's Included
              </h2>

              <div style={{ position: 'relative', paddingLeft: '1.5rem' }}>
                {/* Vertical line */}
                <div style={{
                  position: 'absolute', left: '2.75rem', top: '2rem', bottom: '2rem',
                  width: '1px',
                  background: 'linear-gradient(180deg, var(--color-gold), rgba(223,186,115,0.1))',
                }} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {deliverables.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', position: 'relative', zIndex: 1 }}
                    >
                      <div style={{
                        width: '44px', height: '44px', flexShrink: 0,
                        background: 'var(--color-navy)',
                        border: '1px solid rgba(223,186,115,0.3)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-gold)',
                        fontWeight: 600,
                      }}>
                        0{i + 1}
                      </div>
                      <div style={{
                        flex: 1, padding: '1rem 1.25rem',
                        background: 'var(--color-secondary)',
                        border: '1px solid var(--color-border-main)',
                        fontSize: '0.9375rem', fontWeight: 500, color: 'var(--color-navy)',
                        transition: 'all 200ms ease',
                      }}>
                        {item}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Required Documents */}
            {serviceData.documents && serviceData.documents.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ marginBottom: '3.5rem' }}
              >
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-navy)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <FileText size={22} style={{ color: 'var(--color-gold)' }} />
                  Required Documents
                </h2>
                <div style={{ background: 'var(--color-secondary)', border: '1px solid var(--color-border-main)', padding: '2rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.75rem' }}>
                    {serviceData.documents.map((doc, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <div style={{ width: '6px', height: '6px', background: 'var(--color-gold)', borderRadius: '50%', marginTop: '7px', flexShrink: 0 }} />
                        <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>{doc}</span>
                      </div>
                    ))}
                  </div>
                  {serviceData.documents.some(doc => doc.includes('*')) && (
                    <p style={{ marginTop: '1.5rem', fontSize: '0.8125rem', color: 'var(--color-text-muted)', display: 'flex', gap: '6px', paddingTop: '1.25rem', borderTop: '1px solid var(--color-border-main)', fontStyle: 'italic' }}>
                      <span style={{ color: 'var(--color-gold)', fontStyle: 'normal', fontWeight: 700 }}>*</span>
                      These documents will be drafted and prepared by our experts as part of the engagement.
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Related Services */}
            {related.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-navy)', marginBottom: '1.25rem' }}>
                  Related Services
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.875rem' }}>
                  {related.map((s) => (
                    <Link
                      key={s.id}
                      to={`/services/${s.slug}`}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '1rem 1.25rem',
                        background: 'var(--color-secondary)', border: '1px solid var(--color-border-main)',
                        transition: 'all 200ms ease', gap: '0.75rem',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-gold)'; e.currentTarget.style.background = 'rgba(223,186,115,0.08)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border-main)'; e.currentTarget.style.background = 'var(--color-secondary)'; }}
                    >
                      <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-navy)' }}>{s.title}</span>
                      <ArrowRight size={14} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* ── RIGHT: Sticky Sidebar ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{ position: 'sticky', top: '6rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              {/* Primary CTA Card */}
              <div style={{ background: 'var(--color-navy)', padding: '2rem', border: '1px solid rgba(223,186,115,0.25)' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '0.5rem' }}>
                    Start Today
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: '#ffffff', marginBottom: '0.625rem' }}>
                    Get {serviceData.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)', lineHeight: '1.65' }}>
                    Our experts will handle everything from start to finish. Book a free consultation to begin.
                  </p>
                </div>

                <Link to="/contact" className="btn-gold" style={{ width: '100%', justifyContent: 'center', marginBottom: '0.75rem' }}>
                  Book Free Consultation <ArrowRight size={15} style={{ marginLeft: '8px' }} />
                </Link>

                <a
                  href={`https://wa.me/918448803143?text=Hi%2C%20I'm%20interested%20in%20getting%20help%20with%20${encodeURIComponent(serviceData.title)}`}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    width: '100%', padding: '0.75rem',
                    background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.3)',
                    fontSize: '0.8125rem', fontWeight: 600, color: '#25D366',
                    transition: 'all 200ms ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(37,211,102,0.18)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(37,211,102,0.1)'; }}
                >
                  <MessageCircle size={16} /> Chat on WhatsApp
                </a>
              </div>

              {/* Timeline */}
              {serviceData.timeline && (
                <div style={{ background: 'var(--color-secondary)', border: '1px solid var(--color-border-main)', padding: '1.5rem' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-text-light)', marginBottom: '0.625rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={13} style={{ color: 'var(--color-gold)' }} /> Estimated Timeline
                  </div>
                  <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.125rem', color: 'var(--color-navy)', fontWeight: 600 }}>{serviceData.timeline}</p>
                </div>
              )}

              {/* Fees */}
              {serviceData.fees && (
                <div style={{ background: 'var(--color-secondary)', border: '1px solid var(--color-border-main)', padding: '1.5rem' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-text-light)', marginBottom: '0.625rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CreditCard size={13} style={{ color: 'var(--color-gold)' }} /> Government Fees
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: '1.6', marginBottom: '0.875rem' }}>{serviceData.fees}</p>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', padding: '0.75rem', background: 'rgba(223,186,115,0.06)', border: '1px solid rgba(223,186,115,0.18)' }}>
                    <ShieldAlert size={14} style={{ color: 'var(--color-gold)', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>Our professional fee is quoted separately based on your case complexity.</span>
                  </div>
                </div>
              )}

              {/* Trust indicators */}
              <div style={{ background: 'var(--color-secondary)', border: '1px solid var(--color-border-main)', padding: '1.5rem' }}>
                {[
                  { icon: CheckCircle, label: '100% Online Process', desc: 'No office visit needed' },
                  { icon: Award, label: 'Qualified Professionals', desc: 'CAs, CSs & Legal experts' },
                  { icon: ShieldCheck, label: 'Data Confidential', desc: 'Your documents are safe' },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} style={{ display: 'flex', gap: '12px', padding: '0.75rem 0', borderBottom: i < 2 ? '1px solid var(--color-border-main)' : 'none' }}>
                      <Icon size={16} style={{ color: 'var(--color-gold)', flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-navy)' }}>{item.label}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{item.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Call button */}
              <Link
                to="/contact"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  padding: '1rem',
                  background: 'transparent', border: '1px solid var(--color-border-main)',
                  fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-navy)',
                  transition: 'all 200ms ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-navy)'; e.currentTarget.style.background = 'var(--color-navy)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border-main)'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-navy)'; }}
              >
                <Phone size={15} /> Send Us a Message
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
