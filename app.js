const express = require('express');
const { Instancia } = require('./models/instancia');
const instancia = require('./models/instancia');
var bodyParser = require('body-parser')


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/cadastro', async (req, res) => {
    var instancia = new Instancia();
    try {
        resultado = await instancia.cadastro(req.body);
        res.send(resultado);
    } catch {
        res.status(500).send("Erro durante o processo de cadastro de instancia.");
    }
})

app.get('/visualizar', async (req, res) => {
    var instancia = new Instancia();

    try {
        instancias = await instancia.visualizar();
        res.send(JSON.stringify(instancias));
    } catch {
        res.status(500).send("Erro durante o processo de visualização de instancias.");
    }
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});