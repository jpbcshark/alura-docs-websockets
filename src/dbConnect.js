import { MongoClient } from 'mongodb';

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error('MONGODB_URI não foi definida. Verifique o arquivo de ambiente.');
}

const cliente = new MongoClient(mongoUri);

await cliente.connect();

const db = cliente.db('alura-websockets');
const documentosColecao = db.collection('documentos');

console.log('Conectado ao banco de dados com sucesso!');

export { documentosColecao };
