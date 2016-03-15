exports.up = function(knex, Promise) {
  return knex.schema.createTable('photoSet', function(table){
    table.increments();
    table.string('description');
    table.integer('votes');
    table.integer('decision_id');
    table.boolean('winner')
    table.string('photoURL')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('photoSet');
};
