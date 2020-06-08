const connection = require('../database/connection');

module.exports = {
    async criarCadastro(request, response){
        const {nomeBiblioteca, email, senha} = request.body;

        await connection('usuario').insert({
            nomeBiblioteca,
            email,
            senha,
        })

        return response.json({
            nomeBiblioteca,
            email,
            senha
        });
    }
}