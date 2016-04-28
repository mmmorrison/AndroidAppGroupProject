exports.up = function(knex, Promise) {
  return knex.schema.createTable('photoSet', function(table){
    table.increments();
    table.string('description');
    table.integer('votes');
    table.integer('decision_id');
    table.boolean('winner')
    table.string('photoURL')
    table.string('title')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('photoSet');
};

// heroku pg:reset postgresql-aerodynamic-70249 --confirm thisorthatdb
// heroku pg:reset [heroku db name] -- confirm [app name]
// heroku pg:push ThisOrThat postgresql-aerodynamic-70249 --app thisorthatdb
// heroku pg:push [local db name] [heorku db name] --app [app name]
// https://thisorthatdb.herokuapp.com/new
