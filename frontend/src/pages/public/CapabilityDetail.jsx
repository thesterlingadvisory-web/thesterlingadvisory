import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, FileText, Clock, CreditCard } from 'lucide-react';

export default function CapabilityDetail() {
  const { slug } = useParams();

  // In a real app, we would fetch the capability and its services from the backend API using the slug.
  // For now, we use placeholder data that feels premium and matches the McKinsey aesthetic.
  const service = {
    title: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    overview: "We provide end-to-end guidance to ensure strict compliance and operational efficiency from day one.",
    deliverables: [
      "Initial Consultation & Strategy",
      "Document Preparation & Vetting",
      "Government Application Filing",
      "Liaison with Regulatory Authorities",
      "Final Certificate Delivery"
    ],
    documents: [
      "PAN Card / Aadhar Card of Directors",
      "Proof of Registered Office Address",
      "Utility Bill (Electricity/Water)",
      "NOC from Owner (if rented)"
    ],
    timeline: "7-14 Business Days",
    pricing: "Transparent Fixed Fee Structure"
  };

  return (
    <div className="w-full bg-primary pb-24">
      {/* Hero Section */}
      <section className="bg-white border-b border-border-main pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/capabilities" className="text-xs font-mono tracking-widest uppercase text-text-muted hover:text-accent transition-colors mb-6 inline-block">
            ← Back to Corporate Practices
          </Link>
          <h1 className="text-4xl md:text-6xl font-heading font-medium mb-6 text-text-main">{service.title}</h1>
          <p className="text-lg md:text-xl text-text-muted leading-relaxed">
            {service.overview}
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
              {service.deliverables.map((item, i) => (
                <li key={i} className="flex items-start gap-4 p-4 bg-white border border-border-main rounded-sm">
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
            <div className="bg-white border border-border-main p-8 rounded-sm">
              <ul className="space-y-3">
                {service.documents.map((doc, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-text-muted">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div> {doc}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Sidebar (Timeline, Pricing, CTA) */}
        <div className="space-y-6">
          <div className="bg-white border border-border-main p-8 rounded-sm space-y-8">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-text-muted mb-2 flex items-center gap-2">
                <Clock size={14} /> Estimated Timeline
              </h3>
              <p className="text-lg font-medium">{service.timeline}</p>
            </div>
            
            <div className="pt-6 border-t border-border-main">
              <h3 className="text-xs font-mono uppercase tracking-widest text-text-muted mb-2 flex items-center gap-2">
                <CreditCard size={14} /> Advisory Fee
              </h3>
              <p className="text-lg font-medium">{service.pricing}</p>
              <p className="text-xs text-text-muted mt-2">* Government fees are charged at actuals.</p>
            </div>

            <div className="pt-6 border-t border-border-main">
              <Link to="/contact" className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-text-main text-white text-sm font-medium hover:bg-black transition-colors rounded-sm">
                Initiate Engagement <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}
