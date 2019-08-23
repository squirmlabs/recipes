// Dependencies
import CompressionPlugin from 'compression-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackNotifierPlugin from 'webpack-notifier';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

// Configuration
import { $getEnvironment, $isLocal, $isDevelopment } from '../../config';

// Analyzer
const isAnalyzer = process.env.ANALYZER === 'true';

export default type => {
  const plugins = [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new ExtractTextPlugin({
      allChunks: true,
      filename: '../../public/css/[name].css',
    }),
  ];

  if (isAnalyzer) {
    plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
      }),
    );
  }

  if (type === 'client') {
    plugins.push(
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: m => /node_modules/.test(m.context),
      }),
    );
  }

  if ($isLocal()) {
    plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new WebpackNotifierPlugin({
        title: 'Disney ABC',
      }),
    );
  } else if ($isDevelopment()) {
    plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          UPFRONTS_ENV: JSON.stringify($getEnvironment()),
        },
      }),
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$/,
        threshold: 10240,
        minRatio: 0.8,
      }),
    );
  } else {
    plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          UPFRONTS_ENV: JSON.stringify($getEnvironment()),
          NODE_ENV: JSON.stringify(
            ['stage', 'production'].includes($getEnvironment())
              ? 'production'
              : 'development',
          ),
        },
      }),
      new webpack.optimize.UglifyJsPlugin(),
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$/,
        threshold: 10240,
        minRatio: 0.8,
      }),
    );
  }

  return plugins;
};
