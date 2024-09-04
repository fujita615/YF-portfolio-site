//webpack開発時設定
const { merge } = require('webpack-merge');
const common = require('./webpack.config.common.js');
const TerserPlugin = require("terser-webpack-plugin");


module.exports =merge(common, {
  mode: 'development',
  devtool: "hidden-source-map",//sourceMapを利用する設定

//圧縮設定（バンドル時にコメントは残す）
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: "false"
      }),
      
    ],
  },
});