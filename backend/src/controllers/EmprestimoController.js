const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

    async index(request, response){
        const emprestimo = await connection('emprestimo').select('*');

        return response.json(emprestimo);
    },

    async novoEmprestimo(request, response){

        const {id_estudante, id_livro} = request.body;

        const codigo = crypto.randomBytes(10).toString('HEX');

        const dataDevolucao = somarDataAtual(7);
        const dataEmprestimo = dataAtual();

        const finalizado = false;
        const atraso = false;


        const validaIdEstudante = await connection('estudante')
        .where('idEstudante', id_estudante)
        .select('idEstudante')
        .first();

        const validaIdLivro = await connection('livros')
        .where('idLivro', id_livro)
        .select('idLivro')
        .first();

        const validaDisponivel = await connection('livros')
        .where('idLivro', id_livro)
        .select('disponivel')
        .first();


        if(!validaIdEstudante || !validaIdLivro){
            return response.status(400).json({error: 'Id inválido'})
        }

        if(validaDisponivel){
            console.log(validaDisponivel)
        }


        await connection('livros')
        .where('idLivro', id_livro)
        .update('disponivel', false);

        await connection('emprestimo').insert({
            codigo,
            id_estudante,
            id_livro,
            dataDevolucao,
            dataEmprestimo,
            finalizado,
            atraso,
        })

        return response.json({codigo});  
    },

    async deletarEmprestimo(request, response){
        
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