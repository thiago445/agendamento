const cardButtons = document.querySelectorAll('.service');

// Seleciona a seção da classe 'professional'
const professionalSection = document.querySelector('.professional');

// Adiciona o evento de clique em cada botão dos cards
cardButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove a classe 'selected' de todos os botões
        cardButtons.forEach(btn => btn.classList.remove('selected'));
        
        // Adiciona a classe 'selected' ao botão clicado
        button.classList.add('selected');
        
        // Exibe a classe 'professional' ao selecionar um serviço
        professionalSection.classList.add('visible');
    });
});


//transparencia date

const cardButtons_professional = document.querySelectorAll('.professional_bottom');

// Seleciona a seção da classe 'date'
const professionalSection_professional = document.querySelector('.date');

cardButtons_professional.forEach(button => {
    button.addEventListener('click', function() {

        cardButtons_professional.forEach(btn => btn.classList.remove('selected'));
        
        button.classList.add('selected');
        
        professionalSection_professional.classList.add('visible');
    });
});


