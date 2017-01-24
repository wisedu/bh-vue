var path = require('path');
var webpack = require('webpack');
var entries = require('./entry.json');

module.exports = {
    // 'devtool': 'source-map',
    'entry': entries,
    'output': {
        'path': path.resolve(__dirname, '../dist/components'),
        'filename': '[name].js',
        'publicPath': ''
        // 'libraryTarget': "umd",
        // 'library': "[name]"
    },
    'resolve': {
        'extensions': ['', '.js', '.vue'],
        'alias': {
            'src': path.resolve(__dirname, '../src')
        }
    },
    'module': {
        'loaders': [{
            'test': /\.vue$/,
            'loader': 'vue'
        },
        {
            'test': /\.js$/,
            'loader': 'babel-loader',
            'exclude': /node_modules/
        },
        {
            'test': /\.json$/,
            'loader': 'json'
        }, {
            'test': /\.html$/,
            'loader': 'vue-html'
        }, {
            'test': /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            'loader': 'url',
            'query': {
                'limit': 10000,
                'name': './resources/imgs/[name].[hash:7].[ext]'
            }
        }, {
            test: /\.less$/,
            loader: 'style!css!less'
        }]
    },
    babel: {
        // presets: ['es2015'],
        plugins: ['transform-runtime']
    },
    plugins: [
        // new webpack.NoErrorsPlugin()
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {warnings: false},
        //     output: {comments: false},
        //     sourceMap: true
        // })
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: "commons",
        //     filename: "commons.js"
        // })
    ]
};
