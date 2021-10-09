import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'atukan0930',
  apiKey: process.env.API_KEY,
});