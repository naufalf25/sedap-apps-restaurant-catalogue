const { merge } = require('webpack-merge');
const path = require('path');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const ImageMinimizerWebpackPlugin = require('image-minimizer-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new WorkboxWebpackPlugin.GenerateSW({
      swDest: './sw.bundle.js',
    }),
    new BundleAnalyzerPlugin(),
  ],
  optimization: {
    minimizer: [
      "...",
      new ImageMinimizerWebpackPlugin({
        minimizer: {
          implementation: ImageMinimizerWebpackPlugin.imageminMinify,
          options: {
            plugins: [
              "imagemin-mozjpeg",
              "imagemin-pngquant",
            ],
          },
        },
      }),
    ],
  },
});
