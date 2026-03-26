const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// Servir archivos estáticos del cliente
app.use(express.static(path.join(__dirname, '../client')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Socket.io listo para futuras actualizaciones (multiplayer)
io.on('connection', (socket) => {
  console.log('Jugador conectado:', socket.id);
  // Aquí irá la lógica de online más adelante
  socket.on('disconnect', () => {
    console.log('Jugador desconectado:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Project Brawler corriendo en http://localhost:${PORT}`);
  console.log('✅ Servidor Express + Socket.io listo para multiplayer');
});