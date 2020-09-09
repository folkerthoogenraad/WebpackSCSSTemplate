const webpack = require('webpack');
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const config = {
  entry: './src/index.js',
  mode: "development",
  devtool: 'inline-source-map',

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
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
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
              name: "[path][name].[ext]",
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
              name: "[path][name].[ext]",
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
              name: "[path][name].[ext]",
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
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
          },
        },
      }, 
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.vue' ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    },
    plugins: [new TsconfigPathsPlugin({})]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, 'src', 'html'), to: path.resolve(__dirname, 'dist')},
      { from: path.resolve(__dirname, 'src', 'assets'), to: path.resolve(__dirname, 'dist', 'assets')},
      ]),
  ]
};

module.exports = config;
