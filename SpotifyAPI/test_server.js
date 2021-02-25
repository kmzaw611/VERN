//Simple http server to use for redirectUri field in auth_check.js

var http = require("http");

http.createServer(function (request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("Hello World");
    response.end();
}).listen(6969);