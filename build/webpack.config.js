var path = require('path');

module.exports = {
    // 'devtool': 'source-map',
    'entry': {
        'app': './build/entry.js'
    },
    'output': {
        'path': './dist/',
        'filename': 'bh-vue.min.js',
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
            'loader': 'babel',
            'include': '../'
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
    }
};
