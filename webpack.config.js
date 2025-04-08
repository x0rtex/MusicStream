const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: {
        home: './src/js/home.js',
        artist: './src/js/artist.js',
        album: './src/js/album.js',
        login: './src/js/login.js',
        profile: './src/js/profile.js',
        logout: './src/js/logout.js',
        register: './src/js/register.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    process.env.NODE_ENV === 'production'
                        ? MiniCssExtractPlugin.loader
                        : 'style-loader',
                    'css-loader',
                    'postcss-loader'
                ],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/html/index.html',
            filename: 'index.html',
            chunks: ['home', 'common'],
        }),
        new HtmlWebpackPlugin({
            template: './src/html/artist.html',
            filename: 'artist.html',
            chunks: ['artist', 'common'],
        }),
        new HtmlWebpackPlugin({
            template: './src/html/album.html',
            filename: 'album.html',
            chunks: ['album', 'common'],
        }),
        new HtmlWebpackPlugin({
            template: './src/html/profile.html',
            filename: 'profile.html',
            chunks: ['profile', 'common'],
        }),
        new HtmlWebpackPlugin({
            template: './src/html/login.html',
            filename: 'login.html',
            chunks: ['login', 'common'],
        }),
        new HtmlWebpackPlugin({
            template: './src/html/register.html',
            filename: 'register.html',
            chunks: ['register', 'common'],
        }),
        new CopyPlugin({
            patterns: [
                {from: 'src/favicon.ico', to: 'favicon.ico'},
            ],
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new Dotenv({
            systemvars: true,
            safe: true,
            expand: true
        }),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
                commons: {
                    name: 'common',
                    chunks: 'all',
                    minChunks: 2,
                },
            }
        },
        minimizer: [
            new CssMinimizerPlugin(),
        ],
    },
    mode: 'production'
};