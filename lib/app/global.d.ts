import { PreloadedData } from './App';

declare global {
  interface Window {
    __PRELOADED_DATA__?: PreloadedData;
  }
}

// eslint-disable-next-line no-underscore-dangle
window.__PRELOADED_DATA__ = window.__PRELOADED_DATA__ || {};
