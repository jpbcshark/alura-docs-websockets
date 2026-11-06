import { atualizarTextoEditor } from "./documento.js";

const socket = io();

function selecionarDocumento(nome) {
    socket.emit('selecionar-documento', nome, (texto) => {
        atualizarTextoEditor(texto);
    });
}
 
function emitirTextoEditor(dados) {
    socket.emit('texto-editor', dados);
}

socket.on('texto-editor_clientes', (texto) => {
   atualizarTextoEditor(texto);
});

export { emitirTextoEditor, selecionarDocumento };