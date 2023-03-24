const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  mode: 'development',
  entry: './demo',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'demo.[hash].js',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },

      {
        test: /\.ts?$/,
        use: [{
          loader: 'ts-loader', options: {
            onlyCompileBundledFiles: true,
            appendTsSuffixTo: [/\.vue$/]
          }
        }],
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      hash: false,
      minify: false,
      filename: 'index.html',
      title: 'vuejs-blurhash demo'
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'demo'),
    port: 9000,
  },
};