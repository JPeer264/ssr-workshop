import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import { hydrate } from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import App from './App';

const dehydratedState = window.__PRELOADED_DATA__?.query;
const queryClient = new QueryClient();

loadableReady(() => {
  hydrate((
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={dehydratedState}>
          <App />
        </Hydrate>
      </QueryClientProvider>
    </BrowserRouter>
  ), document.getElementById('main'));
});
