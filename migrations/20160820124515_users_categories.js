'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('users_categories', (table) => {
    table.increments();
    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .index();
    table.integer('category_id')
      .notNullable()
      .references('id')
      .inTable('categories')
      .onDelete('CASCADE')
      .index();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users_categories');
};
