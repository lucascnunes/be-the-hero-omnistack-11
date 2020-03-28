
exports.up = function(knex) {
    return knex.schema.table('ongs', (table) => {
        table.string('password');
    });
};

exports.down = function(knex) {
    return knex.schema.table('ongs', (table) => {
        table.dropColumn('password');
    });
};
