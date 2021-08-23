import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import { hydrate } from 'react-dom';
import App from './App';

loadableReady(() => {
  hydrate((
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), document.getElementById('main'));
});
