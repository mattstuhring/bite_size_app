'use strict';

exports.seed = function(knex) {
  return knex('categories').del()
    .then(() => {
      return knex('categories').insert([{
        id: 1,
        name: 'Asian Fusion'
      },
      {
        id: 2,
        name: 'Barbeque'
      },
      {
        id: 3,
        name: 'Burgers'
      },
      {
        id: 4,
        name: 'Cajun/Creole'
      },
      {
        id: 5,
        name: 'Caribbean'
      },
      {
        id: 6,
        name: 'Chinese'
      },
      {
        id: 7,
        name: 'Delis'
      },
      {
        id: 8,
        name: 'Diners'
      },
      {
        id: 9,
        name: 'Fast Food'
      },
      {
        id: 10,
        name: 'Gastropub'
      },
      {
        id: 11,
        name: 'Italian'
      },
      {
        id: 12,
        name: 'Japanese'
      },
      {
        id: 13,
        name: 'Korean'
      },
      {
        id: 14,
        name: 'Latin American'
      },
      {
        id: 15,
        name: 'Mediterranean'
      },
      {
        id: 16,
        name: 'Mexican'
      },
      {
        id: 17,
        name: 'Middle Eastern'
      },
      {
        id: 18,
        name: 'Pizza'
      },
      {
        id: 19,
        name: 'Sandwiches'
      },
      {
        id: 20,
        name: 'Seafood'
      },
      {
        id: 21,
        name: 'Southern'
      },
      {
        id: 22,
        name: 'Spanish'
      },
      {
        id: 23,
        name: 'Thai'
      },
      {
        id: 24,
        name: 'Vietnamese'
      }
    ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('categories_id_seq', (SELECT MAX(id) FROM categories));"
      );
    });
};
