import io from "./servidor.js";

io.on("connection", (socket) => {
  console.log("Novo cliente conectado. ID: " + socket.id);

  socket.on("texto-editor", (texto) => {
    socket.broadcast.emit("texto-editor_clientes", texto);
  });
});