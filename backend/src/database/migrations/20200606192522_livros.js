
exports.up = function(knex) {
    return knex.schema.createTable('livros', function(table) {
        table.string('idLivro').primary();
        table.string('nome');
        table.string('autor');
        table.boolean('disponivel');
    });  
};

exports.down = function(knex) {
    return knex.schema.dropTable('livros');  
};
