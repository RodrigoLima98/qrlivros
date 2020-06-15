const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

    async index(request, response){
        const livros = await connection('livros').select('*');

        return response.json(livros);
    },

    async novoLivro(request, response){
        const {nome, autor} = request.body;

        const idLivro = crypto.randomBytes(8).toString('HEX');
        const disponivel = true;

        await connection('livros').insert({
            idLivro,
            nome,
            autor,
            disponivel,
        })

        return response.json({idLivro, disponivel});
    },

    async alterarLivro(request, response){

    },

    async deletarLivro(request, response){
        
    }
}