// Dependencies
import ExtractTextPlugin from 'extract-text-webpack-plugin';

// Configuration
import { $isLocal } from '../../config';

export default type => {
  const rules = [
    {
      test: /\.(jsx|js)$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        plugins: [
          [
            'module-resolver',
            {
              root: ['./'],
              alias: {
                '@Analytics': './src/shared/components/Analytics.jsx',
                '@App': './src/app/App.jsx',
                '@app': './src/app/',
                '@Main': './src/app/main.jsx',
                '@BaseActions': './src/shared/redux/baseActions.js',
                '@BaseComponent': './src/shared/components/BaseComponent.jsx',
                '@Configuration': './config',
                '@ConfigureStore': './src/shared/redux/configureStore.js',
                '@Constants': './src/shared/constants',
                '@Error': './src/shared/components/error',
                '@Form': './src/shared/components/form',
                '@Helpers': './src/shared/helpers',
                '@Layout': './src/shared/components/layout',
                '@Ui': './src/shared/components/ui',
                '@Utils': './src/shared/utils',
              },
            },
          ],
        ],
      },
    },
  ];

  if (!$isLocal() || type === 'server') {
    rules.push({
      test: /\.scss/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader?minimize=true&modules=true&localIdentName=[name]__[local]',
          'sass-loader',
        ],
      }),
    });
  } else {
    rules.push({
      test: /\.scss/,
      use: [
        'style-loader',
        'css-loader?minimize=true&modules=true&localIdentName=[name]__[local]',
        'sass-loader',
      ],
    });
  }

  return rules;
};
