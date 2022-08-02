const express = require('express');

const server = express();
const PORT = 8080;

server.get('/', (req, res) => {
	res.send('Hello server');
});

server.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

module.export = server;
