var fs = require('fs');
var path = require('path');
var babel = require("babel-core");

var webpack = require('webpack');
var webpackConf = require('./webpack.config');

var cmpPath = 'src';
var buildPath = 'build2';
var distDir = 'dist';
// 组件库入口文件
var indexFile = path.join(__dirname, '..', distDir, 'index.js');
var indexSrc = path.join(__dirname, '..', 'src', 'index.js');
// 临时生成的辅助文件
var entryFile = path.join(buildPath, 'entry.json');

// 需要跳过的帮助文件
const ignoreList = ['build', 'build2', 'directives', 'utils', 'dist', 'test', 'package.json', 'README.md', 'index.js', 'version.bat'];

var outContent = '';
var components = [];

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

    var upperName = vueName.substring(0, 1).toUpperCase() + vueName.substring(1);

    try {
        if (fs.readFileSync(path.join(cmpPath, dir, vueName + '.vue'), 'utf-8') === '') {
            console.log('file empty:' + vueName);
            return;
        }
    } catch (e) {
        console.warn(e.message);
        return;
    }

    components.push({
        name: upperName,
        path: 'src/' + dir + '/' + vueName,
        dir: dir,
        srcPath: './' + dir + '/' + vueName,
        distPath: './components/' + upperName
    });
});

// 增加 util 方法入口
components = components.concat(['pageUtil', 'http'].map(function(name) {
    return {
        name: name,
        path: 'src/utils/' + name + '.js',
        dir: 'utils',
        srcPath: './utils/' + name + '.js',
        distPath: './components/' + name
    };
}));

var jsImport = [];
var jsExport = [];
var jsEntries = [];
var jsSrcImport = [];

components.forEach(item => {
    jsEntries.push(`"${item.name}": ["${item.path}"]`);
    jsImport.push('import ' + item.name + ' from \'' + item.distPath + '\';');
    jsSrcImport.push('import ' + item.name + ' from \'' + item.srcPath + '\';');
    jsExport.push(item.name);
});

// 每个组件入口文件
outContent = '{\n' + jsEntries.join(',\n') + '\n}';
fs.writeFileSync(entryFile, outContent, 'utf-8');

// dist目录下的index入口文件
var indexContent = jsImport.join('\n') + '\n\n';
indexContent += 'module.exports = {\n' + jsExport.join(',\n') + '\n}';
var result = babel.transform(indexContent, {
    presets: ['es2015']
});
fs.writeFileSync(indexFile, result.code, 'utf-8');

// src目录下的index入口文件
indexContent = jsSrcImport.join('\n') + '\n\n';
indexContent += 'module.exports = {\n' + jsExport.join(',\n') + '\n}';
fs.writeFileSync(indexSrc, indexContent, 'utf-8');

// 执行webpack打包组件
webpack(webpackConf, (err, stats) => {
    if (err) {
        console.log(err);
    } else {
        console.log('build successfully:[src/dist/index.js]');
    }
});
