import serialize from 'serialize-javascript';

export default function html(options) {
  const { markup, initialState, currentApp, isNotLocal, helmet } = options;

  const stylesheet = `/css/${currentApp}.css`;
  const link = isNotLocal
    ? `<link rel="stylesheet" href="${stylesheet}" />`
    : '';

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no" />
        <title>Upfronts - Dashboard</title>
        ${helmet ? helmet.title.toString() : ''}
        ${helmet ? helmet.meta.toString() : ''}
        ${link}
        <link rel="shortcut icon" href="images/favicon.png" type="image/x-icon">
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
        <link href="/assets/images/frontend/favicon.ico" rel="icon" type="image/ico">
      </head>
      <body>
        <div id="root">${markup}</div>

        <script>
          window.initialState = ${serialize(initialState)};
        </script>
        <script src="/app/vendor.bundle.js"></script>
        <script src="/app/${currentApp}.bundle.js"></script>
      </body>
    </html>
  `;
}
