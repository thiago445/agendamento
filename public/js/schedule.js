let serviceIdLet = null;
let professionalIdLet = null;
let selectedTime = null;

// Função para limpar os horários exibidos
function clearHorarios() {
    const horariosContainer = document.getElementById('horariosContainer');
    horariosContainer.innerHTML = '';
}

// Função para atualizar os horários
function updateHorarios() {
    const selectedDate = document.getElementById('datePicker').value;

    if (selectedDate && serviceIdLet && professionalIdLet) {
        fetch(`/horarios/${selectedDate}?serviceId=${serviceIdLet}&professionalId=${professionalIdLet}`)
            .then(response => response.json())
            .then(data => {
                clearHorarios(); // Limpa os horários antes de adicionar os novos
                const horariosContainer = document.getElementById('horariosContainer');

                data.forEach(horario => {
                    const button = document.createElement('button');
                    button.textContent = horario;
                    button.value = horario;
                    button.className = 'schedule-button';

                    button.addEventListener('click', function () {
                        document.querySelectorAll('.schedule-button').forEach(btn => btn.classList.remove('selected'));
                        this.classList.add('selected');
                        selectedTime = this.value;
                        document.querySelector('.confirm').classList.add('visible');
                    });

                    horariosContainer.appendChild(button);
                });

                // Chama a função para esconder horários passados depois que os horários forem carregados
                hidePastTimes(selectedDate);
            })
            .catch(error => console.error('Erro ao carregar horários:', error));
    }
}

// Adiciona eventos para os botões de serviço
document.querySelectorAll('.service').forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault();

        // Obtém o serviceId do botão clicado
        serviceIdLet = this.getAttribute('data-service-id');
        
        // Limpa e atualiza os horários
        clearHorarios();
        updateHorarios();
    });
});

// Adiciona eventos para os botões de profissional
document.querySelectorAll('.professional_bottom').forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault();

        // Obtém o professional-id do botão clicado
        professionalIdLet = this.getAttribute('data-professional-id');
        
        // Limpa e atualiza os horários
        clearHorarios();
        updateHorarios();
    });
});

// Definição do intervalo de seleção de datas (hoje até um mês depois)
const today_date = new Date();
const oneMonthLater = new Date(today_date);
oneMonthLater.setMonth(today_date.getMonth() + 1);

const todayISO = today_date.toISOString().split('T')[0];
const oneMonthLaterISO = oneMonthLater.toISOString().split('T')[0];

const datePicker = document.getElementById('datePicker');
datePicker.setAttribute('min', todayISO);
datePicker.setAttribute('max', oneMonthLaterISO);

datePicker.addEventListener('change', function () {
    const selectedDate = this.value;

    // Verifica se a data selecionada está dentro do intervalo permitido
    if (selectedDate > oneMonthLaterISO) {
        alert('A data selecionada não pode ser maior que um mês a partir da data atual.');
        this.value = ''; // Limpa o valor se a data estiver fora do intervalo
        return;
    }

    // Atualiza os horários ao trocar a data
    updateHorarios();
});

// Função para converter data no formato brasileiro (DD/MM/YYYY) para o formato ISO (YYYY-MM-DD)
function convertToISODate(dateStr) {
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month}-${day}`;
}

// Função para verificar se o horário é anterior ao horário atual e só ocultar no dia atual
function isPastTime(slot, selectedDate) {
    // Converte a data selecionada para o formato ISO
    const isoSelectedDate = convertToISODate(selectedDate);
    const currentDate = new Date(); // Data e hora atuais
    const selectedDateObj = new Date(isoSelectedDate); // Converte a data selecionada para um objeto Date

    // Ajusta as datas para comparar apenas o dia (removendo o fuso horário)
    selectedDateObj.setHours(0, 0, 0, 0); // Reseta as horas, minutos e segundos para a data selecionada
    currentDate.setHours(0, 0, 0, 0); // Reseta as horas, minutos e segundos para o dia atual

    // Se a data selecionada for diferente da data atual, não oculta nenhum horário
    if (selectedDateObj.getTime() !== currentDate.getTime()) {
        return false; // Não é necessário verificar horários para dias futuros
    }

    // Se for o mesmo dia, verifica os horários
    const [start, end] = slot.split('--'); // Divide o horário no formato 07:00--08:00
    const [startHour, startMinute] = start.split(':'); // Pega a hora e minutos iniciais

    // Converte a hora do slot para um objeto Date no dia atual
    const slotTime = new Date();
    slotTime.setHours(parseInt(startHour, 10), parseInt(startMinute, 10), 0, 0); // Define a hora e minutos do slot

    const currentTime = new Date(); // Hora atual
    currentTime.setSeconds(0, 0); // Reseta os segundos e milissegundos

    // Verifica se o horário do slot é anterior ao horário atual
    return slotTime < currentTime;
}

// Função para ocultar horários passados
function hidePastTimes(selectedDate) {
    const timeButtons = document.querySelectorAll('.schedule-button'); // Supondo que os botões tenham a classe 'schedule-button'

    timeButtons.forEach(button => {
        const timeSlot = button.textContent.trim(); // Pega o texto do botão, que é o horário
        if (isPastTime(timeSlot, selectedDate)) {
            button.style.display = 'none'; // Esconde o botão se o horário já passou e é o dia atual
        } else {
            button.style.display = 'inline-block'; // Garante que os horários futuros sejam exibidos
        }
    });
}

// Função para confirmar a reserva
document.getElementById('confirm_schedule').addEventListener('click', function () {
    const selectedDate = document.getElementById('datePicker').value;
    // Enviar a reserva ao backend
    fetch('/reservar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            date: selectedDate,
            time: selectedTime,
            serviceId: serviceIdLet,
            professionalId: professionalIdLet
        })
    })
        .then(response => response.json())
        .then(result => {
            window.location.href = '/';
        })
        .catch(error => console.error('Erro ao reservar horário:', error));
});
