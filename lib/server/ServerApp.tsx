import { ChunkExtractor } from '@loadable/server';
import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
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
    const extractor = new ChunkExtractor({ statsFile });

    const appHtml = renderToString(
      extractor.collectChunks(
        <StaticRouter location={req.originalUrl}>
          <App />
        </StaticRouter>,
      ),
    );

    const responseHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
        </head>
        <body>
          <div id="main">${appHtml}</div>
          ${extractor.getScriptTags()}
        </body>
      </html>
    `;

    res.send(responseHtml);
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
