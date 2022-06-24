const express = require('express');
const Produto = require('./database/models/Products');
const app = express();
require('dotenv').config()

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", async (req, res) => {
    res.send("Serviço Iniciado com Sucesso !");
});

// Get
app.get("/produtos", async (req, res) => {
    await User.findAll({
        attributes: ['id', 'name', 'description'],
        order:[['name', 'ASC']]
    }).then((produtos) => {
        return res.json({
            erro: false,
            produtos
        });
    }).catch((err) => {
        return res.status(400).json({
            erro: true,
            mensagem: `Nenhum Produto Encontrado. Erro:${err}`
        });
    });
});

// Get
app.get('/produtos/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const produtos = await Produto.findByPk(id);
        if(!produtos){
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhum Produto Encontrado"
            });
        };
        res.status(200).json({
            erro: false,
            produtos
        });
    }catch(err){
        res.status(400).json({
            erro: true,
            mensagem: `Erro: ${err}`
        });
    };
});

// Post
app.post("/produto", async (req, res) => {
    var dados = req.body;
    console.log(dados);

    await Produto.create(req.body)
    .then(() => {
        return res.json({
            erro: false,
            mensagem: 'Produto Registrado com Sucesso !'
        });
    }).catch((err) => {
        return res.status(400).json({
            erro: true,
            mensagem: `Erro: Produto não Registrado ${err}`
        });
    });
});

// Put
app.put("/produto", async (req, res) => {
    const {id} = req.body;

    await User.update(req.body, {where: {id}})
    .then(() => {
        return res.json({
            erro: false,
            mensagem: 'Produto Alterado com Sucesso !'
        });
    }).catch((err) => {
        return res.status(400).json({
            erro: true,
            mensagem: `Produto não Alterado. Erro: ${err}`
        });
    });
});

// Delete
app.delete("/produto/:id", async (req, res) => {
    const {id} = req.params;
    await Produto.destroy({where:{id}})
    .then(() => {
        return res.json({
            erro: false,
            mensagem: "Produto Deletado com Sucesso !"
        });
    }).catch((err) => {
        return res.status(400).json({
            erro: true,
            mensagem: `Produto não Deletado. Erro: ${err}`
        });
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Servidor Iniciado na Porta ${process.env.PORT} "http://localhost:${process.env.PORT}"`);
});