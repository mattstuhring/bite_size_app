'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('email').unique().notNullable().defaultTo('');
    table.specificType('hashed_password', 'char(60)').notNullable();
    table.integer('search_radius').notNullable().defaultTo(2);
    table.integer('min_rating').notNullable().defaultTo(1);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
