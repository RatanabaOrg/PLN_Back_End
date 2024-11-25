const express = require('express');
const authMiddleware = require('./models/auth/auth');
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
app.post('/cadastro/instancia', authMiddleware, async (req, res) => {
    var instancia = new Instancia();
    try {
        const resultado = await instancia.cadastro(req.body);
        res.send(resultado);
    } catch (error) {
        res.status(500).send("Erro durante o processo de cadastro de instancia.");
    }
});


app.get('/visualizar/historico', authMiddleware,async (req, res) => {
    var instancia = new Instancia();
    try {
        const resultado = await instancia.visualizarTodos();
        res.send(JSON.stringify(resultado));
    } catch (error) {
        res.status(500).send("Erro durante o processo de visualização de instancias.");
    }
});

app.get('/visualizar/historico/alerta/:nivel', authMiddleware, async (req, res) => {
    var instancia = new Instancia();
    const { nivel } = req.params;

    try {
        const resultado = await instancia.visualizarAlertas(nivel);
        res.send(JSON.stringify(resultado));
    } catch (error) {
        res.status(500).send("Erro durante o processo de visualização de instancias.");
    }
});

app.get('/visualizar/ultimos/acessos', authMiddleware, async (req, res) => {
    var instancia = new Instancia();
    try {
        const resultado = await instancia.visualizarUltimos();
        res.send(JSON.stringify(resultado));
    } catch (error) {
        res.status(500).send("Erro durante o processo de visualização de instancias.");
    }
});

app.get('/acessosPorDia/:area', authMiddleware, async (req, res) => {
    var instancia = new Instancia();
    const {area} = req.params
    try {
        const resultado = await instancia.acessosDia(area);
        res.send(JSON.stringify(resultado));
    } catch (error) {
        res.status(500).send("Erro durante o processo de visualização de instancias.");
    }
});

app.post('/diasSemAcesso/', authMiddleware, async (req, res) => {
    var instancia = new Instancia();
    try {
        const resultado = await instancia.diasSemAcesso(req.body);
        console.log(resultado)
        res.send(JSON.stringify(resultado))
    } catch (error) {
        res.status(500).send("Erro durante o cálculo de dias sem acesso.");
    }
});

app.get('/maiorTempoSemAcesso', authMiddleware, async (req, res) => {
    var instancia = new Instancia();
    try {
        const resultado = await instancia.maiorTempoSemAcesso();
        console.log(resultado)
    } catch (error) {
        res.status(500).send("Erro durante o cálculo do maior tempo sem acesso.");
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

app.get('/visualizar/usuarios', authMiddleware, async (req, res) => {
    var usuario = new Usuario();
    try {
        const resultado = await usuario.visualizarTodos();
        res.send(JSON.stringify(resultado));
    } catch (error) {
        res.status(500).send("Erro durante o processo de visualização de usuários.");
    }
});

app.get('/visualizar/usuario/:id', authMiddleware, async (req, res) => {
    var usuario = new Usuario();
    const {id} = req.params;
    try {
        const resultado = await usuario.visualizar(id);
        res.send(JSON.stringify(resultado));
    } catch (error) {
        res.status(500).send("Erro durante o processo de visualização de usuário.");
    }
});

app.put('/atualizar/usuario/:id', authMiddleware, async (req, res) => {
    var usuario = new Usuario();
    const {id} = req.params;
    try {
        const resultado = await usuario.atualizar(id, req.body)
        res.send(JSON.stringify(resultado));
    } catch (error) {
        res.status(500).send("Erro durante o processo de atualização de usuário.");
    }
})

app.delete('/deletar/usuario/:id', authMiddleware, async (req, res) => {
    var usuario = new Usuario();
    const {id} = req.params;
    try {
        const resultado = await usuario.deletar(id)
        res.send(JSON.stringify(resultado));
    } catch (error) {
        res.status(500).send("Erro durante o processo de dele de usuário.");
    }
})

app.get('/visualizar/usuariosParaAprovar', authMiddleware, async (req, res) => {
    var usuario = new Usuario();
    try {
        const resultado = await usuario.usuariosParaAprovar();
        res.send(JSON.stringify(resultado));
    } catch (error) {
        res.status(500).send("Erro durante o processo de cadastro de usuário.");
    }
});


app.post('/login/usuario', async (req, res) => {
    var usuario = new Usuario();
    try {
        const resultado = await usuario.login(req.body);
        res.send(JSON.stringify(resultado));
    } catch (error) {
        res.status(500).send("Erro durante o processo de login.");
    }
})

// Área
app.post('/cadastro/area', authMiddleware, async (req, res) => {
    var area = new Area();
    try {
        const resultado = await area.cadastro(req.body);
        res.send(resultado);
    } catch (error) {
        res.status(500).send("Erro durante o processo de cadastro de área.");
    }
});


app.get('/visualizar/areas',  authMiddleware,async (req, res) => {
    var area = new Area();
    try {
        const resultado = await area.visualizarTodos();
        res.send(JSON.stringify(resultado));
    } catch (error) {
        res.status(500).send("Erro durante o processo de visualização de áreas.");
    }
});

app.get('/visualizar/area/:id', authMiddleware, async (req, res) => {
    var area = new Area();
    const { id } = req.params;
    try {
        const resultado = await area.visualizar(id);
        res.send(JSON.stringify(resultado));
    } catch (error) {
        res.status(500).send("Erro durante o processo de visualização de área.");
    }
});

app.put('/atualizar/area/:id', authMiddleware, async (req, res) => {
    var area = new Area();
    const { id } = req.params;
    try {
        const resultado = await area.atualizar(id, req.body);
        res.send(JSON.stringify(resultado));
    } catch (error) {
        res.status(500).send("Erro durante o processo de atualização de área.");
    }
});

app.delete('/deletar/area/:id', authMiddleware, async (req, res) => {
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
