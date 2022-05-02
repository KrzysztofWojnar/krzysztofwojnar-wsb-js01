const http = require("http");
const fs = require('fs').promises;
const users = require("./server-data/users.json");
const port = process.env.PORT || 5000;

const contentTypeHeaderKey = "Content-Type";
const textHtmlHeaderValue = "text/html";
const jsonHeaderValue = "application/json";
const emptyObj = '{}';

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

const handleSignup = function(result, response){

            response.setHeader(contentTypeHeaderKey, jsonHeaderValue);
            if (result.login && result.password){
                const matchingUsers = users.filter((user) => result.login == user.username);
                if (matchingUsers.length > 1) {
                    response.writeHead(500);
                    response.end('{"message": "More than one user with this login!"}');
                    return;
                } else if (matchingUsers.length === 0) {
                    response.writeHead(401);
                    response.end(emptyObj);
                    return;
                }
                const user = matchingUsers[0];
                if (user.password == result.password) {
                    const sessionToken = 'it could be any session token';
                    response.writeHead(200);
                    response.end(
                        JSON.stringify({sessionToken, user: user.username})
                    );
                } else {
                    response.writeHead(401);
                    response.end(emptyObj);
                }
            } else {
                response.writeHead(401);
                response.end(emptyObj);
            }
}

const requestListener = function (req, res) {
    switch (true) {
        case ('/bundle.js' == req.url):
            res.setHeader(contentTypeHeaderKey, jsonHeaderValue);
            sendFile(req.url, res);
            break;
        case (/\/[0-9a-f]*.svg/).test(req.url):
            res.setHeader(contentTypeHeaderKey, textHtmlHeaderValue);
            sendFile(req.url, res);
            break;
        case (/\/signup/).test(req.url):
            if (req.method != 'POST') {
                res.writeHead(400);
                res.end('POST request expected!');
            }
            let data = '';
            req.on('data', chunk => {
                data += chunk;
            })
            req.on('end', () => {
                const result = JSON.parse(data);
                handleSignup(result, res);
            });
            break;
        default:
            res.setHeader(contentTypeHeaderKey, textHtmlHeaderValue);
            sendFile('index.html', res);
            break;
        
    }
};

const server = http.createServer(requestListener);
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});