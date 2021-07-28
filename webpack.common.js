const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: { main: './src/resources/js/main.js' },
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    runtimeChunk: { name: 'runtime' }, // this is for code-sharing between "main.js" and "ko.js"
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          context: 'src/',
          from: 'resources/assets/**/*.+(json|png|mp3|wav)',
        },
        { from: 'src/sp/manifest.json', to: 'sp/manifest.json' },
        { from: 'src/sp/style.css', to: 'sp/style.css' },
        { from: 'src/resources/style.css', to: 'resources/style.css' },
        { from: 'src/index.html', to: 'index.html' },
        {
          from: 'src/sp/game-boy',
          to: 'sp/game-boy',
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: 'src/sp/index.html',
      filename: 'sp/index.html',
      chunks: ['runtime', 'main'],
      chunksSortMode: 'manual',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
  ],
};
