const Sequelize = require('sequelize');

const sequelize = new Sequelize('senac', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate(0).then(function() {
    console.log('Conexão com o Database Realizada com sucesso.');
}).catch(function(err) {
    console.log(`Não Foi Possível se Conectar ao Database: ${err}`);
});

module.exports = sequelize;

