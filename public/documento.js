import { emitirTextoEditor, selecionarDocumento } from "./socket-front-documentos.js";

const parametros= new URLSearchParams(window.location.search);
const nomeDocumento = parametros.get('nome');

const textoEditor = document.getElementById('editor-texto');
const tituloDocumento = document.getElementById('titulo-documento');

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

export { atualizarTextoEditor };