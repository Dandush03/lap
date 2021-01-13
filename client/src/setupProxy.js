import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3000',
    }),
  );

  app.use(
    '/rails',
    createProxyMiddleware({
      target: 'http://localhost:3000',
    }),
  );
};
