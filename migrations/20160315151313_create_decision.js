exports.up = function(knex, Promise) {
  return knex.schema.createTable('decision', function(table){
    table.increments();
    table.integer('user_id');
    table.string('title');
    table.string('category');
    table.integer('voteA');
    table.integer('voteB');
    table.boolean('winnerA');
    table.boolean('winnerB');
    table.string('picA');
    table.string('picB');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('decision');
};
