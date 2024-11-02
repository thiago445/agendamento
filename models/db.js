const Sequelize = require('sequelize');

// Conexão com o banco
const sequelize = new Sequelize('agendamento', 'root', 'root', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql',
});

// Exportar a conexão
module.exports = { sequelize, Sequelize };
