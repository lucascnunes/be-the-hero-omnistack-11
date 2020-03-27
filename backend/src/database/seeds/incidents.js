
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('incidents').del()
    .then(function () {
      // Inserts seed entries
      return knex('incidents').insert([
        {
          id: 1,
          title: "Lorem ipsum dolor sit",
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus voluptatem error itaque eum assumenda cumque ullam cupiditate quod, libero veritatis id consequatur dignissimos facilis quae tenetur alias temporibus esse numquam!",
          value: 999,
          ongs_id: 1,
        },
      ]);
    });
};
