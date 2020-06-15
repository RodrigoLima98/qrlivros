const connection = require('../database/connection');

module.exports = {
    async logon(request, response){
        const {email, senha} = request.body;

        const usuario = await connection('usuario')
        .where('email', email)
        .where('senha', senha)
        .select('id')
        .first();
    
        if(!usuario) {
            return response.status(400).json({error: 'Usuário ou senha incorretos'})
        }

        return response.json(usuario);
    }
}