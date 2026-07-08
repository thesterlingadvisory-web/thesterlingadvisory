import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { serviceCategories } from '../../data/services';
import { Landmark, BarChart2, Users, Shield, CheckCircle2, TrendingUp, ArrowRight } from 'lucide-react';

const iconMap = {
  Landmark: <Landmark className="w-6 h-6 text-accent" strokeWidth={1.5} />,
  BarChart2: <BarChart2 className="w-6 h-6 text-accent" strokeWidth={1.5} />,
  Users: <Users className="w-6 h-6 text-accent" strokeWidth={1.5} />,
  Shield: <Shield className="w-6 h-6 text-accent" strokeWidth={1.5} />,
  CheckCircle2: <CheckCircle2 className="w-6 h-6 text-accent" strokeWidth={1.5} />,
  TrendingUp: <TrendingUp className="w-6 h-6 text-accent" strokeWidth={1.5} />
};

export default function Services() {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');

  const displayedCategories = categoryFilter 
    ? serviceCategories.filter(c => c.id === categoryFilter)
    : serviceCategories;

  return (
    <div className="w-full bg-primary min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-heading mb-6 tracking-tight">
            {categoryFilter && displayedCategories.length > 0 ? displayedCategories[0].title : "Our Services"}
          </h1>
          <p className="text-lg text-text-muted">
            {categoryFilter && displayedCategories.length > 0 
              ? displayedCategories[0].description 
              : "Explore our comprehensive suite of registration and compliance services designed to build, protect, and scale your business."}
          </p>
          {categoryFilter && (
            <Link to="/services" className="inline-block mt-6 text-sm font-bold text-accent hover:text-text-main transition-colors">
              ← View All Services
            </Link>
          )}
        </div>
      </section>

      {/* Grid Area */}
      <section className="pb-40 px-6 max-w-7xl mx-auto">
        {categoryFilter && displayedCategories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-border-main">
            {displayedCategories[0].services.map((service) => (
              <Link 
                key={service.id} 
                to={`/services/${service.slug}`}
                className="bg-white p-10 border-r border-b border-border-main card-hover flex flex-col group rounded-none"
              >
                <h3 className="text-xl font-heading font-bold mb-3 group-hover:text-accent transition-colors link-underline pb-1 w-max">{service.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed mb-6 flex-grow">{service.shortDesc}</p>
                <div className="flex items-center text-xs font-bold text-accent group-hover:translate-x-1 transition-transform">
                  View Details <ArrowRight size={14} className="ml-1" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-l border-border-main">
            {displayedCategories.map((category) => (
              <div key={category.id} className="bg-white p-10 md:p-12 border-r border-b border-border-main card-hover rounded-none">
                <div className="flex items-start md:items-center gap-4 mb-8 flex-col md:flex-row">
                  <div className="w-14 h-14 bg-primary flex items-center justify-center shrink-0 rounded-none">
                    {iconMap[category.icon] || <CheckCircle2 className="w-6 h-6 text-accent" strokeWidth={1.5} />}
                  </div>
                  <div>
                    <h2 className="text-2xl font-heading font-bold text-text-main mb-1">{category.title}</h2>
                    <p className="text-sm text-text-muted leading-relaxed font-medium">{category.description}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 mt-4">
                  {category.services.map((service) => (
                    <Link 
                      key={service.id} 
                      to={`/services/${service.slug}`}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium border border-border-main text-text-main bg-white hover:text-accent transition-colors duration-200 rounded-none"
                    >
                      <span className="link-underline pb-0.5">{service.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
