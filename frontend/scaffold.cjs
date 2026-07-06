const fs = require('fs');
const path = require('path');

const components = [
  'src/components/layout/PublicLayout.jsx',
  'src/components/layout/AdminLayout.jsx',
  'src/pages/public/Home.jsx',
  'src/pages/public/Capabilities.jsx',
  'src/pages/public/CapabilityDetail.jsx',
  'src/pages/public/Industries.jsx',
  'src/pages/public/IndustryDetail.jsx',
  'src/pages/public/Insights.jsx',
  'src/pages/public/InsightDetail.jsx',
  'src/pages/public/Resources.jsx',
  'src/pages/public/About.jsx',
  'src/pages/public/Contact.jsx',
  'src/pages/public/NotFound.jsx',
  'src/pages/admin/AdminDashboard.jsx',
  'src/pages/admin/HomepageBuilder.jsx',
];

components.forEach(file => {
  const absolutePath = path.join(__dirname, file);
  const name = path.basename(file, '.jsx');
  
  let content = `import React from 'react';\n\nexport default function ${name}() {\n  return (\n    <div className="p-8">\n      <h1 className="text-3xl font-heading">${name}</h1>\n    </div>\n  );\n}\n`;

  if (name === 'PublicLayout') {
    content = `import React from 'react';\nimport { Outlet } from 'react-router-dom';\n\nexport default function PublicLayout() {\n  return (\n    <div className="min-h-screen flex flex-col">\n      <header className="p-4 border-b border-gray-200">Public Navbar</header>\n      <main className="flex-grow">\n        <Outlet />\n      </main>\n      <footer className="p-4 border-t border-gray-200">Public Footer</footer>\n    </div>\n  );\n}\n`;
  } else if (name === 'AdminLayout') {
    content = `import React from 'react';\nimport { Outlet } from 'react-router-dom';\n\nexport default function AdminLayout() {\n  return (\n    <div className="min-h-screen flex">\n      <aside className="w-64 border-r border-gray-200 p-4">Admin Sidebar</aside>\n      <main className="flex-grow p-4">\n        <Outlet />\n      </main>\n    </div>\n  );\n}\n`;
  }

  fs.writeFileSync(absolutePath, content);
});
console.log('Scaffold complete');
