const express = require('express');
const { Instancia } = require('./models/instancia');
const { Usuario } = require('./models/usuario')
const { Area } = require("./models/area");
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Instancia/Historico
app.post('/cadastro/instancia', async (req, res) => {
    var instancia = new Instancia();
    try {
        const resultado = await instancia.cadastro(req.body);
        res.send(resultado);
    } catch (error) {
        res.status(500).send("Erro durante o processo de cadastro de instancia.");
    }
});

app.get('/visualizar/historico', async (req, res) => {
    var instancia = new Instancia();
    try {
        const resultado = await instancia.visualizarTodos();
        res.send(JSON.stringify(resultado));
    } catch (error) {
        res.status(500).send("Erro durante o processo de visualização de instancias.");
    }
});

//Usuario
app.post('/cadastro/usuario', async (req, res) => {
    var usuario = new Usuario();
    try {
        const resultado = await usuario.cadastro(req.body);
        res.send(resultado);
    } catch (error) {
        res.status(500).send("Erro durante o processo de cadastro de usuário.");
    }
});

app.get('/visualizar/usuarios', async (req, res) => {
    var usuario = new Usuario();
    try {
        const resultado = await usuario.visualizarTodos();
        res.send(JSON.stringify(resultado));
    } catch (error) {
        res.status(500).send("Erro durante o processo de visualização de usuários.");
    }
});

app.get('/visualizar/usuario/:id', async (req, res) => {
    var usuario = new Usuario();
    const {id} = req.params;
    try {
        const resultado = await usuario.visualizar(id);
        res.send(JSON.stringify(resultado));
    } catch (error) {
        res.status(500).send("Erro durante o processo de visualização de usuário.");
    }
});

app.put('/atualizar/usuario/:id', async (req, res) => {
    var usuario = new Usuario();
    const {id} = req.params;
    try {
        const resultado = await usuario.atualizar(id, req.body)
        res.send(JSON.stringify(resultado));
    } catch (error) {
        res.status(500).send("Erro durante o processo de atualização de usuário.");
    }
})

app.delete('/deletar/usuario/:id', async (req, res) => {
    var usuario = new Usuario();
    const {id} = req.params;
    try {
        const resultado = await usuario.deletar(id)
        res.send(JSON.stringify(resultado));
    } catch (error) {
        res.status(500).send("Erro durante o processo de dele de usuário.");
    }
})

// Área
app.post('/cadastro/area', async (req, res) => {
    var area = new Area();
    try {
        const resultado = await area.cadastro(req.body);
        res.send(resultado);
    } catch (error) {
        res.status(500).send("Erro durante o processo de cadastro de área.");
    }
});

app.get('/visualizar/areas', async (req, res) => {
    var area = new Area();
    try {
        const resultado = await area.visualizarTodos();
        res.send(JSON.stringify(resultado));
    } catch (error) {
        res.status(500).send("Erro durante o processo de visualização de áreas.");
    }
});

app.get('/visualizar/area/:id', async (req, res) => {
    var area = new Area();
    const { id } = req.params;
    try {
        const resultado = await area.visualizar(id);
        res.send(JSON.stringify(resultado));
    } catch (error) {
        res.status(500).send("Erro durante o processo de visualização de área.");
    }
});

app.put('/atualizar/area/:id', async (req, res) => {
    var area = new Area();
    const { id } = req.params;
    try {
        const resultado = await area.atualizar(id, req.body);
        res.send(JSON.stringify(resultado));
    } catch (error) {
        res.status(500).send("Erro durante o processo de atualização de área.");
    }
});

app.delete('/deletar/area/:id', async (req, res) => {
    var area = new Area();
    const { id } = req.params;
    try {
        const resultado = await area.deletar(id);
        res.send(JSON.stringify(resultado));
    } catch (error) {
        res.status(500).send("Erro durante o processo de deleção de área.");
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
