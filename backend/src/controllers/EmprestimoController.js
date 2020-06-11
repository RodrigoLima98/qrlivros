const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

    async index(request, response){
        const emprestimo = await connection('emprestimo').select('*');

        return response.json(emprestimo);
    },

    async novoEmprestimo(request, response){

        const {id_estudante, id_livro} = request.body;

        const dataEmprestimo = dataAtual();
        const dataDevolucao = somarDataAtual(7);

        const finalizado = false;
        const atraso = false;

        const codigo = crypto.randomBytes(10).toString('HEX');

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