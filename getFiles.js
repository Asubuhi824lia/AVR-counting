// For file-working
const fs = require('fs');
// For correct file form
const path = require('path');


function getPage(req, res) {
    // Approve the path
    const htmlPath = (page) => path.resolve(__dirname, `${page}.html`);
    let getPath = "";

    switch(req.url) {
        case '/':
            getPath = htmlPath("index");
            res.statusCode = 200;
            break;
        default:
            getPath = htmlPath("index");
            res.statusCode = 404;
            break;
    }

    res.setHeader('Content-Type', 'text/html');
    fs.readFile(getPath, (err, data) => {
        if(err) {
            console.log(err);
            res.statusCode = 500;
            res.end();
        } else {
            res.write(data);
            res.end();
        }
    })
}

function getStyle(req, res) {
    // Approve the path
    const cssPath = (style) => path.resolve(__dirname, `${style}.css`);
    let getPath = "";

    getPath = cssPath('style');
    // console.log(getPath);

    res.setHeader('Content-Type', 'text/css');
    fs.readFile(getPath, (err, data) => {
        if(err) {
            console.log(err);
            res.statusCode = 500;
            res.end();
        } else {
            res.write(data);
            res.end();
        }
    })
}

function getScript(req, res) {
    // Approve the path
    const jsPath = (script) => path.resolve(__dirname, `${script}.js`);
    let getPath = "";

    switch(req.url) {
        case '/scripts/main.js':
            getPath = jsPath("scripts/main");
            res.statusCode = 200;
            break;
        case '/scripts/caret.js':
            getPath = jsPath("scripts/caret");
            res.statusCode = 200;
            break;
        default:
            res.statusCode = 404;
            break;
    }
    // console.log(getPath)

    res.setHeader('Content-Type', 'text/javascipt');
    fs.readFile(getPath, (err, data) => {
        if(err) {
            console.log(err);
            res.statusCode = 500;
            res.end();
        } else {
            res.write(data);
            res.end();
        }
    })
}

function getDatabase(req, res) {
    // Approve the path
    const bdPath = (bd) => path.resolve(__dirname, `${bd}.json`);
    let getPath = "";

    getPath = bdPath('instructions-set');
    // console.log(getPath);

    res.setHeader('Content-Type', 'application/json');
    fs.readFile(getPath, (err, data) => {
        if(err) {
            console.log(err);
            res.statusCode = 500;
            res.end();
        } else {
            res.write(data);
            res.end();
        }
    })
}


module.exports = {
    getPage,
    getScript,
    getStyle,
    getDatabase
}