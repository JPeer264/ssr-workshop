import { ChunkExtractor } from '@loadable/server';
import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { renderToNodeStream } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { ServerStyleSheet } from 'styled-components';
import App from '../app/App';
import devMiddleware from './devMiddleware';

const statsFile = path.resolve(process.cwd(), 'dist/loadable-stats.json');
const app = express();

if (process.env.NODE_ENV === 'development') {
  devMiddleware(app);
}

global.fetch = fetch;

// static assets server from the "dist" folder
app.use(express.static(path.join(__dirname, '../dist'), { index: false }));
app.use(express.json());
app.use(express.urlencoded());

app.get('/*', async (req, res, next) => {
  try {
    const sheet = new ServerStyleSheet();
    const extractor = new ChunkExtractor({ statsFile });

    res.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
        </head>
        <body>
          <div id="main">
    `);

    const stream = sheet.interleaveWithNodeStream(renderToNodeStream(
      extractor.collectChunks(
        sheet.collectStyles(
          <StaticRouter location={req.originalUrl}>
            <App />
          </StaticRouter>,
        ),
      ),
    ));

    stream.pipe(res, { end: false });

    stream.on('end', () => (
      res.end(`
            </div>
            ${extractor.getScriptTags()}
          </body>
        </html>
      `)
    ));
  } catch (err) {
    next(err);
  }
});

// 404 not found
app.use((req, res) => res.send('errors/404'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.info([`App is listening on port ${port}!`]);
});
