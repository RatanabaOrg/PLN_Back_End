

const { MongoClient, ServerApiVersion } = require('mongodb');
const { ObjectId } = require('mongodb');
const uri = "mongodb+srv://ratanabaorg:praga@cluster0.m8qcp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    
  }
}
run().catch(console.dir);


const database = client.db('ratanaba');
const collection = database.collection('historico');

class Instancia{
    
    cadastro(data) {
        return new Promise(async (resolve, reject) => {
          let date =  new Date();
          const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${
            String(date.getMonth() + 1).padStart(2, '0')}/${
            date.getFullYear()} ${
            String(date.getHours()).padStart(2, '0')}:${
            String(date.getMinutes()).padStart(2, '0')}:${
            String(date.getSeconds()).padStart(2, '0')}`;
          data.data = formattedDate;
            try {
                const insertManyResult = await collection.insertOne(data);
                resolve(`instancia inserida.\n`);
              } catch (err) {
                reject(`erro ao inserir instancia: ${err}\n`);
              }

        })
    }

    visualizarTodos() {
        return new Promise(async (resolve, reject) => {

            try {
              var dados = collection.find({}).sort({ _id: -1 }).toArray();
                resolve(dados)
            } catch {
                reject(`Não foi possivel encontrar instancias: ${err}\n`);
            }
        })
    }

    visualizarUltimos() {
      return new Promise(async (resolve, reject) => {
        try {
          const hoje = new Date();
          const dia = String(hoje.getDate()).padStart(2, "0");
          const mes = String(hoje.getMonth() + 1).padStart(2, "0");
          const ano = hoje.getFullYear();
          const dataHoje = `${dia}/${mes}/${ano}`;
  
          const dados = await collection
            .find({ data: { $regex: dataHoje } })
            .sort({ _id: -1 })
            .toArray();
          resolve(dados);
        } catch (err) {
          reject(`Não foi possível encontrar usuários: ${err}\n`);
        }
      });
    }
}

module.exports = {
    Instancia: Instancia
}
