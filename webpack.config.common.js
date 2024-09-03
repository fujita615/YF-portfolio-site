//webpack共通設定
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');


module.exports = {
  context: path.join(__dirname,"src"), //path指定の起点 
  entry: [`./index.js`,  // 生成の大元となるJavaScriptファイル（エントリーポイント）
  ],
  // ファイルの出力設定
  output: {
    path: path.resolve(__dirname,"dist"),    //  出力ファイル群が入るディレクトリ
    filename: "main.js",    // 生成されるjsファイル名
    assetModuleFilename: "./image/[name][ext][query]", //bundleされない画像ファイルの保存先
    clean: true,//bundle更新直前にディレクトリ内を空にする
  },
  module: {
    rules: [
      {//画像ファイル処理設定
        test: /\.(gif|png|jp?g|svg)$/,
        type: 'asset',
        parser: {
          //100 *1024以下の画像はjsファイル内にバンドルする（それ以上は画像ファイルのまま保存）
          dataUrlCondition: {
            maxSize: 100 * 1024,
          }
        }
      },
      {//tsファイル処理設定(jsにトランスパイル)
            test: /\.ts$/,
            exclude: /(node_modules)/,
            use: {
                loader: "swc-loader",
            }
      },
      {//htmlファイル処理設定
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
  plugins: [
    //htmlファイルをoutputファイルに保存するプラグイン
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/index.html`,
      filename: `${__dirname}/dist/index.html`,
      inject:'body'
    }),
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/thanks.html`,
      filename: `${__dirname}/dist/thanks.html`,
      inject:'body'
    }),
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/404.html`,
      filename: `${__dirname}/dist/404.html`,
      inject:'body'
    }),
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/policy.html`,
      filename: `${__dirname}/dist/policy.html`,
      inject:'body'
    }),
    //外部ライブラリ(jquery)を変数で読み込む設定
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
  ],

  resolve: {
    //ts、jsファイル内のimport文で拡張子を省略できるよう設定
    extensions: [".ts", ".js"],

    alias: {
    //画像ファイルのエイリアスを張る
      '@image': path.resolve(__dirname, './src/image/')
    },
  },
  //開発用serverのdocumentRootにバンドル後のファイルを指定
  devServer: {
    static: {
      directory: "./dist",
    },
  },
  //bundle後のファイルサイズの上限閾値を指定
    performance: {
      maxAssetSize: 500000,
      maxEntrypointSize: 500000,
  },
};