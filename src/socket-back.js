import { adicionarDocumento, atualizaDocumento, encontrarDocumento, excluirDocumento, obterDocumentos } from "./documentosDb.js";
import io from "./servidor.js";

io.on("connection", (socket) => {
 socket.on("obter_documentos", async (devolverDocumentos) => {
    const documentos = await obterDocumentos();
    devolverDocumentos(documentos);
  });

  socket.on("adicionar-documento", async (nome) => {
    const documentoExistente = (await encontrarDocumento(nome)) !== null;
    if (documentoExistente) {
      socket.emit("documento_existente", nome);
    } else {
      const resultado = await adicionarDocumento(nome);
      if (resultado.acknowledged) {
        io.emit("adicionar_documento_interface", nome);
      }
    }
  });

  socket.on("selecionar-documento", async (nomeDocumento, devolverTexto) => {
    socket.join(nomeDocumento);

    const documento = await encontrarDocumento(nomeDocumento);
  
    if (documento) {
      devolverTexto(documento.texto);
    }

  });

  socket.on("texto-editor", async ({ texto, nomeDocumento }) => {
    const atualizacao = await atualizaDocumento(nomeDocumento, texto);
 
    if (atualizacao.modifiedCount) {
      socket.to(nomeDocumento).emit("texto-editor_clientes", texto);
    }
  });

  socket.on("excluir_documento", async (nome) => {
    const resultado = await excluirDocumento(nome);
    if (resultado.deletedCount) {
      io.emit("excluir_documento_sucesso", nome);
    }
  });
});