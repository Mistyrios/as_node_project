'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.alterTable('user', (table) => {

            table.string('password').notNull();
            table.string('mail').notNull().unique();
            table.string('username').notNull();
        });
    },

    async down(knex) {

        await knex.schema.dropColumns('password', 'mail', 'username');
    }
};
