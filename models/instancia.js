

const { MongoClient, ServerApiVersion } = require('mongodb');
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

            try {
                const insertManyResult = await collection.insertOne(data);
                resolve(`instancia inserida.\n`);
              } catch (err) {
                reject(`erro ao inserir instancia: ${err}\n`);
              }

        })
    }

    visualizar() {
        return new Promise(async (resolve, reject) => {

            try {
                var dados = collection.find({}).toArray();
                resolve(dados)
            } catch {
                reject(`Não foi possivel encontrar instancias: ${err}\n`);
            }
        })
    }
}

module.exports = {
    Instancia: Instancia
}