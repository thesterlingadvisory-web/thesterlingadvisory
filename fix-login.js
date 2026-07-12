const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'frontend', 'src', 'components', 'layout', 'AdminLayout.jsx');

let content = fs.readFileSync(file, 'utf8');

// The login screen is between "RESTRICTED LOGIN SCREEN" and "AUTHENTICATED INSTITUTIONAL DARK THEME ADMIN DESK"
const loginStartIndex = content.indexOf('// ── RESTRICTED LOGIN SCREEN');
const authStartIndex = content.indexOf('// ── AUTHENTICATED INSTITUTIONAL DARK THEME ADMIN DESK');

let beforeLogin = content.substring(0, loginStartIndex);
let loginBlock = content.substring(loginStartIndex, authStartIndex);
let afterLogin = content.substring(authStartIndex);

// Refactor loginBlock
loginBlock = loginBlock.replace(/background: 'var\(--color-primary\)'/, "background: '#f3f4f6'");
loginBlock = loginBlock.replace(/background: 'var\(--color-secondary\)'/, "background: '#ffffff'");
loginBlock = loginBlock.replace(/border: '1px solid rgba\(223,186,115,0\.3\)'/, "border: '1px solid #e5e7eb'");
loginBlock = loginBlock.replace(/color: '#ffffff'/g, "color: '#111827'");
loginBlock = loginBlock.replace(/color: 'rgba\(255,255,255,0\.65\)'/, "color: '#4b5563'");
loginBlock = loginBlock.replace(/border: '1px solid rgba\(255,255,255,0\.15\)'/g, "border: '1px solid #d1d5db'");
loginBlock = loginBlock.replace(/background: 'rgba\(255,255,255,0\.04\)'/g, "background: '#f9fafb'");
loginBlock = loginBlock.replace(/Practitioner ID \/ Email/, "Login ID");
loginBlock = loginBlock.replace(/placeholder="e\.g\. admin or counsel@thesterlingadvisory\.com"/, 'placeholder="Enter your Login ID"');
loginBlock = loginBlock.replace(/borderColor = 'rgba\(255,255,255,0\.15\)'/g, "borderColor = '#d1d5db'");
loginBlock = loginBlock.replace(/borderTop: '1px solid rgba\(255,255,255,0\.1\)'/, "borderTop: '1px solid #e5e7eb'");

// Fix lock icon background
loginBlock = loginBlock.replace(/background: 'var\(--color-navy\)'/, "background: '#fef3c7'"); // Light gold/yellow
loginBlock = loginBlock.replace(/border: '1px solid var\(--color-gold\)'/, "border: '1px solid #f59e0b'");
loginBlock = loginBlock.replace(/boxShadow: '0 8px 20px rgba\(223, 186, 115, 0\.25\)'/, "boxShadow: '0 4px 10px rgba(245, 158, 11, 0.15)'");

content = beforeLogin + loginBlock + afterLogin;

fs.writeFileSync(file, content, 'utf8');
console.log('Admin login refactored.');
