const http = require('http');
const { createProxyServer } = require('http-proxy');

const proxy = createProxyServer({
    target: 'ws://77.37.65.136:8443', // بدون TLS
    ws: true
});

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Proxy is working');
});

server.on('upgrade', (req, socket, head) => {
    proxy.ws(req, socket, head);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
