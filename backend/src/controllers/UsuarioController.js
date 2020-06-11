const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

    async index(request, response){
        const usuario = await connection('usuario').select('*');

        return response.json(usuario);
    },

    async criarCadastro(request, response){
        const {nomeBiblioteca, email, senha} = request.body;

        const id = crypto.randomBytes(10).toString('HEX');

        await connection('usuario').insert({
            id,
            nomeBiblioteca,
            email,
            senha,
        })

        return response.json({nomeBiblioteca});
    }
}