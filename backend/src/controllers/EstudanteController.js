const connection = require('../database/connection');
const crypto = require('crypto');
const { where } = require('../database/connection');

module.exports = {

    async index(request, response){
        const estudante = await connection('estudante').select('*');

        return response.json(estudante);
    },

    async novoEstudante(request, response){
        const {nome, dataNascimento, cpf, email, telefone, endereco} = request.body;

        const idEstudante = crypto.randomBytes(10).toString('HEX');

        await connection('estudante').insert({
            idEstudante,
            nome,
            dataNascimento,
            cpf,
            email,
            telefone,
            endereco,
        })

        return response.json({idEstudante});
    },

    async alterarEstudante(request, response){

    },

    async deletarEstudante(request, response){
        
    }
}