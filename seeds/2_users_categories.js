'use strict';

/* eslint-disable camelcase */
exports.seed = function(knex) {
  return knex('users_categories').del()
    .then(() => {
      return knex('users_categories').insert([{
        id: 1,
        user_id: 1,
        category_id: 10
      },
      {
        id: 2,
        user_id: 1,
        category_id: 7
      }]);
    })
    .then(() => {
      return knex.raw(

        // eslint-disable-next-line max-len
        "SELECT setval('users_categories_id_seq', (SELECT MAX(id) FROM users_categories));"
      );
    });
};
