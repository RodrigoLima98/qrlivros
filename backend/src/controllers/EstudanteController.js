const connection = require('../database/connection');
const { where } = require('../database/connection');

module.exports = {

    async index(request, response){
        const estudante = await connection('estudante').select('*');

        return response.json(estudante);
    },

    async novoEstudante(request, response){
        const {rg, nome, dataNascimento, email, telefone, endereco} = request.body;

        const verificaEstudante = await connection('estudante')
        .where('rg', rg)
        .select('rg')
        .first();

        
        if(verificaEstudante){
            return response.status(400).json({error: 'Estudante já cadastrado'})
        }

        if(rg == '' || nome == '' || dataNascimento == '' || email == '' || telefone == '' || endereco == ''){
            return response.status(400).json({error: 'Os campos não podem estar vazios'})
        }


        await connection('estudante').insert({
            rg,
            nome,
            dataNascimento,
            email,
            telefone,
            endereco,
        })

        return response.json({rg});
    },

    async alterarEstudante(request, response){
        const {rg} = request.params;
        const {newRg, nome, dataNascimento, email, telefone, endereco} = request.body;

        const verificaEstudante = await connection('estudante')
        .where('rg', rg)
        .select('rg')
        .first();


        if(verificaEstudante){
            if(newRg == '' || nome == '' || dataNascimento == '' || email == '' || telefone == '' || endereco == ''){
                return response.status(400).json({error: 'Os campos não podem estar vazios'})
            }
            
            const verificaNovoRg = await connection('estudante')
            .where('rg', newRg)
            .select('rg')
            .first();

            if(verificaNovoRg && newRg != rg){
                return response.status(400).json({error: 'Estudante já cadastrado'})
            }


            const verificaEmprestimoAtivo = await connection('emprestimo')
            .where('rg_estudante', rg)
            .where('finalizado', false)
            .select('rg_estudante')
            .first();

            if(verificaEmprestimoAtivo){
                return response.status(400).json({error: 'Estudante possuí emprestimo pendente'})
            }


            await connection('estudante')
            .where('rg', rg)
            .update('rg', newRg)
            .update('nome', nome)
            .update('dataNascimento', dataNascimento)
            .update('email', email)
            .update('telefone', telefone)
            .update('endereco', endereco);

            return response.json(newRg);
        }

        return response.status(400).json({error: 'Estudante não encontrado'})
    },

    async deletarEstudante(request, response){
        const {rg} = request.params;

        const verificaRg = await connection('estudante')
        .where('rg', rg)
        .select('rg')
        .first();

        if(verificaRg){
            const verificaEmprestimoAtivo = await connection('emprestimo')
            .where('rg_estudante', rg)
            .where('finalizado', false)
            .select('rg_estudante')
            .first();


            if(verificaEmprestimoAtivo){
                return response.status(400).json({error: 'Estudante possuí emprestimo pendente'})
            }


            await connection('estudante')
            .where('rg', rg)
            .delete();

            return response.json(rg)
        }

        return response.status(400).json({error: 'Estudante não encontrado'})
    }
}