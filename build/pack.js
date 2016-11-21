var fs = require('fs');
var path = require('path');

var webpack = require('webpack');
var webpackConf = require('./webpack.config');

var cmpPath = 'src';
var buildPath = 'build';
var entryFile = path.join(buildPath, 'entry.js');
var confFile = path.join(buildPath, 'complist.json');

// 需要跳过的帮助文件
const ignoreList = ['build', 'dist', 'test', 'package.json', 'README.md', 'index.js'];

var outContent = '';
var compContent = [];
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
        dir: dir
    });
});

var jsImport = [];
var jsExport = [];
var jsInstall = [];

components.forEach(item => {
    compContent.push('"' + item.name + '": "' + item.path + '"');
    jsImport.push('import ' + item.name + ' from \'' + item.path + '\';');
    jsExport.push(item.name);
    jsInstall.push(`    Vue.component('${item.dir}', ${item.name});`);
});

jsImport = jsImport.join('\n');
jsExport = 'module.exports = {\n' + jsExport.join(',\n') + '\n}';
var installComps = jsInstall.join('\n');
jsInstall = `
if (typeof window !== 'undefined' && window.Vue) {
${installComps}
}`;

var entryContent = '';
// import
entryContent += jsImport + '\n\n';
// install
entryContent += jsInstall + '\n\n';
// export
entryContent += jsExport;

fs.writeFileSync(entryFile, entryContent, 'utf-8');

// 执行webpack打包
webpack(webpackConf, (err, stats) => {
    if (err) {
        console.log(err);
    } else {
        console.log('build successfully:[dist/bh-vue.min.js]');
    }
});
