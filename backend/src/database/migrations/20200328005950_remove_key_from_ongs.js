exports.up = function(knex) {
    return knex.schema.table('ongs', (table) => {
        table.dropColumn('key');
    });
};

exports.down = function(knex) {
    return knex.schema.table('ongs', (table) => {
        table.string('key');
    });
};