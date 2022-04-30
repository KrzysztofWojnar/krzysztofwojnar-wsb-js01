const http = require("http");
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 5000;
const fs = require('fs').promises;

const contentTypeHeaderKey = "Content-Type";
const textHtmlHeaderValue = "text/html";

const sendFile = function(url, res) {
    fs
        .readFile(__dirname + "/dist/" + url)
        .then(contents => {
            res.writeHead(200);
            res.end(contents);
        })
        .catch(err => {
            res.writeHead(500);
            res.end(err);
            return;
        });
}

const requestListener = function (req, res) {
    switch (true) {
        case ('/bundle.js' == req.url):
            res.setHeader(contentTypeHeaderKey, "application/json");
            sendFile(req.url, res);
            break;
        case (/\/.*svg/).test(req.url):
            res.setHeader(contentTypeHeaderKey, textHtmlHeaderValue);
            sendFile(req.url, res);
            break;
        default:
            res.setHeader(contentTypeHeaderKey, textHtmlHeaderValue);
            sendFile('index.html', res);
            break;
        
    }
};

const server = http.createServer(requestListener);
server.listen(port, () => {
    console.log(`Server is running on port ${port} (${host})`);
});