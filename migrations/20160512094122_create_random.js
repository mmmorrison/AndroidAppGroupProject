exports.up = function(knex, Promise) {
  return knex.schema.createTable('random', function(table){
    table.increments();
    table.integer('user_id');
    table.integer('photoSet_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('random');
};
