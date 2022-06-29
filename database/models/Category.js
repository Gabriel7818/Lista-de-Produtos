const Sequelize = require('sequelize');
const db = require('../db')

const Category = db.define('goliveira_categories', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true,
    }
});

// Criar a tabela com sequelize
// Produtos.sync();

// Excluir a tabela e criar novamente
// Produtos.sync({force: true});

// Verificar se há alguma diferença na tabela, realiza alteração
// Produtos.sync({alter: true});

module.exports = Category;