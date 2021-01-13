const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3001',
    }),
  );

  app.use(
    '/rails',
    createProxyMiddleware({
      target: 'http://localhost:3001',
    }),
  );
};
