
exports.up = function(knex) {
    return knex.schema.createTable('usuario', function(table) {
        table.string('nomeBiblioteca').notNullable();
        table.string('email').notNullable();
        table.string('senha').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('usuario');   
};
