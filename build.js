// Generates the static site into dist/. No dependencies: `node build.js`.
const fs = require('fs');
const path = require('path');
const data = require('./src/data');
const ui = require('./src/ui');
const pages = require('./src/pages');

const out = path.join(__dirname, 'dist');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(path.join(out, 'puppies'), { recursive: true });

let count = 0;
const write = (file, page) => {
  fs.writeFileSync(path.join(out, file), ui.layout(page));
  count += 1;
};

write('index.html', pages.home());
write('puppies.html', pages.listing());
write('happy-families.html', pages.families());
write('how-it-works.html', pages.how());
write('faq.html', pages.faq());
write('contact.html', pages.contact());
write('gone-home.html', pages.gone());
write('404.html', pages.notFound());
data.pups.forEach((p) => write(`puppies/${p.slug}.html`, pages.puppy(p)));

for (const f of ['styles.css', 'app.js']) fs.copyFileSync(path.join(__dirname, 'src', f), path.join(out, f));
console.log(`Built ${count} pages into dist/`);
