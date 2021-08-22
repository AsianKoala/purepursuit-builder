const http = require('http');
const fs = require('fs');
const url = require('url')
const open = require('open')

const hostname = '127.0.0.1';
const port = 3000;

server = http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname
    console.log("Request for " + pathname + " received.");

    response.writeHead(200);

    if (pathname == "/") {
        html = fs.readFileSync("index.html", "utf8");
        response.write(html);
    } else if (pathname == "/desmos.js") {
        script = fs.readFileSync("desmos.js", "utf8");
        response.write(script);
    } else if (pathname == "/main.css") {
        css = fs.readFileSync("main.css", "utf8");
        response.write(css);
    }

    response.end();
}).listen(port, hostname, () => {
    console.log("Listening to  server on " + port);
})

open(`http://${hostname}:${port}/`, { app: 'chrome' });
