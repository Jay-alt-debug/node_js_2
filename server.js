const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
const formidable = require('formidable');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {

  // ===== FILE UPLOAD HANDLER =====
  if (req.url === '/upload' && req.method.toLowerCase() === 'post') {

    const form = new formidable.IncomingForm();

    form.uploadDir = path.join(__dirname, 'uploads');
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {

      if (err) {
        res.writeHead(500);
        res.end("Upload error");
        return;
      }

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end('<h2>File uploaded successfully!</h2>');

    });

    return;
  }

  // ===== STATIC FILE SERVING =====

  let filePath = path.join(
    __dirname,
    'public',
    req.url === '/' ? 'index.html' : req.url
  );

  fs.readFile(filePath, (err, content) => {

    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - File Not Found</h1>');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, {
        'Content-Type': mime.lookup(filePath) || 'text/plain'
      });
      res.end(content);
    }

  });

});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
