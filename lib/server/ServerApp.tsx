import { ChunkExtractor } from '@loadable/server';
import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { renderToString } from 'react-dom/server';
import { FilledContext, HelmetProvider } from 'react-helmet-async';
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
    // Style sheet object to contain all styles generated from styled components
    const styleSheet = new ServerStyleSheet();
    // Chunk extractor to determine which bundle chunks are needed by the render
    const extractor = new ChunkExtractor({ statsFile });
    const helmetContext: Partial<FilledContext> = {};

    // react query
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

    const appHtml = renderToString(
      extractor.collectChunks(
        styleSheet.collectStyles(
          <StaticRouter location={req.originalUrl}>
            <HelmetProvider context={helmetContext}>
              <QueryClientProvider client={queryClient}>
                <Hydrate state={dehydratedState}>
                  <App />
                </Hydrate>
              </QueryClientProvider>
            </HelmetProvider>
          </StaticRouter>,
        ),
      ),
    );

    // helmet
    const helmetString = Object.values(helmetContext.helmet || {})
      .filter(Boolean)
      .join('');

    const responseHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          ${helmetString}
          ${extractor.getStyleTags()}
          ${styleSheet.getStyleTags()}
        </head>
        <body>
          <div id="main">${appHtml}</div>
          <script type="application/javascript">window.__PRELOADED_DATA__ = ${JSON.stringify(initialData).replace(/</g, '\\u003c')}</script>
          ${extractor.getScriptTags()}
        </body>
      </html>
    `;

    styleSheet.seal();

    // inject
    return res.send(responseHtml);
  } catch (err) {
    return next(err);
  }
});

// 404 not found
app.use((req, res) => res.send('errors/404'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.info([`App is listening on port ${port}!`]);
});
