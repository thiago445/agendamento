const { sequelize, Sequelize } = require('./db');


const User = sequelize.define('User', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telephone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    tableName: 'users' // Nome da tabela no banco de dados
});

//sequelize.sync({ force: true })

module.exports = User;