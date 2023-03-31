'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.alterTable('user', (table) => {

            table.string('scope').notNull().defaultTo('user');
        });
    },

    async down(knex) {

        await knex.schema.dropColumn('scope');
    }
};
