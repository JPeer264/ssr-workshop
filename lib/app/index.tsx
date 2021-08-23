import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import { HelmetProvider } from 'react-helmet-async';
import { hydrate } from 'react-dom';
import App from './App';

loadableReady(() => {
  hydrate((
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  ), document.getElementById('main'));
});
