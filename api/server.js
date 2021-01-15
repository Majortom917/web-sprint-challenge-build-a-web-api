const express = require('express');
const server = express();
server.use(express.json())

server.get("/", (req, res) =>{
    res.staatus(200).json({
        api: "down"
    })
})

// Complete your server here!
// Do NOT `server.listen()` inside this file!

module.exports = server;
