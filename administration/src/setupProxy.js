const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://10.0.2.2:3000',
    }),
  );

  app.use(
    '/rails',
    createProxyMiddleware({
      target: 'http://10.0.2.2:3000',
    }),
  );
};
