import { emitirTextoEditor, selecionarDocumento } from "./socket-front-documentos.js";
import { emitirExcluirDocumento } from "./socket-front-index.js";

const parametros= new URLSearchParams(window.location.search);
const nomeDocumento = parametros.get('nome');

const textoEditor = document.getElementById('editor-texto');
const tituloDocumento = document.getElementById('titulo-documento');
const botaoExcluir = document.getElementById('excluir-documento');

tituloDocumento.textContent = nomeDocumento || 'Documento sem título';
selecionarDocumento(nomeDocumento);

textoEditor.addEventListener('keyup', () => {
    emitirTextoEditor({
        texto: textoEditor.value,
        nomeDocumento,
    });
});

function atualizarTextoEditor(texto) {
 textoEditor.value = texto;
}

botaoExcluir.addEventListener('click', () => {
    emitirExcluirDocumento(nomeDocumento);
});

function alertarERedirecionar(nome) {
    if (nome === nomeDocumento) {
        alert(`O documento "${nome}" foi excluído com sucesso.`);
        window.location.href = '/';
    }
}

export { atualizarTextoEditor, alertarERedirecionar };