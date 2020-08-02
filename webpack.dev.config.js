const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: {
    index: './src/index.js',
    show: './src/show.js',
    preview: './src/preview.js',
  },
  mode: 'development',
  devServer: {
    contentBase: './dist',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      H5_ONLINE_HOST: JSON.stringify("http://localhost:8080"),
    }),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['index'],
      template: 'index.html',
      filename:  `index.html`,
    }),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['preview'],
      template: 'preview.html',
      filename:  `preview.html`,
    }),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['show'],
      template: 'show.html',
      filename:  `show.html`,
    }),
    new VueLoaderPlugin(),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, 'dist'),
  },
}
