const Schedule = require('../models/Shedule');
const Service = require('../models/Service');
const Professional = require('../models/Professional');
const { Op } = require('sequelize');

// Função para gerar horários de 07:00--08:00 até 16:00--17:00
function generateTimeSlots(startHour, endHour) {
    const timeSlots = [];
    let currentHour = startHour;

    while (currentHour < endHour) {
        const nextHour = currentHour + 1;
        const timeSlot = `${formatTime(currentHour)}--${formatTime(nextHour)}`;
        timeSlots.push(timeSlot);
        currentHour++;
    }

    return timeSlots;
}

function formatTime(hour) {
    return hour < 10 ? `0${hour}:00` : `${hour}:00`;
}


// Função para buscar horários disponíveis para uma data específica

async function getAvailableTimeSlots(date, professionalId) {
    const allSlots = generateTimeSlots(7, 17); 

    try {

        // Buscar os horários já reservados para o serviço e profissional na data específica
        const reservedSlots = await Schedule.findAll({
            where: {
                date: date,
                
                professionalId: professionalId
            },
            attributes: ['time']  // Só buscar os horários (campo 'time')
        });

        // Extrair os horários reservados como uma lista de strings
        const reservedTimes = reservedSlots.map(slot => slot.time.trim());

        // Filtrar os horários disponíveis, removendo os já reservados
        const availableSlots = allSlots.filter(slot => !reservedTimes.includes(slot.trim()));

        return availableSlots;
    } catch (error) {
        console.error('Erro ao buscar horários disponíveis:', error);
        return [];
    }
}




// Função para reservar um horário
async function bookTime(date, time, serviceId, professionalId,userId) {
    try {
        const horario = await Schedule.findOne({
            where: {
                date: date,
                time: time,
                serviceId: serviceId,
                userId:userId,
                professionalId: professionalId
            }
        });

        if (horario) {
            return { success: false, message: 'Horário indisponível.' };
        }

        await Schedule.create({
            date: date,
            time: time,
            serviceId: serviceId,
            userId:userId,
            professionalId: professionalId,
        });

        return { success: true, message: 'Horário reservado com sucesso!' };
    } catch (error) {
        console.error('Erro ao reservar horário:', error);
        return { success: false, message: 'Erro ao reservar horário.' };
    }
}

module.exports = {
    generateTimeSlots,
    getAvailableTimeSlots,
    bookTime
};
