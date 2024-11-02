const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const hbs = require('./config/handlebars'); 
const session = require('express-session');


app.use(session({
    secret: 'sua_chave_secreta',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Coloque true em produção
}));

// Configuração do Handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Servindo arquivos estáticos
app.use('/public', express.static('public/css'));
app.use('/image', express.static('public/image'));
app.use('/script', express.static('public/js'));

// Importa e usa as rotas
const homeRoutes = require('./Routes/homeRoutes');
const horariosRoutes = require('./Routes/horariosRoutes');
const reservarRoutes = require('./Routes/reservarRoutes');
const agendamentoPageRoutes = require('./Routes/agendamentoPageRoutes');
const AgendadosRoutes = require('./Routes/AgendadosRoutes');
const cadastrar_user = require('./Routes/cadastrar_user');
const login_user = require('./Routes/login_user');
const logout = require('./Routes/logout');
const User_Information = require('./Routes/User_Information');

app.use('/', homeRoutes);
app.use('/logout', logout);
app.use('/login', login_user);
app.use('/add-user', cadastrar_user);
app.use('/agendamento', agendamentoPageRoutes);
app.use('/user/dados',User_Information)
app.use('/dados', AgendadosRoutes);
app.use('/horarios', horariosRoutes);
app.use('/reservar', reservarRoutes);

app.listen(8081, function () {
    console.log('Servidor rodando');
});
