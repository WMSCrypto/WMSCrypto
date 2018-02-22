/*
This builder need for set css and js in index.html
*/


const fs = require('fs');
const basePath = '../build/static/';
const cssPath = `${basePath}css`;
const jsPath = `${basePath}js`;

fs.readdir(cssPath, function(err, items) {
    let mainCss = items.filter(function (item) {
        return item.match(/^main.([a-zA-Z0-9]{8}).css$/)
    });
    if (mainCss.length > 0) {
        mainCss = mainCss[0];
        console.log('Found version:', mainCss);
        const baseTemplate = fs.readFileSync('../build/index.html', 'utf8');
        const cssData = fs.readFileSync(`${cssPath}/${mainCss}`, 'utf-8');
        const reg = new RegExp(
            `<link href="/static/css/${mainCss}" rel="stylesheet">`
        );
        const buildedTemplate = baseTemplate.replace(reg, `<style>${cssData}</style>`);
        fs.writeFile('./offline.html', buildedTemplate, function (err) {
            if (err) {
                console.log(err)
            } else {
                fs.readdir(jsPath, function(err, items) {
                    let mainJS = items.filter(function (item) {
                        return item.match(/^main.([a-zA-Z0-9]{8}).js$/)
                    });
                    if (mainJS.length > 0) {
                        mainJS = mainJS[0];
                        console.log('Found version:', mainJS);
                        const baseTemplate = fs.readFileSync('./offline.html', 'utf8');
                        const arr = baseTemplate.split('<script type="text/javascript"');
                        const jsData = fs.readFileSync(`${jsPath}/${mainJS}`, 'utf-8');
                        const r = arr[0] + '<script type="text/javascript">' + jsData + '</script></body></html>'
                        fs.writeFile('./offline.html', r, function (err) {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log('Build new offline.html was success');
                            }
                        })
                    } else {
                        console.log('Version not found');
                    }
                });

                console.log('Build new offline.html was success');
            }
        })
    } else {
        console.log('Version not found');
    }
});


