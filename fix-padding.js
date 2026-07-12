const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'frontend', 'src');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

walk(srcDir, function(filePath) {
  if (filePath.endsWith('.jsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Replace standard horizontal paddings
    content = content.replace(/padding:\s*'0 2rem'/g, "padding: '0 clamp(1rem, 5vw, 2rem)'");
    content = content.replace(/padding:\s*'0 3rem'/g, "padding: '0 clamp(1rem, 5vw, 3rem)'");
    
    // Replace complex paddings
    content = content.replace(/padding:\s*'5rem 2rem 3rem'/g, "padding: 'clamp(3rem, 10vw, 5rem) clamp(1rem, 5vw, 2rem) 3rem'");
    content = content.replace(/padding:\s*'3.5rem 2rem'/g, "padding: '3.5rem clamp(1rem, 5vw, 2rem)'");
    content = content.replace(/padding:\s*'4rem 2rem'/g, "padding: '4rem clamp(1rem, 5vw, 2rem)'");
    content = content.replace(/padding:\s*'2rem 2.25rem'/g, "padding: 'clamp(1rem, 5vw, 2rem) clamp(1rem, 5vw, 2.25rem)'");
    content = content.replace(/padding:\s*'2rem'/g, "padding: 'clamp(1rem, 5vw, 2rem)'");
    content = content.replace(/padding:\s*'3rem'/g, "padding: 'clamp(1rem, 5vw, 3rem)'");
    content = content.replace(/padding:\s*'1.5rem 2rem'/g, "padding: '1.5rem clamp(1rem, 5vw, 2rem)'");
    content = content.replace(/padding:\s*'1.25rem 2rem'/g, "padding: '1.25rem clamp(1rem, 5vw, 2rem)'");
    content = content.replace(/padding:\s*'6rem 2rem 2rem'/g, "padding: 'clamp(4rem, 10vw, 6rem) clamp(1rem, 5vw, 2rem) 2rem'");
    content = content.replace(/padding:\s*'4rem 2rem 0'/g, "padding: 'clamp(2rem, 10vw, 4rem) clamp(1rem, 5vw, 2rem) 0'");

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated', filePath);
    }
  }
});
