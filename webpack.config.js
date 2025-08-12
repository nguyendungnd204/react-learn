const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/** @type {import('webpack').Configuration} */
module.exports = {
  // File khởi đầu
  entry: './src/index.tsx',

  // File output sau khi build
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js', // tránh cache
    clean: true,
  },

  mode: 'development',

  // Hiển thị lỗi đúng file khi debug
  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // TS & TSX
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: path.resolve(__dirname, 'tsconfig.json'),
          }
        },
      },
      {
        test: /\.css$/, // CSS
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i, // ảnh
        type: 'asset/resource',
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'], // bỏ đuôi khi import
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // HTML template
    }),
  ],

  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 3000,
    open: true,
    historyApiFallback: true, // cho React Router
    hot: true, // reload nhanh
  },
};
