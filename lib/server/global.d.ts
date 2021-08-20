import { RequestInfo, RequestInit, Response } from 'node-fetch';
import { PreloadedData } from '../app/App';

declare global {
  namespace NodeJS {
    interface Global {
      window: {
        __PRELOADED_DATA__?: PreloadedData;
      };
      fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
    }
  }
}
