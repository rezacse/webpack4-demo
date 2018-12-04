
const webpack = require('webpack');
const path = require('path');
const webpackMerge = require('webpack-merge');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const baseConfig = require('./webpack.common');
const buildDirectory = path.resolve(__dirname, 'dist');

const API_URL = JSON.stringify('https://devUrl.com')

const config = {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        path: buildDirectory,
        filename: 'js/app.bundle.js',
        // publicPath: '/dist'
    },   
    devServer: {
        contentBase: buildDirectory,
        compress: true,
        port: 8080,
        open: true,
        stats: 'errors-only'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new htmlWebpackPlugin({
            title: 'MapTaskr',
            hash: true,
            filename: 'index.html',
            template: 'src/index.html'
        }),
        new webpack.DefinePlugin({
            'API_URL': API_URL
        })      
    ]
}

module.exports = webpackMerge(baseConfig, config);