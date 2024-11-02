const { sequelize, Sequelize } = require('./db');

const Professional = sequelize.define("Professional", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nameProfessional: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
// sequelize.sync({ force: true })

module.exports = Professional;