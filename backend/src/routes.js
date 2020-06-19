const express = require('express');

const SessionController = require('./controllers/SessionController');
const UsuarioController = require('./controllers/UsuarioController');
const EmprestimoController = require('./controllers/EmprestimoController');
const EstudanteController = require('./controllers/EstudanteController');
const LivrosController = require('./controllers/LivrosController');

const routes = express.Router();

routes.post('/logon', SessionController.logon);

routes.get('/cadastro', UsuarioController.index);
routes.post('/cadastro', UsuarioController.criarCadastro);
routes.put('/cadastro/alterar-senha', UsuarioController.alterarSenha);

routes.get('/livros', LivrosController.index);
routes.post('/livros', LivrosController.novoLivro);
routes.put('/livros/:idLivro', LivrosController.alterarLivro);
routes.delete('/livros/:idLivro', LivrosController.deletarLivro);

routes.get('/estudante', EstudanteController.index);
routes.post('/estudante', EstudanteController.novoEstudante);
routes.put('/estudante/:rg', EstudanteController.alterarEstudante);
routes.delete('/estudante/:rg', EstudanteController.deletarEstudante);

routes.get('/emprestimo', EmprestimoController.index);
routes.post('/emprestimo', EmprestimoController.novoEmprestimo);
routes.put('/emprestimo', EmprestimoController.finalizarEmprestimo);
routes.delete('/emprestimo/:codigo', EmprestimoController.deletarEmprestimo);

module.exports = routes;