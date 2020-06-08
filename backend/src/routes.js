const express = require('express');

const UsuarioController = require('./controllers/UsuarioController');
const EmprestimoController = require('./controllers/EmprestimoController');
const EstudanteController = require('./controllers/EstudanteController');
const LivrosController = require('./controllers/LivrosController');

const routes = express.Router();

routes.post('/logon', UsuarioController);
routes.put('/logon/alterar-senha', UsuarioController);

routes.post('/emprestimo/novo', EmprestimoController);
routes.get('/emprestimo/consultar', EmprestimoController);
routes.put('/emprestimo/', EmprestimoController);

routes.post('estudante/novo', EstudanteController);
routes.get('estudante/consulta/', EstudanteController);
routes.put('estudante/alterar', EstudanteController);
routes.delete('estudante/', EstudanteController);

routes.post('livros/novo', LivrosController);
routes.get('livros/consulta', LivrosController);
routes.put('livros/alterar', LivrosController);
routes.delete('livros/', LivrosController);

module.exports = routes;