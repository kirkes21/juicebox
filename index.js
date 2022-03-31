require('dotenv').config()

const { client } = require('./db')
client.connect()

const { PORT = 3000 } = process.env
const express = require('express');

const server = express();
server.listen(PORT, () => {
    console.log('The server is up on port', PORT)
});

const apiRouter = require('./api')
server.use('/api', apiRouter)

const morgan = require('morgan')
server.use(morgan('dev'))

server.use(express.json())

