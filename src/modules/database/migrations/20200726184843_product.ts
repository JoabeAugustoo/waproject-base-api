import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Product', table => {
    table.increments('id').primary();
    table.string('name', 50).notNullable();
    table.integer('amount').notNullable();
    table.float('value').notNullable();

    table
      .integer('demandId')
      .nullable()
      .unsigned()
      .references('id')
      .inTable('Demand')
      .onDelete('CASCADE');

    table.dateTime('createdDate').notNullable();
    table.dateTime('updatedDate').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('Product');
}
