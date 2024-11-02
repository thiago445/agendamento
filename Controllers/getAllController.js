const Schedule = require('../models/Shedule');
const Service = require('../models/Service');
const User = require('../models/user');
const Professional = require('../models/Professional');
const { Op } = require('sequelize');

// Função para obter todos os agendamentos organizados por dia da semana
async function getAllAppointments() {
    try {
        // Buscar todos os agendamentos, incluindo os nomes dos serviços e profissionais
        const appointments = await Schedule.findAll({
            order: [['date', 'ASC']], // Ordena por data
            include: [
                {
                    model: Service,
                    attributes: ['nameService'],  // apenas o nome do serviço
                },
                {
                    model: Professional,
                    attributes: ['nameProfessional'],  //apenas o nome do profissional
                },
                {
                    model: User,
                    attributes: ['name'],  // apenas o nome do cliente
                }
            ]
        });

        // Organize os agendamentos por dia da semana
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const organizedAppointments = {};
        console.log(daysOfWeek);

        // Inicializa um array vazio para cada dia da semana
        daysOfWeek.forEach(day => {
            organizedAppointments[day] = [];
        });

        // Organiza os agendamentos por dia da semana
        appointments.forEach(appointment => {
            // Acessa o nome do serviço e do profissional
            const serviceName = appointment.Service.nameService;
            const professionalName = appointment.Professional.nameProfessional;
            const UserName = appointment.User.name;

            // Acessa a data corretamente
            const date = new Date(appointment.date);

            // Obtém o nome do dia da semana (0 = Sunday, 1 = Monday, etc.)
            const dayName = daysOfWeek[date.getDay()];

            // Adiciona ao array correto para o dia da semana, incluindo os nomes do serviço e do profissional
            organizedAppointments[dayName].push({
                date: appointment.date,
                time: appointment.time,
                serviceName: serviceName,
                name:UserName,
                professionalName: professionalName
            });

            // Log para verificar se o agendamento foi adicionado corretamente ao dia correspondente
            // console.log(`Agendamento adicionado para ${dayName}: ${appointment.date} ${appointment.time} usuario:${UserName}`);
        });

        // Retorna os dados organizados
        return organizedAppointments;
    } catch (error) {
        console.error('Erro ao obter agendamentos:', error);
        throw new Error('Erro ao obter agendamentos.'); // Lança o erro para que possa ser capturado pela rota
    }
}

module.exports = {
    getAllAppointments
};
