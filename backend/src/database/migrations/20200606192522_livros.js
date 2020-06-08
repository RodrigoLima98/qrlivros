
exports.up = function(knex) {
    return knex.schema.createTable('livros', function(table) {
        table.string('idLivro').primary();
        table.string('nome').notNullable();
        table.string('autor').notNullable();
        table.string('genero').notNullable();
        table.boolean('disponivel').notNullable();
    });  
};

exports.down = function(knex) {
    return knex.schema.dropTable('livros');  
};
