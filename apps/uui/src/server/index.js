// Dependencies
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import exphbs from 'express-handlebars';
import express from 'express';
import path from 'path';

// Configuration
import { $views, $serverPort, $isLocal } from '../../config';

// Utils
import { isMobile, isBot } from '../shared/utils/device';

// Helpers
import * as hbsHelper from '../shared/helpers/handlebars';
import sessionHelper from '../shared/helpers/session';

// Router
import router from './router';

// Express app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('secret'));
app.use(cors({ credentials: true, origin: true }));
app.use(sessionHelper);

// Handlebars setup
app.engine(
  $views().engine,
  exphbs({
    extname: $views().extension,
    helpers: hbsHelper,
    layoutsDir: path.join(__dirname, './views/layouts'),
    partialsDir: path.join(__dirname, './views/partials'),
  }),
);

// view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', $views().engine);
// GZip Compression just for Production
if (!$isLocal()) {
  app.get('*.js', (req, res, next) => {
    if (req.headers['user-agent'].includes('Firefox')) {
      return next();
    }

    req.url = `${req.url}.gz`;
    res.set('Content-Encoding', 'gzip');
    res.set('Accept-Encoding', 'gzip,deflate');

    return next();
  });
}

// Public static
app.use(express.static(path.join(__dirname, '../../public')));

// Device Detection
app.use((req, res, next) => {
  req.isBot = isBot(req.headers['user-agent']);
  req.isMobile = isMobile(req.headers['user-agent']);

  return next();
});

// Router
router(app);

// Listening
app.listen($serverPort());
