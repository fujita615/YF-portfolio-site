//webpack開発時設定
const { merge } = require('webpack-merge');
const common = require('./webpack.config.common.js');
const TerserPlugin = require("terser-webpack-plugin")

module.exports =merge(common, {
  mode: 'development',
  devtool: "hidden-source-map",//sourceMapを利用する設定
  
  module: {
    rules: [
      {//cssファイルへの設定（sassファイルをjsファイルへバンドル/sourceMap利用）
        test: /\.(sass|scss|css)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              //css内のurlもバンドルに含める（画像の依存解決）
              url: true,
              sourceMap: true,
              importLoaders: 2
            }
          },
          {
          loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                // ベンダープレフィックスの自動付与
                plugins: [require('autoprefixer')({ grid: true })],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
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