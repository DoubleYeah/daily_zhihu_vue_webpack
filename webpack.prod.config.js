var VueLoaderPlugin = require("vue-loader/lib/plugin")
var webpack = require("webpack");
var UglifyJsPlugin = require("uglifyjs-webpack-plugin")
var HtmlwebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var merge = require("webpack-merge");
var webpackBaseConfig = require("./webpack.config");
webpackBaseConfig.plugins = [];

module.exports  = merge(webpackBaseConfig, {
    output:{
        filename: "[name].[hash].js",
        publicPath: '/dist/'
    },
    plugins:[
        new ExtractTextPlugin({
            filename: "[name].[hash].css",
            allChunks: true
        }),
        new HtmlwebpackPlugin({
            filename: "../index_prod.html",
            template: "./index.ejs",
            inject: false
        }),
        new VueLoaderPlugin()
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin()
        ]
    }
});