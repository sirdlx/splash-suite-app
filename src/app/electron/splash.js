'use strict';

var splash = {};

let _defaultConfig = {
    title: 'splash text here',
    fontSize: '72px',
    //color: 'red',
    //backgroundColor: 'blue',
    splashBG: '#splash-bg',
    splashContent: '#splash-content',
    splashPage: '.splash-page',
    timeout: 6000
};

var runWithOptions = function(opts) {

    splash.bodyEl = document.querySelector('body');
    splash.splashBG = document.querySelector(opts.splashBG);
    splash.splashContent = document.querySelector(opts.splashContent);
    splash.splashPage = document.querySelector(opts.splashPage);

    splash.splashBG.style.backgroundColor = opts.backgroundColor;
    splash.bodyEl.style.color = opts.color;

    splash.splashContent.innerText = opts.title;
    splash.splashContent.style.fontSize = opts.fontSize;

    splash.splashPage.style.opacity = 0;
    splash.timeout = opts.timeout;

}

runWithOptions(_defaultConfig);



splash.config = function(_config) {
    var opts = Object.assign(_defaultConfig, _config);
    // console.log(opts);
    runWithOptions(opts);
}


splash.hide = function() {

    setTimeout(function() {
        // splash.splashContent.classList.add('hidden');
        splash.splashContent.style.opacity = 0;
        setTimeout(function() {
                splash.splashBG.classList.add('hidden');
            });
            // splash.splashPage.classList.add('show');
        splash.splashPage.style.opacity = 1;
    }, splash.timeout);

}
