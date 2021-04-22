var path = require('path');
var fs = require('fs');
var webpack = require('webpack');


var buildConfig = 
{
    entry: [
        'webpack-hot-middleware/client?reload=true',
        './source/user.jsx'
    ],
    output: {
        path: path.join(__dirname, './static'),
        filename: 'user.bundle.js',
        publicPath: '/'
    },
    devtool: 'source-map',
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.(css|scss)$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.txt$/,
                use: 'raw-loader'
            }   
        ]
    },
};

module.exports = [buildConfig];
// export default buildConfig;


