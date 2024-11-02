const { sequelize, Sequelize } = require('./db');

const Service = sequelize.define("Service", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nameService: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});
// sequelize.sync({ force: false })

module.exports = Service;