const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, //process.env.NODE_ENV !== 'production' ? 'style-loader' :
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
                // use: extractPlugin.extract({
                //     use: ['style-loader', 'css-loader', 'sass-loader']
                // })
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }]
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/'
                    }
                }]
            },
            // {
            //     test: /\.html$/,
            //     use: [
            //         {
            //             loader: 'file-loader',
            //             options: {
            //                 name: '[name].[ext]'
            //             }
            //         }
            //     ],
            //     exclude: path.resolve(__dirname, 'src/index.html')
            // }
        ]
    },
    devtool: 'source-map',
    plugins: [
        new MiniCssExtractPlugin({
            filename: "main.css"
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        // new HtmlWebpackPlugin({
        //     filename: 'index.html',
        //     template: 'src/index.html'
        // }),
        // new HtmlWebpackPlugin({
        //     template: 'src/users.html',
        //     chunks: []
        // }),
        new CleanWebpackPlugin(['dist'])
    ]
}