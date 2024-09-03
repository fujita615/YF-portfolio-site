//webpack本番環境設定
const { merge } = require('webpack-merge');
const common = require('./webpack.config.common.js');
const TerserPlugin = require("terser-webpack-plugin")

module.exports =merge(common, {
  mode: 'production',
  module: {
    rules: [
      {//cssファイルへの設定（sassファイルをjsファイルへバンドル/sourceMap無し）
        test: /\.(sass|scss|css)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              //css内のurlもバンドルに含める（画像の依存解決）
              url: true,
              importLoaders: 2
            }
          },
          {
          loader: 'postcss-loader',
            options: {
              postcssOptions: {
              // ベンダープレフィックスの自動付与
                plugins: [require('autoprefixer')({ grid: true })],
              },
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  //圧縮設定（バンドル時にコメントとconsole.log文を削除）
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console:true, 
          },
        },
        extractComments: "all"
      }),
    ],
  },
});