

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
                await collection.insertOne(data);
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

    acessosDia(area) {
      return new Promise(async (resolve, reject) => {
        try {
          const contagem = {};
          var dados;
          if (area == "todos") {
            dados = await collection
              .find()
              .sort({ data: 1})
              .toArray()
          } else {
            dados = await collection
              .find({ area: area })
              .sort({ data: 1})
              .toArray()
          }
          dados.forEach(doc => {
            const dataCompleta = doc.data; 
            const [data] = dataCompleta.split(' '); 
            contagem[data] = (contagem[data] || 0) + 1; 
          });
          resolve(contagem)
        } catch (err) {
          reject(`Não foi possivel encontrar instancias: ${err}\n`);
        }
      })
    }

    visualizarAlertas(nivel) {
      return new Promise(async (resolve, reject) => {
        try {
          let filtro = {};
          
          if (nivel=="todos") {
            filtro.alert = { $in: ["Moderado", "Alto", "Crítico"] };

          } else {
            filtro.alert = { $in: [nivel] };
          }

          const dados = await collection
            .find(filtro)
            .sort({ _id: -1 })
            .toArray();
          
          resolve(dados);
        } catch (err) {
          reject(`Não foi possível encontrar alertas: ${err}\n`);
        }
      });
    }

    async diasSemAcesso(data) {
      return new Promise(async (resolve, reject) => {
          try {
              const area = data.area
              const dados = await collection
                  .find({ area: area })
                  .sort({ _id: -1 })
                  .limit(1)
                  .toArray();
  
              if (dados.length === 0) {
                  resolve({ diasSemAcesso: 0 }); // Retorna um objeto JSON
                  return;
              }
  
              const dataParts = dados[0].data.split(' ')[0].split('/');
              const dia = dataParts[0];
              const mes = dataParts[1];
              const ano = dataParts[2];
  
              const dataUltimoAcesso = new Date(`${ano}-${mes}-${dia}T00:00:00`);
              const dataAtual = new Date();
  
              if (isNaN(dataUltimoAcesso.getTime())) {
                  reject(`Data do último acesso inválida: ${dados[0].data}`);
                  return;
              }
  
              const diferenca = dataAtual - dataUltimoAcesso;
              const diasSemAcesso = Math.floor(diferenca / (1000 * 60 * 60 * 24));
              (console.log(diasSemAcesso))
              resolve({ diasSemAcesso }); // Retorna um objeto JSON
          } catch (err) {
              reject(err);
          }
      });
  }
  
  

  async maiorTempoSemAcesso() {
    return new Promise(async (resolve, reject) => {
        try {
              const dados = await collection
                  .find({})
                  .sort({ _id: -1 })
                  .limit(1)
                  .toArray();
  
              if (dados.length === 0) {
                  resolve({ diasSemAcesso: 0 }); // Retorna um objeto JSON
                  return;
              }
  
              const dataParts = dados[0].data.split(' ')[0].split('/');
              const dia = dataParts[0];
              const mes = dataParts[1];
              const ano = dataParts[2];
  
              const dataUltimoAcesso = new Date(`${ano}-${mes}-${dia}T00:00:00`);
              const dataAtual = new Date();
  
              if (isNaN(dataUltimoAcesso.getTime())) {
                  reject(`Data do último acesso inválida: ${dados[0].data}`);
                  return;
              }
  
              const diferenca = dataAtual - dataUltimoAcesso;
              const diasSemAcesso = Math.floor(diferenca / (1000 * 60 * 60 * 24));
              (console.log(diasSemAcesso))
              resolve({ diasSemAcesso }); // Retorna um objeto JSON
          } catch (err) {
              reject(err);
          }
      });


}}



  
    


module.exports = {
    Instancia: Instancia
}
