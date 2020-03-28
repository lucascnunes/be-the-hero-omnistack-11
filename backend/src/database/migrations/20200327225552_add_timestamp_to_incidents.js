
exports.up = function(knex) {
    return knex.schema.table('incidents', (table) => {
        table.timestamps();
    });
};

exports.down = function(knex) {
    return knex.schema.table('incidents', (table) => {
        table.dropTimestamps();
    });
};
