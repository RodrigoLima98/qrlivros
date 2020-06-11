const express = require('express');

const UsuarioController = require('./controllers/UsuarioController');
const EmprestimoController = require('./controllers/EmprestimoController');
const EstudanteController = require('./controllers/EstudanteController');
const LivrosController = require('./controllers/LivrosController');

const routes = express.Router();

routes.post('/logon', UsuarioController.criarCadastro);
routes.get('/logon', UsuarioController.index);

routes.post('/livros', LivrosController.novoLivro);
routes.get('/livros', LivrosController.index);

routes.post('/estudante', EstudanteController.novoEstudante);
routes.get('/estudante', EstudanteController.index);

routes.post('/emprestimo', EmprestimoController.novoEmprestimo);
routes.get('/emprestimo', EmprestimoController.index);

module.exports = routes;