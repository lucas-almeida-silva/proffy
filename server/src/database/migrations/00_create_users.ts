import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.string('avatar').nullable();
    table.string('passwordResetToken').nullable();
    table.timestamp('passwordResetExpires').nullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('users');
}