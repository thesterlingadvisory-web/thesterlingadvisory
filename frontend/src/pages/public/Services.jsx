import React from 'react';
import { Link } from 'react-router-dom';
import { serviceCategories } from '../../data/services';
import { Landmark, BarChart2, Users, Shield, CheckCircle2, TrendingUp } from 'lucide-react';

const iconMap = {
  Landmark: <Landmark className="w-6 h-6" />,
  BarChart2: <BarChart2 className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
  CheckCircle2: <CheckCircle2 className="w-6 h-6" />,
  TrendingUp: <TrendingUp className="w-6 h-6" />
};

export default function Services() {
  return (
    <div className="w-full bg-primary min-h-screen">
      {/* Header */}
      <section className="pt-24 pb-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-heading mb-6 tracking-tight">Our Services</h1>
          <p className="text-lg text-text-muted">
            Explore our comprehensive suite of registration and compliance services designed to build, protect, and scale your business.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="pb-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {serviceCategories.map((category) => (
            <div key={category.id} className="bg-white p-8 md:p-10 border border-border-main rounded-none hover:shadow-xl hover:shadow-black/5 transition-all duration-500">
              <div className="flex items-start md:items-center gap-4 mb-8 flex-col md:flex-row">
                <div className="w-14 h-14 bg-primary flex items-center justify-center text-accent shrink-0 rounded-none border border-border-main">
                  {iconMap[category.icon] || <CheckCircle2 className="w-6 h-6" />}
                </div>
                <div>
                  <h2 className="text-2xl font-heading font-medium text-text-main mb-1">{category.title}</h2>
                  <p className="text-sm text-text-muted leading-relaxed">{category.description}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2.5">
                {category.services.map((service) => (
                  <Link 
                    key={service.id} 
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center px-4 py-2 text-sm font-bold border border-border-main text-text-main bg-primary/30 hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 rounded-none"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
