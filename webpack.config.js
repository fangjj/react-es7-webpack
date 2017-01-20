'use strict';
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");  //css单独打包
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',
    entry: {
        main: __dirname + '/src/entry.js', //唯一入口文件
        vendor1: ['react', 'react-dom', 'react-router'],//第三方库
        vendor2: [__dirname + '/src/vendor/jquery.js'] //固定其他库,不能正则
    },
    output: {
        path: __dirname + '/server', //打包后的文件存放的地方
        filename: '[name].js', //打包后输出文件的文件名
        chunkFilename: "[name].js"
        //publicPath: 'http://localhost:7777/build/'  //启动本地服务后的根目录
    },

    module: {
        loaders: [
            { test: /\.js$/, loader: "babel", include: /src/},
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css!postcss")},
            { test: /\.scss$/, loader: ExtractTextPlugin.extract("style", "css!postcss!sass")},
            { test: /\.(png|jpg|gif)$/, loader: 'url?limit=819200'}
        ]
    },

    postcss: [
        require('autoprefixer')    //调用autoprefixer插件,css3自动补全
    ],

    devServer: {
        contentBase: __dirname + "/server",//本地服务器所加载的页面所在的目录
        port: 7777,
        colors: true,  //终端中输出结果为彩色
        historyApiFallback: true,  //不跳转
        inline: true  //实时刷新
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/server/index.tmpl.html"
        }),
        new ExtractTextPlugin('[name].css'),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor2','vendor1', 'manifest']
        })
    ]

}
