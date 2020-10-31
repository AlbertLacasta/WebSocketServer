/**
 * Import WebSocket and Server
 */

const express = require('express');
const webSocket = require("ws");
const socketServer = require('ws').Server;

/**
 * Express listen on port 3000
 */
const server = express().listen(3000);

/**
 * Create new socket server
 */
const wss = new socketServer({ server });

/**
 * WebSocket Server on connection
 */
wss.on('connection', (ws) => {
    console.log("[Server] A client was connected.")

    /**
     * On event Close print a message
     */
    ws.on('close', () => { console.log('[Server] a client disconnected') })

    /**
     * On event Message
     */
    ws.on('message', (message) => {
        console.log('[Server] Recived message %s' , message);

        // Boroadcast to everyone els connected
        wss.clients.forEach( (client) => {
            if(client !== ws && client.readyState === webSocket.OPEN) {
                client.send(message)
            }
        })
    })
});
