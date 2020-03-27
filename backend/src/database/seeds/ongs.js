
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('ongs').del()
    .then(function () {
      // Inserts seed entries
      return knex('ongs').insert([
        {
          id: 1,
          key: '123abc',
          name: "APAD",
          email: "apad2@apad.com.br",
          whatsapp: "3123123123",
          city: "Rio do Sul",
          uf: "SC"
        },
      ]);
    });
};
