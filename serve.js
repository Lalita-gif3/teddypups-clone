// Local preview of dist/ with the same clean URLs Vercel uses.
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, 'dist');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript' };
const port = process.env.PORT || 4173;

http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  let file = path.join(root, url === '/' ? 'index.html' : url);
  if (!path.extname(file)) file += '.html';
  const found = file.startsWith(root + path.sep) && fs.existsSync(file);
  const target = found ? file : path.join(root, '404.html');
  res.writeHead(found ? 200 : 404, { 'content-type': types[path.extname(target)] || 'application/octet-stream' });
  fs.createReadStream(target).pipe(res);
}).listen(port, () => console.log(`http://localhost:${port}`));
