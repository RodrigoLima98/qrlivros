const connection = require('../database/connection');
const crypto = require('crypto');
const { update, select } = require('../database/connection');

module.exports = {

    async index(request, response){
        const emprestimo = await connection('emprestimo').select('*');

        return response.json(emprestimo);
    },

    async novoEmprestimo(request, response){

        const {rg_estudante, id_livro} = request.body;

        const codigo = crypto.randomBytes(10).toString('HEX');

        const dataDevolucao = somarDataAtual(7);
        const dataEmprestimo = dataAtual();

        const finalizado = false;
        const atraso = false;

        const validaRg = await connection('estudante')
        .where('rg', rg_estudante)
        .select('rg')
        .first();

        const validaIdLivro = await connection('livros')
        .where('idLivro', id_livro)
        .select('idLivro')
        .first();

        const verificaDisponivel = await connection('livros')
        .where('idLivro', id_livro)
        .where('disponivel', false)
        .select('disponivel')
        .first();


        if(!validaRg || !validaIdLivro){
            return response.status(400).json({error: 'Id inválido'})
        }

        if(verificaDisponivel){
            return response.status(400).json({error: 'Livro indisponível'})
        }
        

        await connection('livros')
        .where('idLivro', id_livro)
        .update('disponivel', false);

        await connection('emprestimo').insert({
            codigo,
            rg_estudante,
            id_livro,
            dataDevolucao,
            dataEmprestimo,
            finalizado,
            atraso,
        })

        return response.json({codigo});  
    },

    async finalizarEmprestimo(request, response){
        const {codigo} = request.body;

        const validaCodigo = await connection('emprestimo')
        .where('codigo', codigo)
        .select('codigo')
        .first();
  
        
        if(validaCodigo){
            const verificaFinalizado = await connection('emprestimo')
            .where('codigo', codigo)
            .where('finalizado', true)
            .select('finalizado')
            .first();


            if(verificaFinalizado){
                return response.status(400).json({error: 'Empréstimo já finalizado'})
            }
            

            const {id_livro} = await connection('emprestimo')
            .where('codigo', codigo)
            .select('id_livro')
            .first();


            await connection('livros')
            .where('idLivro', id_livro)
            .update('disponivel', true);
           
            await connection('emprestimo')
            .where('codigo', codigo)
            .update('finalizado', true);

            return response.json(codigo);
        }

        return response.status(400).json({error: 'Código não encontrado'})
    },

    async deletarEmprestimo(request, response){
        const {codigo} = request.params;

        const validaCodigo = await connection('emprestimo')
        .where('codigo', codigo)
        .select('codigo')
        .first();


        if(validaCodigo){
            const verificaFinalizado = await connection('emprestimo')
            .where('codigo', codigo)
            .where('finalizado', false)
            .select('finalizado')
            .first();


            if(verificaFinalizado){
                return response.status(400).json({error: 'Empréstimo ainda está em andamento'})
            }


            await connection('emprestimo')
            .where('codigo',codigo)
            .delete();

            return response.json(codigo);
        }

        return response.status(400).json({error: 'Código não encontrado'})
    }
}


function dataAtual(){
    var date = new Date();

    var dia = date.getDate();
    var mes = (date.getMonth()+1);
    var ano = date.getFullYear();

    var data = dia + '/' + mes + '/' + ano;

    return data;
}

function somarDataAtual(num){
    var date = new Date();
    var data = date.setDate(date.getDate() + num);

    function formatDate(data){
        var d = new Date(data);

        d = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear();

        return d;
    }

    data = formatDate(data);

    return data;
}