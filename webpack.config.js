const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: './src/index.js',
  mode: "development",

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        use: [
          {
            loader:'file-loader',
            options: {
              name: "[name].[ext]",
              outputPath:"assets/img/",
              publicPath:"assets/img/",
              esModule: false,
            }
          }
        ],
      },
      {
        test: /\.(mp4|webm)$/i,
        use: [
          {
            loader:'file-loader',
            options: {
              name: "[name].[ext]",
              outputPath:"assets/video/",
              publicPath:"assets/video/",
              esModule: false,
            }
          }
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader:'file-loader',
            options: {
              name: "[name].[ext]",
              outputPath:"assets/fonts/",
              publicPath:"assets/fonts/"
            }
          }
        ],
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: ['img:src', 'video:src']
          }
        }
      },      
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/html/index.html'
    }),
  ]
};

module.exports = config;
