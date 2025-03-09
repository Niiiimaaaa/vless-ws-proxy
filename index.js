const http = require('http');
const { createProxyServer } = require('http-proxy');

const proxy = createProxyServer({
    target: 'https://77.37.65.136:10000', // اگه TLS توی x-ui فعاله
    // target: 'http://77.37.65.136:10000', // اگه TLS توی x-ui خاموشه
    secure: false // برای قبول گواهی خود-امضا
});

const server = http.createServer((req, res) => {
    proxy.web(req, res); // برای HTTP ترافیک عادی
});

server.on('upgrade', (req, socket, head) => {
    proxy.ws(req, socket, head); // برای HTTPUpgrade (مثل WebSocket)
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
