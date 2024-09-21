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
    //await client.close();
  }
}
run().catch(console.dir);

const database = client.db('ratanaba');
const collection = database.collection('area');

class Area {

    cadastro(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const insertOneResult = await collection.insertOne(data);
                resolve(`Área inserida.\n`);
            } catch (err) {
                reject(`Erro ao inserir área: ${err}\n`);
            }
        });
    }

    visualizarTodos() {
        return new Promise(async (resolve, reject) => {
            try {
                const dados = await collection.find({}).toArray();
                resolve(dados);
            } catch (err) {
                reject(`Não foi possível encontrar áreas: ${err}\n`);
            }
        });
    }

    visualizar(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const dados = await collection.findOne({ "_id": new ObjectId(id) });
                resolve(dados);
            } catch (err) {
                reject(`Não foi possível encontrar a área: ${err}\n`);
            }
        });
    }

    atualizar(id, novosDados) {
        return new Promise(async (resolve, reject) => {
            try {
                const updateResult = await collection.updateOne(
                    { _id: new ObjectId(id) },
                    { $set: novosDados }
                );

                if (updateResult.matchedCount === 0) {
                    reject(`Área com id ${id} não encontrada.\n`);
                } else {
                    resolve(`Área com id ${id} atualizada.\n`);
                }
            } catch (err) {
                reject(`Erro ao atualizar área: ${err}\n`);
            }
        });
    }

    deletar(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const deleteResult = await collection.deleteOne({ _id: new ObjectId(id) });

                if (deleteResult.deletedCount === 0) {
                    reject(`Área com id ${id} não encontrada.\n`);
                } else {
                    resolve(`Área com id ${id} deletada.\n`);
                }
            } catch (err) {
                reject(`Erro ao deletar área: ${err}\n`);
            }
        });
    }

}

module.exports = {
    Area: Area
}
