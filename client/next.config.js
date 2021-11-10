/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

module.exports = { 
    images: {
      domains: ['randomuser.me'],
    },
    webpackDevMiddleware: config => {
      config.watchOptions.poll = 300;
      return config;
    },
    reactStrictMode: true,
    i18n
  };