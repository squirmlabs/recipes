// Dependencies
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';

// Configuration
import { $api, $baseUrl, $isLocal, $whitelist } from '../../config';

// Utils
import { isMobile } from '../shared/utils/device';
import { getCurrentApp } from '../shared/utils/url';
import { apiFetch } from '../shared/utils/api';

// Webpack Configuration
import webpackConfig from '../../webpack.config';

// Client Render
import clientRender from './render/clientRender';

// Importing controllers
import apiController from './app/api/api.controller';
import {
  authMiddleware,
  authSignOut,
  loadUserInSession,
} from './app/auth/auth.controller';

// Webpack Compiler
const compiler = webpack(webpackConfig);

export default app => {
  app.use((req, res, next) => {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate');

    return next();
  });

  // base Url && basePath && currentUrl && currentApp
  app.use((req, res, next) => {
    res.currentApp = getCurrentApp(req.originalUrl);
    res.currentUrl = $baseUrl() + req.originalUrl;
    res.baseUrl = res.locals.baseUrl = $baseUrl();

    return next();
  });

  const requireHTTPS = (req, res, next) => {
    if (!($isLocal() || req.headers['x-forwarded-proto'] === 'https')) {
      res.redirect(`https://${req.get('host')}${req.url}`);
    } else {
      next();
    }
  };

  // Device detector
  app.use((req, res, next) => {
    res.isMobile = res.locals.isMobile = isMobile(req.headers['user-agent']);

    return next();
  });

  // Controllers dispatch
  app.get('/authcallback', loadUserInSession);
  app.get('/health', (req, res) => {
    res.sendStatus(200);
  });

  // Expose properties for environment debug
  app.get('/info', (req, res) => {
    res.json({ externalApi: `${$api().externalApi}` });
  });

  app.get('/*', requireHTTPS, authMiddleware, (req, res, next) => {
    const isWhitelistedUrl =
      $whitelist().includes(req.url) ||
      $whitelist().filter(
        url =>
          url.includes('*') &&
          url.includes(
            req.url
              .split('/')
              .slice(0, -1)
              .join('/'),
          ),
      ).length > 0;

    if (
      req.headers['user-agent'].includes('MSIE') ||
      req.headers['user-agent'].includes('Edge')
    ) {
      req.currentStatus = 'IE';

      return next();
    }

    if (!isWhitelistedUrl && !$isLocal()) {
      console.warn(`WARNING: URL: ${req.url} is not white listed.`);
      res.redirect('/');
    } else {
      return next();
    }
  });
  app.get('/signout', authSignOut);
  app.get('/', requireHTTPS, authMiddleware, (req, res, next) => {
    const userToken = res.session('userToken');

    apiFetch(
      `${$api().externalApi}/me`,
      {
        headers: {
          accessToken: userToken.access_token,
        },
      },
      false,
      true,
    ).then(data => {
      if (data.error) {
        req.currentStatus = 'Error';

        return next();
      } else {
        return next();
      }
    });
  });

  app.use('/api', apiController);

  // React dispatch
  if ($isLocal()) {
    // Hot Module Replacement
    app.use(webpackDevMiddleware(compiler));
    app.use(
      webpackHotMiddleware(
        compiler.compilers.find(compiler => compiler.name === 'client'),
      ),
    );
  }

  // Client Side Rendering
  app.use(clientRender());

  // Disabling x-powered-by
  app.disable('x-powered-by');

  // Global Error Handler
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    res.status(err.response.status);
    res.json(err.response.data);
  });
};
