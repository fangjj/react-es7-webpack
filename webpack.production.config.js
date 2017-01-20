var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'source-map',//生成source map以追踪js错误
    entry: {
        main: __dirname + '/src/entry.js', //唯一入口文件
        vendor1: ['react', 'react-dom', 'react-router'],//第三方库
        vendor2: [__dirname + '/src/vendor/jquery.js'] //固定其他库,不能正则
    },
    output: {
        path: __dirname + "/build",
        filename: "[name]-[chunkHash:8].js",
        chunkFilename: "[name]-[chunkHash:8].js"
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: "babel", include: /src/},
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css!postcss")},
            { test: /\.scss$/, loader: ExtractTextPlugin.extract("style", "css!postcss!sass")},
            { test: /\.(png|jpg|gif)$/, loader: 'url?limit=8192'}
        ]
    },
    postcss: [
        require('autoprefixer')
    ],
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/server/index.tmpl.html"
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor2','vendor1', 'manifest'],
            minChunks: Infinity
        }),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false,  // remove all comments
            },
          compress: {
            warnings: false
          }
        }),
        new ExtractTextPlugin("[name]-[chunkHash:8].css"),
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': '"production"'
          }
        }),
        new webpack.optimize.DedupePlugin()      
    ]
}