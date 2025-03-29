//webpack共通設定
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  context: path.join(__dirname,"src"), //path指定の起点 
  entry: [`./index.ts` // 生成の大元となるJavaScriptファイル（エントリーポイント）
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
      
      {//cssファイルへの設定（sassファイルをjsファイルへバンドル/sourceMap利用）
        test: /\.(sass|scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
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
    new MiniCssExtractPlugin(),
    new RemoveEmptyScriptsPlugin(),
    
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
      optimization: {
    minimize: true,
        minimizer: [
      //cssファイルを圧縮するプラグイン
      new CssMinimizerPlugin(),
    ],
  },
};