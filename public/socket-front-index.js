import { alertarERedirecionar } from "./documento";
import { inserirLinkDocumento } from "/index.js";

const socket = io();

socket.emit("obter_documentos", (documentos) => {
    documentos.forEach((documento) => {

    });
});

function emitirAdicionarDocumento(nome) {
    socket.emit("adicionar-documento", nome);
};

function emitirTextoEditor({ dados }) {
    socket.emit("texto-editor", dados);
}

socket.on("adicionar_documento_interface", (nome) => {
    inserirLinkDocumento(nome);
});

socket.on("documento_existente", (nome) => {
    alert(`O documento "${nome}" já existe.`);
});

function emitirExcluirDocumento(nome) {
    socket.emit("excluir_documento", nome);
}

socket.on("excluir_documento_sucesso", (nome) => {
   removerLinkDocumento(nome);
});


export { emitirAdicionarDocumento, emitirTextoEditor, emitirExcluirDocumento };