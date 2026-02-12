const formidable = require('formidable');

if (req.url === '/upload' && req.method.toLowerCase() === 'post') {

  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, 'uploads');
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {

    if (err) {
      res.writeHead(500);
      res.end("Upload Error");
      return;
    }

    res.writeHead(200);
    res.end("File uploaded successfully");

  });

  return;
}
