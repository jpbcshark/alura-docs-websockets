import { documentosColecao } from "./dbConnect.js";

 function obterDocumentos() {
    const documentos = documentosColecao.find().toArray();
    return documentos;
}

function adicionarDocumento(nome) {
    const resultado = documentosColecao.insertOne({ nome: nome, texto: "" });
    return resultado;
}

async function encontrarDocumento(nome) {
    const documentos = await documentosColecao.findOne({ nome: nome });
    return documentos;
}

async function atualizaDocumento(nome, texto) {
    const atualizacao = await documentosColecao.updateOne(
        { nome: nome },
        { $set: { texto: texto } }
    );
    return atualizacao;
}

async function excluirDocumento(nome) {
    const resultado = await documentosColecao.deleteOne({ nome: nome });
    return resultado;
}

export { encontrarDocumento, atualizaDocumento, obterDocumentos, adicionarDocumento, excluirDocumento };