
exports.up = function(knex) {
  return knex.schema.createTable('ongs', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
    table.string('password').notNullable();
    table.timestamps();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('ongs');
};
