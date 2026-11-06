import io from "./servidor.js";

const documentos = [
  {
    nome: "Javascript",
    texto: "texto do documento de javascript"
  },
  {
    nome: "NodeJs",
    texto: "texto do documento de NodeJs"
  },
  {
    nome: "Socket.io",
    texto: "texto do documento de Socket.io"
  },
];

io.on("connection", (socket) => {
  console.log("Novo cliente conectado. ID: " + socket.id);

  socket.on("selecionar-documento", (nomeDocumento, devolverTexto) => { 
    socket.join(nomeDocumento);

    const documento = encontrarDocumento(nomeDocumento);

    if (documento) {
      devolverTexto(documento.texto);
    }
  
  });

  socket.on("texto-editor", ({texto, nomeDocumento}) => {
    const documento = encontrarDocumento(nomeDocumento);
    if (documento) {
      documento.texto = texto;
      socket.to(nomeDocumento).emit("texto-editor_clientes", texto);
    }
  });
});

function encontrarDocumento(nome) {
  const documento = documentos.find((documento) => {
    return documento.nome === nome
  });  
  return documento;
}