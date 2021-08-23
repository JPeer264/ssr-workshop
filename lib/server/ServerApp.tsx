import { ChunkExtractor } from '@loadable/server';
import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { renderToNodeStream } from 'react-dom/server';
import { FilledContext, HelmetProvider } from 'react-helmet-async';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { StaticRouter } from 'react-router';
import { ServerStyleSheet } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { dehydrate, Hydrate } from 'react-query/hydration';
import App, { PreloadedData } from '../app/App';
import devMiddleware from './devMiddleware';
import { fetchUserById, fetchUsers } from '../app/services/api';

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
    const helmetContext: Partial<FilledContext> = {};
    const queryClient = new QueryClient();

    if (/\/users\/\d+/.test(req.originalUrl)) {
      const [, id] = req.originalUrl.match(/\/users\/(\d+)/)!;

      await queryClient.prefetchQuery(['user', id], () => fetchUserById(id));
    } else if (req.originalUrl.includes('/users')) {
      await queryClient.prefetchQuery('users', fetchUsers);
    }

    const dehydratedState = dehydrate(queryClient);

    const initialData: PreloadedData = {
      query: dehydratedState,
    };

    global.window = { __PRELOADED_DATA__: initialData };

    const reactApp = (
      <StaticRouter location={req.originalUrl}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={dehydratedState}>
            <HelmetProvider context={helmetContext}>
              <App />
            </HelmetProvider>
          </Hydrate>
        </QueryClientProvider>
      </StaticRouter>
    );

    await getDataFromTree(reactApp);

    const helmetString = Object.values(helmetContext.helmet || {})
      .filter(Boolean)
      .join('');

    res.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          ${helmetString}
        </head>
        <body>
          <div id="main">
    `);

    const stream = sheet.interleaveWithNodeStream(renderToNodeStream(
      extractor.collectChunks(
        sheet.collectStyles(reactApp),
      ),
    ));

    stream.pipe(res, { end: false });

    stream.on('end', () => (
      res.end(`
            </div>
            ${extractor.getScriptTags()}
            <script type="application/javascript">window.__PRELOADED_DATA__ = ${JSON.stringify(initialData).replace(/</g, '\\u003c')}</script>
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
