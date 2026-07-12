const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'frontend', 'public');
const faviconSvgPath = path.join(publicDir, 'favicon.svg');
const faviconIcoPath = path.join(publicDir, 'favicon.ico');

// A premium SVG monogram for "S" (Sterling Advisory)
const premiumSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <!-- Deep Midnight Navy Background -->
  <rect width="100" height="100" rx="20" fill="#0D1527"/>
  
  <!-- Subtle Gold Border -->
  <rect width="96" height="96" x="2" y="2" rx="18" fill="none" stroke="#DFBA73" stroke-width="2" stroke-opacity="0.4"/>

  <!-- Elegant 'S' Monogram -->
  <text x="50" y="68" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-size="64" font-weight="bold" fill="#DFBA73" text-anchor="middle" letter-spacing="-2">S</text>
</svg>`;

// Write the new SVG
fs.writeFileSync(faviconSvgPath, premiumSvg, 'utf8');

// Delete the old .ico file if it exists so it doesn't cache the old Vite logo
if (fs.existsSync(faviconIcoPath)) {
  fs.unlinkSync(faviconIcoPath);
}

// Remove the .ico link from index.html
const indexHtmlPath = path.join(__dirname, 'frontend', 'index.html');
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
indexHtml = indexHtml.replace(/<link rel="icon" href="\/favicon\.ico" \/>\n?\s*/g, '');
fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');

console.log('Favicon replaced successfully!');
