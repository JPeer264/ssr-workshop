import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import { render } from 'react-dom';
import App from './App';

loadableReady(() => {
  render((
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), document.getElementById('main'));
});
