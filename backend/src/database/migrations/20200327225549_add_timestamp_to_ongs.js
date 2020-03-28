
exports.up = function(knex) {
    return knex.schema.table('ongs', (table) => {
        table.timestamps();
    });
};

exports.down = function(knex) {
    return knex.schema.table('ongs', (table) => {
        table.dropTimestamps();
    });
};
