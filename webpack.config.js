const path = require('path');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');

const config = {
  mode: "development",

  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },

  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      '@scripts': path.join(__dirname, 'src/ts'),
      '@styles': path.join(__dirname, 'src/scss'),
      '@assets': path.join(__dirname, 'src/assets'),
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset/resource'
      },
    ]
  },
  plugins: [
    new HtmlBundlerPlugin({
      entry: 'src/html/',
      js: {
        filename: 'js/[name].[contenthash:8].js',
      },
      css: {
        filename: 'css/[name].[contenthash:8].css',
      },
    }),
  ],

  devServer: {
    static: path.resolve(__dirname, 'dist'),
    watchFiles: {
      paths: ['src/**/*.*'],
      options: {
        usePolling: true,
      },
    },
  },

};

module.exports = config;