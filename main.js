import express from 'express';
import * as fs from 'fs';
import path from 'path';

export function app() {
  const server = express();
  const distFolder = path.join(process.cwd(), 'browser');

  server.use(function (request, response, next) {
    if (process.env['NODE_ENV'] !== 'development' && !request.secure) {
      const host = request.get('host');

      if (host && host.toLowerCase().includes('astritdemiri.com')) {
        return response.redirect("https://" + request.headers.host + request.url);
      }
    }

    next();
  })

  server.set('views', distFolder);

  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  server.get('*', (_req, res) => {
    res.sendFile(distFolder + '/index.html');
  });

  return server;
}

const port = process.env['PORT'] || 4000;

// Start up the Node server
const server = app();
server.listen(port, () => {
  console.log(`Node Express server listening on http://localhost:${port}`);
});
