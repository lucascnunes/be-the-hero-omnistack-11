
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('ongs').del()
    .then(function () {
      // Inserts seed entries
      return knex('ongs').insert([
        {
          id: 1,
          name: "APAD",
          email: "apad@apad.com.br",
          whatsapp: "3123123123",
          city: "Rio do Sul",
          uf: "SC",
          password: "$2b$10$ws32UHsGRqiNvwW69dabU.t79kCtUvN5JvRbtMV6et9QHwc0UUbda", // 123456789
          created_at: new Date(),
          updated_at: new Date()
        },
      ]);
    });
};
