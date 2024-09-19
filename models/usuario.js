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
    //await client.close();
  }
}
run().catch(console.dir);

const database = client.db('ratanaba');
const collection = database.collection('usuario');


class Usuario {

    cadastro(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const insertOneResult = await collection.insertOne(data);
                resolve(`Usuário inserido.\n`);
            } catch (err) {
                reject(`Erro ao inserir usuário: ${err}\n`);
            }
        });
    }

    visualizar() {
        return new Promise(async (resolve, reject) => {
            try {
                const dados = await collection.find({}).toArray();
                resolve(dados);
            } catch (err) {
                reject(`Não foi possível encontrar usuários: ${err}\n`);
            }
        });
    }

    atualizar(id, novosDados) {
        return new Promise(async (resolve, reject) => {
            try {
                const updateResult = await collection.updateOne(
                    { _id: id }, 
                    { $set: novosDados } 
                );

                if (updateResult.matchedCount === 0) {
                    reject(`Usuário com id ${id} não encontrado.\n`);
                } else {
                    resolve(`Usuário com id ${id} atualizado.\n`);
                }
            } catch (err) {
                reject(`Erro ao atualizar usuário: ${err}\n`);
            }
        });
    }

    deletar(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const deleteResult = await collection.deleteOne({ _id: id });

                if (deleteResult.deletedCount === 0) {
                    reject(`Usuário com id ${id} não encontrado.\n`);
                } else {
                    resolve(`Usuário com id ${id} deletado.\n`);
                }
            } catch (err) {
                reject(`Erro ao deletar usuário: ${err}\n`);
            }
        });
    }

}

module.exports = {
    Usuario: Usuario
}