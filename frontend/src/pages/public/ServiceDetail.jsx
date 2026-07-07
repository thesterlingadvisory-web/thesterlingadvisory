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
    <div className="w-full bg-primary pb-24 min-h-screen">
      {/* Hero Section */}
      <section className="bg-white border-b border-border-main pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/services" className="text-xs font-mono tracking-widest uppercase text-text-muted hover:text-accent transition-colors mb-6 inline-block">
            ← Back to {serviceData.category}
          </Link>
          <h1 className="text-4xl md:text-6xl font-heading font-medium mb-6 text-text-main tracking-tight">{title}</h1>
          <p className="text-lg md:text-xl text-text-muted leading-relaxed">
            {overview}
          </p>
        </div>
      </section>

      {/* Content Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Main Content (Deliverables & Documents) */}
        <div className="lg:col-span-2 space-y-16">
          
          <div>
            <h2 className="text-2xl font-heading mb-6 flex items-center gap-3">
              <CheckCircle2 className="text-accent" /> What's Included
            </h2>
            <ul className="space-y-4">
              {deliverables.map((item, i) => (
                <li key={i} className="flex items-start gap-4 p-5 bg-white border border-border-main rounded-sm shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-xs font-mono text-text-muted mt-1">0{i+1}</span>
                  <span className="text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-heading mb-6 flex items-center gap-3">
              <FileText className="text-accent" /> Required Documents
            </h2>
            <div className="bg-white border border-border-main p-8 rounded-sm shadow-sm">
              <ul className="space-y-4">
                {documents.map((doc, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-text-muted">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0"></div> 
                    <span className="leading-relaxed">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Sidebar (Timeline, Pricing, CTA) */}
        <div className="space-y-6">
          <div className="bg-white border border-border-main p-8 rounded-sm shadow-sm space-y-8 sticky top-28">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-text-muted mb-3 flex items-center gap-2">
                <Clock size={14} /> Estimated Timeline
              </h3>
              <p className="text-lg font-medium text-text-main">{timeline}</p>
            </div>
            
            <div className="pt-6 border-t border-border-main">
              <h3 className="text-xs font-mono uppercase tracking-widest text-text-muted mb-3 flex items-center gap-2">
                <CreditCard size={14} /> Fees & Charges
              </h3>
              <div className="bg-primary/50 p-4 rounded-sm border border-border-main mb-3">
                <p className="text-sm font-medium text-text-main mb-1">Government Fees</p>
                <p className="text-sm text-text-muted">{fees}</p>
              </div>
              <p className="text-xs text-text-muted flex items-start gap-1.5 mt-3">
                <ShieldAlert size={14} className="shrink-0 mt-0.5" />
                <span>Our professional advisory fee will be quoted separately based on your specific case complexity.</span>
              </p>
            </div>

            <div className="pt-6 border-t border-border-main">
              <Link to="/contact" className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-text-main text-white text-sm font-medium hover:bg-black hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 rounded-sm">
                Initiate Engagement <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}
