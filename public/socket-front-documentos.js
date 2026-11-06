import { atualizarTextoEditor } from "./documento.js";

const socket = io();
 
function emitirTextoEditor(texto) {
    socket.emit('texto-editor', texto);
}
socket.on('texto-editor_clientes', (texto) => {
   atualizarTextoEditor(texto);
});

export { emitirTextoEditor };