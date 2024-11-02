const { sequelize, Sequelize } = require('./db');
const Service = require('./Service');
const Professional = require('./Professional');
const User = require('./user');

const Schedule = sequelize.define('Schedule', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true,
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    time: {
        type: Sequelize.STRING,  
        allowNull: false,
    },
    serviceId: {
        type: Sequelize.INTEGER, 
        allowNull: false,
    },
    professionalId: {
        type: Sequelize.INTEGER, 
        allowNull: false,
    },
    userId: {
        type: Sequelize.INTEGER, 
        allowNull: false,
    }
});

// Relações

// Chaves estrangeiras de Schedule
Schedule.belongsTo(Professional, { foreignKey: 'professionalId', allowNull: false });
Schedule.belongsTo(Service, { foreignKey: 'serviceId', allowNull: false });

//relação com o usuario
Schedule.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Schedule, { foreignKey: 'userId' });


//sequelize.sync({ force: true })
module.exports = Schedule;
