const fs = require('fs');
const path = require('path');

const adminFile = path.join(__dirname, 'frontend', 'src', 'pages', 'admin', 'AdminDashboard.jsx');

let content = fs.readFileSync(adminFile, 'utf8');

// 1. Remove SAMPLE_LEADS block
content = content.replace(/const SAMPLE_LEADS = \[[\s\S]*?\];\n\n/, '');

// 2. Remove fallback logic
content = content.replace(
  /if \(json && json\.success && json\.data\.length > 0\) \{\s*setLeads\(json\.data\);\s*\} else \{\s*setLeads\(SAMPLE_LEADS\);\s*\}/,
  `if (json && json.success) {
        setLeads(json.data || []);
      } else {
        setLeads([]);
      }`
);

content = content.replace(
  /console\.warn\('Backend reach error, using local fallback leads:', err\.message\);\s*setLeads\(SAMPLE_LEADS\);/,
  `console.warn('Backend reach error:', err.message);
      setLeads([]);`
);

// 3. Theme Replacements
const themeReplacements = {
  "background: 'var(--color-primary)'": "background: '#f3f4f6'",
  "background: 'var(--color-secondary)'": "background: '#ffffff'",
  "background: 'var(--color-navy)'": "background: '#f9fafb'",
  "color: '#ffffff'": "color: '#111827'",
  "color: 'var(--color-text-light)'": "color: '#4b5563'",
  "color: 'rgba(255,255,255,0.7)'": "color: '#4b5563'",
  "color: 'rgba(255,255,255,0.65)'": "color: '#4b5563'",
  "color: 'rgba(255,255,255,0.85)'": "color: '#374151'",
  "border: '1px solid rgba(255,255,255,0.08)'": "border: '1px solid #e5e7eb'",
  "borderBottom: '1px solid rgba(255,255,255,0.08)'": "borderBottom: '1px solid #e5e7eb'",
  "borderBottom: '1px solid rgba(255,255,255,0.06)'": "borderBottom: '1px solid #e5e7eb'",
  "border: '1px solid rgba(255,255,255,0.1)'": "border: '1px solid #e5e7eb'",
  "border: '1px solid rgba(255,255,255,0.12)'": "border: '1px solid #d1d5db'",
  "border: '1px solid rgba(255,255,255,0.15)'": "border: '1px solid #d1d5db'",
  "border: '1px solid rgba(255,255,255,0.2)'": "border: '1px solid #d1d5db'",
  "background: 'rgba(255,255,255,0.04)'": "background: '#f9fafb'",
  "background: 'rgba(255,255,255,0.06)'": "background: '#f3f4f6'",
  "background: 'rgba(223,186,115,0.1)'": "background: '#fef3c7'",
  "color: '#34D399'": "color: '#059669'",
  "color: '#60A5FA'": "color: '#2563eb'",
  "borderColor = 'rgba(255,255,255,0.15)'": "borderColor = '#d1d5db'",
  "backgroundColor = 'var(--color-secondary)'": "backgroundColor = '#ffffff'",
  "backgroundColor = 'var(--color-navy)'": "backgroundColor = '#f3f4f6'",
  "borderColor = 'rgba(255,255,255,0.12)'": "borderColor = '#d1d5db'",
  // Fix button text colors that inverted
  "color: '#ffffff', fontWeight: 600": "color: '#111827', fontWeight: 600",
  // Status badges
  "color: '#ffffff' }": "color: '#111827' }" // for options in select
};

for (const [key, value] of Object.entries(themeReplacements)) {
  content = content.split(key).join(value);
}

fs.writeFileSync(adminFile, content, 'utf8');
console.log('Refactored AdminDashboard successfully.');
