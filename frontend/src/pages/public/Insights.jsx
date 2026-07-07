import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const featuredInsight = {
  id: 'featured',
  category: 'Corporate Strategy',
  date: 'August 12, 2026',
  title: 'The 2026 Corporate Governance Framework: Navigating New Compliance Horizons',
  desc: 'A comprehensive analysis of the latest statutory requirements for Private Limited Companies and how elite enterprises are restructuring to maintain absolute compliance.',
  slug: '2026-corporate-governance-framework'
};

const insights = [
  {
    id: 1,
    category: 'Tax Structuring',
    date: 'August 05, 2026',
    title: 'Cross-Border Mergers: Tax Implications and Mitigation Strategies',
    slug: 'cross-border-mergers-tax-strategies'
  },
  {
    id: 2,
    category: 'Intellectual Property',
    date: 'July 28, 2026',
    title: 'Protecting Digital Assets in the Age of Global E-Commerce',
    slug: 'protecting-digital-assets'
  },
  {
    id: 3,
    category: 'Regulatory',
    date: 'July 15, 2026',
    title: 'FDI in Healthcare: Regulatory Bottlenecks and Solutions',
    slug: 'fdi-healthcare-regulatory'
  },
  {
    id: 4,
    category: 'Startups',
    date: 'June 30, 2026',
    title: 'From Seed to Series A: Structuring Your Entity for Venture Capital',
    slug: 'structuring-entity-venture-capital'
  },
  {
    id: 5,
    category: 'Compliance',
    date: 'June 18, 2026',
    title: 'The Director’s Dilemma: Navigating Personal Liability in Board Decisions',
    slug: 'directors-liability-board-decisions'
  },
  {
    id: 6,
    category: 'Labor Law',
    date: 'June 05, 2026',
    title: 'Modernizing Your Workforce Contracts for the Remote Economy',
    slug: 'workforce-contracts-remote-economy'
  }
];

export default function Insights() {
  return (
    <div className="w-full bg-primary selection:bg-accent selection:text-white min-h-screen">
      
      {/* Header */}
      <section className="pt-32 pb-20 px-6 text-center bg-primary">
        <div className="max-w-4xl mx-auto">
          <span className="text-sm font-bold uppercase tracking-widest text-text-muted mb-6 block">Knowledge Hub</span>
          <h1 className="text-5xl md:text-7xl font-heading font-medium leading-[1.1] text-text-main mb-8">
            Insights & Perspectives.
          </h1>
          <p className="text-lg md:text-xl text-text-muted leading-relaxed mx-auto max-w-2xl font-body font-light">
            Authoritative analysis, regulatory updates, and strategic thinking from our corporate advisory leadership.
          </p>
        </div>
      </section>

      {/* Featured Insight */}
      <section className="pb-24 px-6 border-b border-border-main">
        <div className="max-w-6xl mx-auto">
          <Link to={`/insights/${featuredInsight.slug}`} className="group block">
            <div className="bg-secondary p-12 md:p-20 flex flex-col justify-center min-h-[500px] border border-border-main transition-colors duration-500 hover:border-accent">
              <div className="mb-6 flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-text-muted">
                <span className="text-accent">{featuredInsight.category}</span>
                <span>•</span>
                <span>{featuredInsight.date}</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-heading font-medium text-text-main mb-8 group-hover:text-accent transition-colors duration-500 max-w-4xl leading-[1.15]">
                {featuredInsight.title}
              </h2>
              <p className="text-xl text-text-muted font-light leading-relaxed max-w-3xl mb-12">
                {featuredInsight.desc}
              </p>
              <div className="inline-flex items-center text-sm font-bold text-text-main gap-2 uppercase tracking-wider group-hover:text-accent transition-colors">
                Read the Report <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h3 className="text-3xl font-heading font-medium text-text-main">Latest Publications</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {insights.map((article) => (
              <Link key={article.id} to={`/insights/${article.slug}`} className="group flex flex-col border-t border-border-main pt-8">
                <div className="mb-4 flex items-center justify-between text-xs font-mono text-text-muted">
                  <span className="text-accent">{article.category}</span>
                  <span>{article.date}</span>
                </div>
                <h4 className="text-2xl font-heading font-medium text-text-main mb-6 leading-snug group-hover:text-accent transition-colors duration-300">
                  {article.title}
                </h4>
                <div className="mt-auto inline-flex items-center text-sm font-bold text-text-muted gap-2 uppercase tracking-wider group-hover:text-accent transition-colors">
                  Read Article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-32 bg-secondary border-t border-border-main">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-medium mb-6 text-text-main">Stay ahead of the curve.</h2>
          <p className="text-text-muted mb-12 max-w-xl mx-auto text-lg font-light leading-relaxed">
            Subscribe to our briefing for the latest regulatory shifts, tax strategies, and corporate governance updates.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Enter your corporate email" 
              className="flex-grow px-6 py-4 bg-white border border-border-main focus:outline-none focus:border-accent text-sm"
              required
            />
            <button type="submit" className="px-8 py-4 bg-text-main text-white text-sm font-bold uppercase tracking-widest hover:bg-accent transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}
