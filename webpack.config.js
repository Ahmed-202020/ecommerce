var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
      entry: './src/index.js',
      output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
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
          }           
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
    },
    {
      test: /\.(png|svg|jpe?g|gif)$/i,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'images',
      },
    },
    {
      test: /\.(svg|eot|woff|woff2|ttf)$/,
        use: [
          {
            loader: "file-loader", 
            options: {
              name: '[name].[ext]',
              outputPath: "fonts",
              esModule: false,
            }
          }
        ]
    },
    {
      test: require.resolve("jquery"),
      loader: "expose-loader",
      options: {
        exposes: ["$", "jQuery"],
      },
    } 
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template:"./src/index.html",
    }),
    new HtmlWebpackPlugin({
      filename: "product.html",
      template:"./src/product.html",
    }),
    new HtmlWebpackPlugin({
      filename: "checkout.html",
      template:"./src/checkout.html",
    }),
    new HtmlWebpackPlugin({
      filename: "payment.html",
      template:"./src/payment.html",
    }),
    new HtmlWebpackPlugin({
      filename: "search.html",
      template:"./src/search.html",
    }),
    new HtmlWebpackPlugin({
      filename: "contact.html",
      template:"./src/contact.html",
    }),
    new MiniCssExtractPlugin({filename: "css/style.css"}),
    new OptimizeCssAssetsPlugin({}),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000,
    writeToDisk:true,
    open:true,
  }
};