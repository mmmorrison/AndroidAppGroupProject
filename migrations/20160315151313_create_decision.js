exports.up = function(knex, Promise) {
  return knex.schema.createTable('decision', function(table){
    table.increments();
    table.integer('user_id');
    table.string('title');
    table.string('category');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('decision');
};
