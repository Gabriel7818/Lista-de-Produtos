const express = require('express');
const Category = require('./database/models/Category');
const Product = require('./database/models/Product');
const app = express();
require('dotenv').config()

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", async (req, res) => {
    res.send("Serviço de API Iniciado com Sucesso !");
});

// Categorias

// Get
app.get("/categories", async (req, res) => {
    await Category.findAll({
        attributes: ['id', 'name', 'description'],
        order:[['name', 'ASC']]
    }).then((products) => {
        return res.json({
            erro: false,
            products
        });
    }).catch((err) => {
        return res.status(400).json({
            erro: true,
            mensagem: `Nenhuma Categoria Encontrada. Erro:${err}`
        });
    });
});

// Get
app.get('/categories/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const categories = await Category.findByPk(id);
        if(!categories){
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhuma Categoria Encontrada"
            });
        };
        res.status(200).json({
            erro: false,
            categories
        });
    }catch(err){
        res.status(400).json({
            erro: true,
            mensagem: `Erro: ${err}`
        });
    };
});

// Post
app.post("/category", async (req, res) => {
    var dados = req.body;
    console.log(dados);

    await Category.create(req.body)
    .then(() => {
        return res.json({
            erro: false,
            mensagem: 'Categoria Registrada com Sucesso !'
        });
    }).catch((err) => {
        return res.status(400).json({
            erro: true,
            mensagem: `Erro: Categoria não Registrada ${err}`
        });
    });
});

// Put
app.put("/category", async (req, res) => {
    const {id} = req.body;

    await Category.update(req.body, {where: {id}})
    .then(() => {
        return res.json({
            erro: false,
            mensagem: 'Categoria Alterada com Sucesso !'
        });
    }).catch((err) => {
        return res.status(400).json({
            erro: true,
            mensagem: `Categoria não Alterada. Erro: ${err}`
        });
    });
});

// Delete
app.delete("/category/:id", async (req, res) => {
    const {id} = req.params;
    await Category.destroy({where:{id}})
    .then(() => {
        return res.json({
            erro: false,
            mensagem: "Categoria Deletada com Sucesso !"
        });
    }).catch((err) => {
        return res.status(400).json({
            erro: true,
            mensagem: `Categoria não Deletada. Erro: ${err}`
        });
    });
});

// Produtos

app.get("/products", async (req, res) => {
    await Category.findAll({
        attributes: ['id', 'name', 'description'],
        order:[['name', 'ASC']]
    }).then((product) => {
        return res.json({
            erro: false,
            product
        });
    }).catch((err) => {
        return res.status(400).json({
            erro: true,
            mensagem: `Nenhum Produto Encontrado. Erro:${err}`
        });
    });
});

// Get
app.get('/products/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const products = await Category.findByPk(id);
        if(!products){
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhum Produto Encontrado"
            });
        };
        res.status(200).json({
            erro: false,
            products
        });
    }catch(err){
        res.status(400).json({
            erro: true,
            mensagem: `Erro: ${err}`
        });
    };
});

// Post
app.post("/product", async (req, res) => {
    var dados = req.body;
    console.log(dados);

    await Product.create(req.body)
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

// Put (Update)
app.put("/product", async (req, res) => {
    const {id} = req.body;

    await Product.update(req.body, {where: {id}})
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
app.delete("/products/:id", async (req, res) => {
    const {id} = req.params;

    await Product.destroy({where:{id}})
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