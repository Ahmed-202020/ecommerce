var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
      entry: './src/index.js',
      output: {
        path: path.join(__dirname, 'dist'),
        publicPath: ' ',
        filename: 'main.js'
      },
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.html$/,
            use: [
              {
                loader: 'html-loader',
                options: {
              minimize: true,
            }
          }           
        ]
      },
      {
      test : /\.css$/, 
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
        },
        "css-loader",
      ]
    },
    {
      test: /\.(png|svg|jpe?g|gif)$/i,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'images',
      },
    },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template:"./src/index.html",
    }),
    new MiniCssExtractPlugin({filename: "css/style.css"}),
    new OptimizeCssAssetsPlugin({})
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000,
    writeToDisk:true,
    open:true,
  }
};