const { MongoClient, ServerApiVersion } = require('mongodb');
const { ObjectId } = require('mongodb'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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

    login(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const usuario = await collection.findOne({"email": data.email, "approved": true})
                if (!usuario) {
                    return res.status(400).json({ msg: 'Credenciais inválidas' });
                }
        
                const isMatch = await bcrypt.compare(data.password, usuario.password);
                if (!isMatch) {
                    return res.status(400).json({ msg: 'Credenciais inválidas' });
                }
                const payload = { userId: usuario._id };
                const token = jwt.sign(payload , 'secretKey', { expiresIn: '1h' });
                resolve(token)
            } catch(err) {
                reject(`Erro ao logar usuário: ${err}\n`);
            }
        })
    }

    cadastro(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const existingUser = await this.buscarEmail(data.email);
                if (existingUser) {
                    return res.status(400).json({ msg: 'Usuário já existe' });
                }
                const salt = await bcrypt.genSalt(10);
                data.password = await bcrypt.hash(data.password, salt);
                const insertOneResult = await collection.insertOne(data);
                resolve('Usuário cadastrado!\n');
            } catch (err) {
                reject(`Erro ao inserir usuário: ${err}\n`);
            }
        });
    }

    visualizarTodos() {
        return new Promise(async (resolve, reject) => {
            try {
                const dados = await collection.find({ approved: true }).sort({ name: 1 }).toArray();
                resolve(dados);
            } catch (err) {
                reject(`Não foi possível encontrar usuários: ${err}\n`);
            }
        });
    }

    usuariosParaAprovar() {
        return new Promise(async (resolve, reject) => {
            try {
                const dados = await collection.find({ approved: false }).sort({ createdAt: -1 }).toArray();
                resolve(dados);
            } catch (err) {
                reject(`Não foi possível encontrar usuários: ${err}\n`);
            }
        });
    }

    visualizar(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const dados = await collection.findOne({"_id": new ObjectId(id)});
                resolve(dados);
            } catch (err) {
                reject(`Não foi possível encontra o usuário: ${err}\n`);
            }
        });
    }

    async buscarEmail(email) {
            try {
                const dados = await collection.findOne({"email": email});
                return dados
            } catch (err) {
                console.log(`Não foi possível encontra o usuário: ${err}\n`);
            }
    }

    atualizar(id, novosDados) {
        return new Promise(async (resolve, reject) => {
            try {
                const updateResult = await collection.updateOne(
                    { _id: new ObjectId(id) }, 
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
                const deleteResult = await collection.deleteOne({ _id: new ObjectId(id) });

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
