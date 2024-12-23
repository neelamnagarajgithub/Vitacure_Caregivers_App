const WebSocket = require('ws');
const jwt = require('jsonwebtoken');

// Generate a valid JWT token
const token = jwt.sign({ id: 1, username: 'user1' }, 'efdcd107d87f20c828d9ef3e54fe9b766f1c9a92cc7751cc35929250bb588c80'); // Use the secret key from the environment variable

console.log('Token:', token);