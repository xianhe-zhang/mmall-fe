/*
 * @Author: mario.zhangxianhe 
 * @Date: 2021-08-31 15:30:26 
 * @Last Modified by: mario.zhangxianhe
 * @Last Modified time: 2021-09-01 23:27:15
 */
var webpack             = require('webpack');
var ExtractTextPlugin   = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin   = require('html-webpack-plugin');

// 环境变量配置，dev / online
var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';


//获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name){
    return{
        template : "./src/view/" + name + ".html",
        filename : 'view/' + name + '.html',
        inject   : true,
        hash     : true,
        chunks   : ['common', name]
    };
};


//webpack config
var  config = {
    entry: {
        'common': ['./src/page/common/index.js'],
        'index' : ['./src/page/index/index.js'],
        'login' : ['./src/page/login/index.js'],
    },
    output: {
        path: './dist',
        publicPath  : 'dev' === WEBPACK_ENV ? '/dist/' : '//s.happymmall.com/mmall-fe/dist/',
        filename: 'js/[name].js'
    },
    externals: {
        'jquery' : 'window.jQuery'
    },
    module: {
        rules: [
            {
              test: /.ejs$/,
              use: ['ejs-loader']},
        ],
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
        ]
    },
    plugins: [
        //独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename : 'js/base.js'
        }),
        //把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        //html模版的处理
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login')),
        
    ]
};

module.exports = config