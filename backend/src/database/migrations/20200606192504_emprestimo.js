
exports.up = function(knex) {
    return knex.schema.createTable('emprestimo', function(table) {
        table.string('codigo').primary();
        table.string('id_estudante').references('idEstudante').inTable('estudante');
        table.string('id_livro').references('idLivro').inTable('livros');
        table.date('dataDevolucao').notNullable();
        table.date('dataEmprestimo').notNullable();
        table.boolean('finalizado');
        table.boolean('atraso');
    });
  
};

exports.down = function(knex) {
  return knex.schema.dropTable('emprestimo');
};
