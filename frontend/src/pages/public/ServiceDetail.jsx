import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight, FileText, Clock, CreditCard, ShieldAlert } from 'lucide-react';
import { getServiceBySlug } from '../../data/services';

export default function ServiceDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const serviceData = getServiceBySlug(slug);

  useEffect(() => {
    if (!serviceData) {
      navigate('/services', { replace: true });
    } else {
      document.title = `${serviceData.title} — Sterling Advisory`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', `${serviceData.shortDesc || serviceData.title} — Professional advisory and registration services by Sterling Advisory.`);
      }
    }
  }, [serviceData, navigate]);

  if (!serviceData) return null;

  const title = serviceData.title;
  const overview = serviceData.shortDesc || "We provide end-to-end guidance to ensure strict compliance and operational efficiency from day one.";
  const documents = serviceData.documents || [
    "PAN Card / Aadhar Card of Directors/Partners/Proprietor",
    "Proof of Registered Office Address",
    "Utility Bill (Electricity/Water)",
    "NOC from Owner (if rented)"
  ];
  const fees = serviceData.fees || "Government fees are charged at actuals based on state/central guidelines. Contact us for an exact quote.";
  const timeline = serviceData.timeline || "7-14 Business Days (Subject to Govt processing)";
  
  const deliverables = [
    "Initial Consultation & Strategy",
    "Document Preparation & Vetting",
    "Government Application Filing",
    "Liaison with Regulatory Authorities",
    "Final Certificate Delivery"
  ];

  return (
    <div className="w-full bg-primary pb-32 min-h-screen">
      {/* Hero Section */}
      <section className="bg-white border-b border-border-main pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/services" className="text-xs font-mono tracking-widest uppercase text-text-muted hover:text-accent transition-colors mb-6 inline-block link-underline pb-0.5">
            ← Back to {serviceData.category}
          </Link>
          <h1 className="text-4xl md:text-6xl font-heading font-medium mb-6 text-text-main tracking-tight">{title}</h1>
          <p className="text-lg md:text-xl text-text-muted leading-relaxed">
            {overview}
          </p>
        </div>
      </section>

      {/* Content Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Main Content (Deliverables & Documents) */}
        <div className="lg:col-span-2 space-y-24">
          
          <div>
            <h2 className="text-2xl font-heading mb-6 flex items-center gap-3">
              <CheckCircle2 className="text-accent" /> What's Included
            </h2>
            <div className="relative pl-6">
              {/* Vertical line connecting steps */}
              <div className="absolute left-[3.25rem] top-6 bottom-6 w-px bg-border-main"></div>
              <ul className="relative space-y-6">
                {deliverables.map((item, i) => (
                  <li key={i} className="relative flex items-center gap-6 group z-10">
                    <div className="w-12 h-12 rounded-full bg-white border border-border-main flex items-center justify-center shrink-0 shadow-sm relative z-10 group-hover:border-accent transition-colors">
                      <span className="text-xs font-mono text-text-muted group-hover:text-accent transition-colors">0{i+1}</span>
                    </div>
                    <div className="flex-1 p-5 bg-white border border-border-main card-hover">
                      <span className="text-sm font-medium">{item}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-heading mb-6 flex items-center gap-3">
              <FileText className="text-accent" /> Required Documents
            </h2>
            <div className="bg-white p-8 border border-border-main card-hover">
              <ul className="space-y-4">
                {documents.map((doc, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-text-muted">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0"></div> 
                    <span className="leading-relaxed">{doc}</span>
                  </li>
                ))}
              </ul>
              {documents.some(doc => doc.includes('*')) && (
                <p className="mt-6 text-xs text-text-muted italic flex items-start gap-1">
                  <span className="text-accent font-bold mt-0.5">*</span>
                  These documents will be drafted and prepared by our experts or under our guidance as part of the engagement.
                </p>
              )}
            </div>
          </div>

        </div>

        {/* Sidebar (Timeline, Pricing, CTA) */}
        <div className="space-y-6">
          <div className="bg-white p-8 border border-border-main space-y-8 sticky top-28 card-hover">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-text-muted mb-3 flex items-center gap-2">
                <Clock size={14} /> Estimated Timeline
              </h3>
              <p className="text-lg font-medium text-text-main">{timeline}</p>
            </div>
            
            <div className="pt-6 border-t border-border-main">
              <h3 className="text-xs font-mono uppercase tracking-widest text-text-muted mb-4 flex items-center gap-2">
                <CreditCard size={14} /> Fees & Charges
              </h3>
              <div className="mb-4">
                <p className="text-sm font-medium text-text-main mb-1">Government Fees</p>
                <p className="text-sm text-text-muted">{fees}</p>
              </div>
              <p className="text-xs text-text-muted flex items-start gap-1.5 mt-3">
                <ShieldAlert size={14} className="shrink-0 mt-0.5" />
                <span>Our professional advisory fee will be quoted separately based on your specific case complexity.</span>
              </p>
            </div>

            <div className="pt-6 border-t border-border-main">
              <Link to="/contact" className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-text-main text-white text-sm font-medium btn-hover rounded-none">
                Initiate Engagement <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}
