'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('categories', (table) => {
    table.increments();
    table.string('name').notNullable().defaultTo('');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('categories');
};
