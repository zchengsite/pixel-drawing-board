// webpack.config.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: { 
    app: ['./src/index.js']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack Output Management',
      template: "./index.html"
    })
  ],
  resolve: {
    fallback: {
      "assert": false,
      "buffer": false,
      "console": false,
      "constants": false,
      "crypto": false,
      "domain": false,
      "events": false,
      "http": false,
      "https": false,
      "os": false, 
      "path": false,
      "punycode": false,
      "process": false,
      "querystring": false,
      "stream": false,
      "_stream_duplex": false,
      "_stream_passthrough": false,
      "_stream_readable": false,
      "_stream_transform": false,
      "_stream_writable": false,
      "string_decoder": false,
      "sys": false,
      "timers": false,
      "tty": false,
      "url": false,
      "util": false,
      "vm": false,
      "zlib": false,
      "fs": false,
      "worker_threads": false,
      "child_process": false,
      "pnpapi": false
    }
  }
}
