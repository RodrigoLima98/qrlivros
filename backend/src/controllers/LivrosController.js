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

        if(nome == '' || autor == ''){
            return response.status(400).json({error: 'Os campos não podem estar vazios'}) 
        }

        await connection('livros').insert({
            idLivro,
            nome,
            autor,
            disponivel,
        })

        return response.json({idLivro, disponivel});
    },

    async alterarLivro(request, response){
        const {idLivro} = request.params;
        const {nome, autor} = request.body;
        
        const verificaId = await connection('livros')
        .where('idLivro', idLivro)
        .select('idLivro')
        .first();


        if(verificaId){
            const verificaDisponivel = await connection('livros')
            .where('idLivro', idLivro)
            .where('disponivel', false)
            .select('disponivel')
            .first();


            if(verificaDisponivel){
                return response.status(400).json({error: 'Livro possuí emprestimo pendente'})
            }
            
            if(nome == '' || autor == ''){
                return response.status(400).json({error: 'Os campos não podem estar vazios'}) 
            }


            await connection('livros')
            .where('idLivro', idLivro)
            .update('nome', nome)
            .update('autor', autor);

            return response.json(idLivro)
        }

        return response.status(400).json({error: 'Livro não encontrado'})
    },

    async deletarLivro(request, response){
        const {idLivro} = request.params;

        const verificaId = await connection('livros')
        .where('idLivro', idLivro)
        .select('idLivro')
        .first();

        if(verificaId){
            const verificaDisponivel = await connection('livros')
            .where('idLivro', idLivro)
            .where('disponivel', false)
            .select('disponivel')
            .first();


            if(verificaDisponivel){
                return response.status(400).json({error: 'Livro possuí emprestimo pendente'})
            }


            await connection('livros')
            .where('idLivro', idLivro)
            .delete();

            return response.json(idLivro)
        }

        return response.status(400).json({error: 'Livro não encontrado'})
    }
}