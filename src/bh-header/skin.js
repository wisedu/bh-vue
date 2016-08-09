module.exports = {
    init (skinName) {
        var ampCssRef = document.createElement('link');
        ampCssRef.setAttribute('rel', 'stylesheet');
        ampCssRef.setAttribute('type', 'text/css');
        var folderPath = 'resources/themes/';
        var cssPath = folderPath + skinName + '/amp.min.css';
        ampCssRef.setAttribute('href', cssPath);
        document.getElementsByTagName('head')[0].appendChild(ampCssRef);
    }
};
