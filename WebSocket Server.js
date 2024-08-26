// Install ws library first: npm install ws
const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

let players = [];

server.on('connection', (ws) => {
    // Add new player
    players.push(ws);
    console.log('Player connected. Total players:', players.length);

    // Handle incoming messages
    ws.on('message', (message) => {
        console.log('Received:', message);
        // Broadcast the move to the other player
        players.forEach(player => {
            if (player !== ws && player.readyState === WebSocket.OPEN) {
                player.send(message);
            }
        });
    });

    // Handle player disconnection
    ws.on('close', () => {
        console.log('Player disconnected');
        players = players.filter(player => player !== ws);
    });
});

console.log('WebSocket server is running on ws://localhost:8080');
