const http = require('http');
const fs = require ('fs');
const path = require ('path');
const server = http.createServer();


server.on('request', (request, response) => {
    console.log('request : ', request.url);
    console.log('basename: ', path.basename(request.url));

    if ( request.url === '/' ) {
    const src = fs.createReadStream('index.html');
        src.pipe(response);
    } else {
        const baseURL = path.basename(request.url);
        const src = fs.createReadStream(baseURL)

        src.on('open', () => {
            src.pipe(response);
        });

        src.on('error', () => {
            response.end('this page can nott be found');
        });
    }

});

server.listen(8000);