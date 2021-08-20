import path from 'path';
import LoadablePlugin from '@loadable/webpack-plugin';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const isDevMode = process.env.NODE_ENV === 'development';

const main = isDevMode ? ['webpack-hot-middleware/client', './lib/app/index.tsx'] : ['./lib/app/index.tsx'];

const webpackConfig: webpack.Configuration = {
  mode: isDevMode ? 'development' : 'production',
  entry: {
    main,
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // cf. .babelrc.json in this folder and browser list in package.json
          options: {
            plugins: [
              isDevMode && 'react-refresh/babel',
            ].filter(Boolean),
          },
        },
      },
      {
        test: /\.s?[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new LoadablePlugin({ writeToDisk: true }),
    isDevMode && new webpack.HotModuleReplacementPlugin(),
    isDevMode && new ReactRefreshWebpackPlugin({
      overlay: {
        sockIntegration: 'whm',
      },
    }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        '**/*',
        '!*loadable-stats*',
      ],
    }),
    new HtmlWebpackPlugin({
      templateContent: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
          </head>
          <body>
            <div id="main"></div>
          </body>
        </html>
      `,
    }),
  ].filter(Boolean),
  devServer: {
    historyApiFallback: true,
    port: 3000,
  },
};

if (isDevMode) {
  webpackConfig.cache = {
    // https://webpack.js.org/configuration/other-options/#cache
    type: 'filesystem',
    cacheDirectory: path.resolve(__dirname, '.tmp'),
    name: 'dev-react-cache',
  };
}

export default webpackConfig;
