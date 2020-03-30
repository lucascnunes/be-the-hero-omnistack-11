
exports.up = function(knex) {
  return knex.schema.createTable('incidents', (table) => {
    table.increments();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();
    table.integer('ongs_id').unsigned();
    table.foreign('ongs_id').references('id').inTable('ongs');
    table.timestamps();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('incidents');
};
