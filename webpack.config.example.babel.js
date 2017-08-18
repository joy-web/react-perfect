import path from 'path';
import webpack from 'webpack';
import HtmlwebpackPlugin from 'html-webpack-plugin';
import precss from 'precss';
import autoprefixer from 'autoprefixer';
import flexbugs from 'postcss-flexbugs-fixes';

const appPath = path.resolve(__dirname, 'examples');

const webpackConfig = {
  devtool: 'source-map', // 生成 source map文件
  target: 'web', // webpack 能够为多种环境构建编译, 默认是 'web'，可省略 https://doc.webpack-china.org/configuration/target/
  devServer: {
    //指定根目录路径，比如访问 eruda.min.js 时，只需 http://localhost:9090/eruda.min.js 即可
    contentBase: path.join(__dirname, 'examples'),
    host: '0.0.0.0',
    port: 9091,
    historyApiFallback: true,
    // 相当于往 entry 添加以下变量
    // const hotDevServer = 'webpack/hot/dev-server';
    // const webpackDevServer = `webpack-dev-server/client?http://${host}:${port}`;
    hot: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    quiet: false, // 设为true，不把任何信息输出到控制台
  },
  resolve: {
    //自动扩展文件后缀名
    extensions: ['.js', '.css', '.scss']
  },

  // 入口文件 让webpack用哪个文件作为项目的入口
  entry: {
    index: ['./examples/index.js'],
  },

  // 出口 让webpack把处理完成的文件放在哪里
  output: {
    path: path.resolve(__dirname, 'examples/dist'), //打包输出目录
    filename: '[name].bundle.js', //文件名称
    publicPath: '/' //资源路径
  },

  module: {
    rules: [
      // https://github.com/MoOx/eslint-loader
      {
        enforce: 'pre',
        test: /\.js$/,
        include: /examples|components/,
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
        include: /examples|components/,
        use: 'babel-loader',
      },
      {
        test: /\.css/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          }
        }, {
          loader: 'postcss-loader',
          options: {
            pack: 'cleaner',
            sourceMap: true,
          }
        }],
      },
      {
        test: /\.scss/,
        use: ['style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            }
          }, {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [
                precss,
                flexbugs,
                autoprefixer({
                  flexbox: 'no-2009',
                  browsers: ['Explorer >= 9', 'Edge >= 12', 'Chrome >= 35', 'Firefox >= 38',
                    'Android >= 4.4', 'iOS >=8', 'Safari >= 8']
                })
              ]
            }
          }, {
            // Webpack loader that resolves relative paths in url() statements
            // based on the original source file
            loader: 'resolve-url-loader',
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true, // 必须保留
              outputStyle: 'expanded',
            }
          }],
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 热部署替换模块
    new webpack.NoEmitOnErrorsPlugin(),
    // https://juejin.im/entry/59704d47f265da6c4977ba6a
    new webpack.optimize.ModuleConcatenationPlugin(), // Scope Hoisting-作用域提升
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      }
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
    // 创建 HtmlWebpackPlugin 的实例
    // https://www.npmjs.com/package/html-webpack-plugin
    new HtmlwebpackPlugin({
      title: 'React Perfect Component 例子',
      template: path.resolve(appPath, 'templates/layout.html'),
      filename: 'index.html',
      //chunks这个参数告诉插件要引用entry里面的哪几个入口
      chunks: ['index', 'vendors'],
      //要把script插入到标签里
      inject: 'body'
    })
  ]
};

module.exports = webpackConfig;
