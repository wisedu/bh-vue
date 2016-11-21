var path = require('path');
var webpack = require('webpack');

module.exports = {
    // 'devtool': 'source-map',
    'entry': {
        'app': path.resolve(__dirname, './entry.js')
        // 'app': path.resolve(__dirname, '../src/bh-button/bhButton.js')
    },
    'output': {
        'path': path.resolve(__dirname, '../src'),
        'filename': 'index.js',
        'publicPath': ''
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
        }]
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },
    externals: {
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue'
        }
    },
    plugins: [
        new webpack.NoErrorsPlugin()
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {warnings: false},
        //     output: {comments: false},
        //     sourceMap: true
        // })
    ]
};
