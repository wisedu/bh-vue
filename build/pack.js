var fs = require('fs');
var path = require('path');

var webpack = require('webpack');
var webpackConf = require('./webpack.config');

var cmpPath = 'src';
var buildPath = 'build';
var outFile = path.join(buildPath, 'entry.js');

// 需要跳过的帮助文件
const ignoreList = ['build', 'dist', 'test', 'package.json', 'README.md'];

var outContent = '';

/**
 * 1.首先遍历组件目录生成组件全局注册文件
 * 2.执行webpack打包到min.js
 * 3.页面初始化时引用min.js执行全局注册
 * 4.页面中可以直接使用组件标签如'<bh-button></bh-button>'
 */

fs.readdirSync(cmpPath).forEach((dir) => {
    if (ignoreList.indexOf(dir) > -1) {
        return;
    }

    // 根据目录生成vue文件名: 'bh-button' -> 'bhButton'
    // 所以组件和目录命名要遵循此规则
    var vueName = dir.replace(/(-\w)/g, (val) => {
        return val.substring('1').replace(/(\w)/, (first) => {
            return first.toUpperCase();
        });
    });

    if (fs.readFileSync(path.join(cmpPath, dir, vueName + '.vue'), 'utf-8') === '') {
        console.log('file empty:' + vueName);
    }

    outContent += 'Vue.component(\'' + dir + '\', require(\'src/' + dir + '/' + vueName + '\'));\n';
});

// 内容写入 entry.js 文件
fs.writeFileSync(outFile, outContent, 'utf-8');

// 执行webpack打包
webpack(webpackConf, (err, stats) => {
    if (err) {
        console.log(err);
    } else {
        console.log('build successfully:[dist/bh-vue.min.js]');
    }
});
