// Clear console
process.stdout.write('\x1B[2J\x1B[0f');

const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');
const moment = require('moment');
const colour = require('colour');

const app = express();

app.use(function (req, res) {
    res.send({ msg: 'hello' });
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws, req) {
    // You might use location.query.access_token to authenticate or share sessions
    // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
    const location = url.parse(req.url, true);

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    setInterval(() => {
        const currentTime = Date.now();
        const formattedTime = moment(currentTime).format('dddd, MMMM Do YYYY, h:mm:ss a');
        ws.send(formattedTime);
    }, 1000);

    ws.send('Opened websocket connection.');
});

server.listen(8080, function listening() {
    console.log('Listening on `http://localhost:%d`'.green, server.address().port);
});
