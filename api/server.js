const express = require('express');
const projectsRouter= require('./projects/projects-router')

const server = express();
server.use(express.json())


server.use('api/projects',projectsRouter)


// Complete your server here!
// Do NOT `server.listen()` inside this file!

module.exports = server;
