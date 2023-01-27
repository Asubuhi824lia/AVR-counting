// server.js by css-module

// import css-module
const http = require('http');

const { getPage, getScript, getStyle, getDatabase } = require('./getFiles')


const server = http.createServer((req, res) => {

    // give file with code
    if(req.url.endsWith('.css')) {
        getStyle(req, res);
    } else if(req.url.endsWith('.js')) {
        getScript(req, res);
    } else if(req.url.endsWith('.json')) {
        getDatabase(req, res);
    } else {
        getPage(req, res);
    }    

});

const host = 'localhost';
const port = 8000;
server.listen(port, host, (error) => {
    error ? console.log(error) : console.log(`Server is running on http://${host}:${port}`);
});
