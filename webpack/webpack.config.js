const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  // JavaScript执行入口文件
  entry: './main.js',
  output: {
    // 将所有依赖的模块合并输出到一个bundle.js文件
    filename: 'bundle.js',
    // 将输出文件都放到dist目录下
    path: path.resolve(_dirname, './dist'),
  },
  module: {
    rules: [
      {
        // 用正则表达式去匹配要用该Loader转换的css文件
        test: /\.css$/,
        // queryString方式传参
        // use: ['style-loader', 'css-loader?minimize'],
        
        // options传参
        // use: [
        //   'style-loader', 
        //   {
        //     loader: 'css-loader',
        //     options: {
        //       minimize: true
        //     }
        //   }
        // ],
        
        // ExtractTextPlugin转换
        loaders: ExtractTextPlugin.extract({
          // 转换.css文件需要使用的Loader
          use: ['css-loader'],
        }),
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      // 从.js文件中提取出来的.css文件的名称
      filename: `[name]_[contenthash:8].css`,
    }),
  ]
};
