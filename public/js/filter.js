
async function loadAppointments() {
    try {
        const response = await fetch('/dados');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao carregar agendamentos:', error);
    }
}

function formatDateToBR(dateString) {
    const date = new Date(dateString + 'T00:00:00'); // Para garantir que a data seja lida corretamente
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
}

function showUserInfo(userId) {
    fetch(`/user/dados`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('userDetails').innerText = JSON.stringify(data, null, 2);
            document.getElementById('userInfoModal').style.display = 'block';
        })
        .catch(error => console.error('Erro ao carregar informações do usuário:', error));
}

function filterAppointments(data, dayFilter, professionalFilter) {
    const tableBody = document.querySelector('#appointmentsTable tbody');
    tableBody.innerHTML = ''; // Limpa a tabela antes de adicionar os filtros

    const appointments = [];

    Object.keys(data).forEach(day => {
        data[day].forEach(appointment => {
            const appointmentDate = new Date(appointment.date + 'T00:00:00');
            const appointmentDay = appointmentDate.getUTCDate();

            const formattedProfessionalFilter = professionalFilter.trim().toLowerCase();
            const formattedProfessionalName = appointment.professionalName.trim().toLowerCase();

            if (
                (dayFilter === '' || appointmentDay == dayFilter) &&
                (professionalFilter === '' || formattedProfessionalName === formattedProfessionalFilter)
            ) {
                appointments.push(appointment);
            }
        });
    });

    // Ordena os agendamentos pelo horário de início
    appointments.sort((a, b) => {
        const timeA = a.time.split('--')[0]; // Pega o horário de início
        const timeB = b.time.split('--')[0]; // Pega o horário de início
        return timeA.localeCompare(timeB); // Compara as strings para ordenar
    });

    // Adiciona os agendamentos ordenados à tabela
    appointments.forEach(appointment => {
        const appointmentDate = new Date(appointment.date + 'T00:00:00');
        const appointmentDay = appointmentDate.getUTCDate();

        const row = document.createElement('tr');
        row.innerHTML = `
        <td><a href="#" onclick="showUserInfo(${appointment.userId})">${appointment.name}</a></td>
        <td>${formatDateToBR(appointment.date)}</td>
        <td>${appointment.time}</td>
        <td>${appointment.serviceName}</td>
        <td>${appointment.professionalName}</td>
    `;
        tableBody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const data = await loadAppointments();

    // Obtém o dia atual
    const today = new Date();
    const todayDay = today.getDate();

    document.querySelector('#daySelect').value = todayDay;
    filterAppointments(data, todayDay, '');

    document.querySelector('#filterButton').addEventListener('click', () => {
        const dayFilter = document.querySelector('#daySelect').value;
        const professionalFilter = document.querySelector('#professionalSelect').value;
        filterAppointments(data, dayFilter, professionalFilter);
    });

    // Evento para fechar o modal
    document.getElementById('closeModal').addEventListener('click', () => {
        document.getElementById('userInfoModal').style.display = 'none';
    });
});
