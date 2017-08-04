import path from 'path';

import webpack from 'webpack';

// 常量
const outPath = path.resolve(__dirname, './build/dist');
const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

const banner = `/*!
   React Perfect Components for the web
   Copyright (c) 2017-${new Date().getFullYear()} JDJR Inc.
   License: MIT
*/`;

const createBannerPlugin = () => new webpack.BannerPlugin({
  banner,
  raw: true,
  entryOnly: true,
});

// 多个 webpack 配置，TODO 也可以配置 css 打包，待参考 material-components-web
const webpackConfig = [
  {
    name: 'react-component',
    devtool: isDev ? 'source-map' : false,
    entry: {
      input: [path.resolve(__dirname, './components/input/Input.js')],
    },
    externals: {
      react: 'react',
      'react-dom': 'react-dom',
      'prop-types': 'prop-types'
    },
    output: {
      path: outPath,
      filename: `[name].${isProd ? 'min.' : ''}js`,
      libraryTarget: 'umd',
      library: ['rpc', '[name]'],
    },
    module: {
      rules: [
        // https://github.com/MoOx/eslint-loader
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'eslint-loader',
            options: {
              emitError: true, // 验证失败，终止
              configFile: '.eslintrc.js'
            }
          }
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            }
          }
        }],
    },
    plugins: [
      createBannerPlugin(),
      new webpack.optimize.ModuleConcatenationPlugin(), // Scope Hoisting-作用域提升
      new webpack.optimize.AggressiveMergingPlugin(), // 用来优化生成的代码, 合并相同的代码
    ]
  },
  {
    name: 'react-perfect-component-all',
    devtool: isDev ? 'source-map' : false,
    entry: path.resolve(__dirname, './components/index.js'),
    output: {
      path: outPath,
      filename: `react-perfect-component.${isProd ? 'min.' : ''}js`,
      libraryTarget: 'umd',
      library: 'rpc',
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          }
        }
      }],
    },
    plugins: [
      createBannerPlugin(),
      new webpack.optimize.ModuleConcatenationPlugin(), // Scope Hoisting-作用域提升
      new webpack.optimize.AggressiveMergingPlugin(), // 用来优化生成的代码, 合并相同的代码
    ],
  }];

module.exports = webpackConfig;

