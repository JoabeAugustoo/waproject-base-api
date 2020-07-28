import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Demand', table => {
    table.increments('id').primary();
    table.string('name', 50).notNullable();
    table
      .integer('userId')
      .nullable()
      .unsigned()
      .references('id')
      .inTable('User')
      .onDelete('CASCADE');
    table.dateTime('createdDate').notNullable();
    table.dateTime('updatedDate').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('Demand');
}
