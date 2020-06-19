
exports.up = function(knex) {
    return knex.schema.createTable('emprestimo', function(table) {
        table.string('codigo').primary();
        table.string('rg_estudante').notNullable();
        table.string('id_livro').notNullable();
        table.date('dataDevolucao').notNullable();
        table.date('dataEmprestimo').notNullable();
        table.boolean('finalizado').notNullable();
        table.boolean('atraso').notNullable();

        table.foreign('rg_estudante').references('rg').inTable('estudante');
        table.foreign('id_livro').references('idLivro').inTable('livros');

    });
  
};

exports.down = function(knex) {
  return knex.schema.dropTable('emprestimo');
};
