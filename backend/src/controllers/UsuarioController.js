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

        const verificaEmail = await connection('usuario')
        .where('email', email)
        .select('email')
        .first();


        if(verificaEmail){
            return response.status(400).json({error: 'Email ja cadastrado'})      
        }


        await connection('usuario').insert({
            id,
            nomeBiblioteca,
            email,
            senha,
        })

        return response.json({id});
    },

    async alterarSenha(request, response){
        const {email, senha} = request.body;

        const verificaEmail = await connection('usuario')
        .where('email', email)
        .select('email')
        .first();

        if(verificaEmail){
            await connection('usuario')
            .where('email', email)
            .update('senha', senha);

            return response.json(senha);
        }

        return response.status(400).json({error: 'Email inválido'})
    }
}