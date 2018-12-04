
const webpack = require('webpack');
const path = require('path');
const webpackMerge = require('webpack-merge');

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const htmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


const commonConfig = require('./webpack.common');
const prodDirectory = path.resolve(__dirname, 'prod');
const sourceDirectory = path.resolve(__dirname, 'src');

// this config can be in webpack.config.js or other file with constants
var API_URL = JSON.stringify('https://prodUrl.com');


// // check environment mode
// var environment = process.env.NODE_ENV === 'production' ? 'production' : 'development';

// // webpack config
// module.exports = {
//     // ...
//     plugins: [
//         new webpack.DefinePlugin({
//             'API_URL': API_URL[environment]
//         })
//     ],
//     // ...
// }

const config = {
    mode: 'production',
    devtool: 'source-map',
    output: {
        path: prodDirectory,
        filename: 'js/app.bundle.js',
        // publicPath: '/dist'
    },   
    plugins: [
        new CleanWebpackPlugin(['prod']),
        new htmlWebpackPlugin({
            title: 'MapTaskr',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            },
            hash: true,
            filename: 'index.html',
            template: 'src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css'            
        }),
        new webpack.DefinePlugin({
            'API_URL': API_URL
        })
        // new HtmlWebpackPlugin({
        //     filename: 'index.html',
        //     excludeChunks: ['contact']
        //     template: 'src/index.html'
        // }),
        // new HtmlWebpackPlugin({
        //     template: 'src/users.html',
        //     chunks: ['contact']
        // }),
    ],
    optimization: {
        minimizer: [
          new UglifyJsPlugin({
            test: /\.js$/,
            cache: true,
            parallel: true,
            sourceMap: true,
            exclude: /\/node_modules/
          }),
          new OptimizeCSSAssetsPlugin({
          })
        ]
    }
}

module.exports = webpackMerge(commonConfig, config);