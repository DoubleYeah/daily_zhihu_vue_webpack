var path = require("path");
var VueLoaderPlugin = require("vue-loader/lib/plugin")
var ExtractTextPlugin = require("extract-text-webpack-plugin")
console.log("============="+path.resolve(__dirname, "dist"))
var config = {
    entry: "./main.js" ,
    output:{
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
        publicPath: '/dist/'
    },
    module:{
        rules:[
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options:{
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: "css-loader",
                            fallback: "vue-style-loader"
                        })
                    }
                }
            },
            {
                test:/\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css/,
                use: ExtractTextPlugin.extract({
                    use: "css-loader",
                    fallback: "vue-style-loader"
                })
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=1024'
            }
        ]
    },
    resolve:{
        extensions: ['.js', '.vue']
    },
    plugins:[
        new ExtractTextPlugin("main.css"),
        new VueLoaderPlugin()
    ]
}
module.exports = config;