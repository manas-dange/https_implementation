const https = require('https');
const fs = require('fs');
const path = require('path');

// Load TLS certificate and private key
const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
    minVersion: 'TLSv1.3' // Force TLS 1.3
};

// Log function (JSON format)
function logRequest(req, statusCode) {
    const logEntry = {
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.url,
        status: statusCode,
        ip: req.socket.remoteAddress
    };

    fs.appendFile('log.json', JSON.stringify(logEntry) + '\n', (err) => {
        if (err) console.error("Failed to write log:", err);
    });
}

// Serve static files from /public folder
function serveStatic(filePath, res) {
    const fullPath = path.join(__dirname, 'public', filePath);
    fs.readFile(fullPath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': getContentType(filePath) });
            res.end(data);
        }
    });
}

// Simple content type mapping
function getContentType(file) {
    const ext = path.extname(file).toLowerCase();
    const map = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg'
    };
    return map[ext] || 'application/octet-stream';
}

// Create HTTPS server
const server = https.createServer(options, (req, res) => {
    // Security headers
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    res.setHeader('Content-Security-Policy', "default-src 'self'");
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');

    if (req.url === '/') {
        serveStatic('index.html', res);
        logRequest(req, 200);
    }
    else if (req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end("Hi, I am Manas Dange");
        logRequest(req, 200);
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end("404 Not Found");
        logRequest(req, 404);
    }
});

// Start server
server.listen(8443, () => {
    console.log('HTTPS Server running at https://localhost:8443');
});
