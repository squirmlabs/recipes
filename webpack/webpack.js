// Webpack Configuration (Client & Server) - Place in Root
import clientConfig from './webpack/webpack.config.client';
import serverConfig from './webpack/webpack.config.server';

export default [
  clientConfig,
  serverConfig
];
