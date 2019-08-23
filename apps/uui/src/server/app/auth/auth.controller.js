// Config
import { $auth } from '../../../../config';

// Utils
import { apiFetch } from '../../../shared/utils/api';
import { forEach } from '../../../shared/utils/object';
import { md5 } from '../../../shared/utils/security';

// Construct a Auth url. There are two different paths (login and token), but the rest is common.
const makeAuthUrl = (path, params = {}) => {
  let url = `${$auth().protocol}://${$auth().tokenIssuer}:${
    $auth().port
  }/${path}`;

  const urlParams = [];

  forEach(params, param =>
    urlParams.push(
      `${encodeURIComponent(param)}=${encodeURIComponent(params[param])}`,
    ),
  );

  if (urlParams.length) {
    url += `?${urlParams.join('&')}`;
  }

  return url;
};

/*
  We logged in with Auth and it gave us a code. We send this code along to a
  different endpoint to get the user info.
*/
const getAuthToken = req =>
  new Promise(resolve => {
    const { code } = req.query;
    const params = {
      client_id: $auth().clientId,
      client_secret: $auth().clientSecret,
      grant_type: 'authorization_code',
      code,
      redirect_uri: $auth().callbackUrl,
    };

    const options = {
      method: 'POST',
    };

    apiFetch(makeAuthUrl($auth().tokenPath, params), options, false, true)
      .then(response => resolve(response))
      .catch(error => Promise.reject(error));
  });

const redirect = (req, res) => {
  res.redirect(
    makeAuthUrl($auth().authPath, {
      client_id: $auth().clientId,
      response_type: 'code',
      scope: $auth().scope,
      redirect_uri: $auth().callbackUrl,
      state: req.originalUrl,
    }),
  );
};

// Handler for signout...
export const authSignOut = (req, res) => {
  res.destroySessions();

  res.redirect('https://path.to.auth.com/services/ssoReset?messageId=101');
};

export const loadUserInSession = (req, res) => {
  getMyIdToken(req)
    .then(token => {
      res.session('userToken', token);
      res.session('userTokenEncrypted', md5(token.access_token));

      res.redirect('/');
    })
    .catch(error => {
      console.log('Load User Catch:', error); // eslint-disable-line no-console

      res
        .status(401)
        .send(
          `<h1>Authentication Error</h1><code>${JSON.stringify(
            error,
            null,
            2,
          )}</code>`,
        );
    });
};

export const authMiddleware = (req, res, next) => {
  const userToken = !!res.session('userToken');

  if (userToken) {
    return next();
  } else {
    res.destroySessions();

    redirect(req, res);
  }
};
