import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { loadableReady } from '@loadable/component';
import { HelmetProvider } from 'react-helmet-async';
import { Hydrate } from 'react-query/hydration';
import { hydrate } from 'react-dom';
import App from './App';

const queryClient = new QueryClient();
const dehydratedState = window.__PRELOADED_DATA__?.query;

loadableReady(() => {
  hydrate((
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={dehydratedState}>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </Hydrate>
      </QueryClientProvider>
    </BrowserRouter>
  ), document.getElementById('main'));
});
