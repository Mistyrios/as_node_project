'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('boom');

module.exports = class FavoriteService extends Service {
    async create(userId, movieId) {

        const { Favorite } = this.server.models();

        const currentFavorite = await Favorite.query().findOne({ userId, movieId });
        if (currentFavorite) {
            return  Boom.badRequest('Ce film est déjà dans vos favoris');
        }

        return await Favorite.query().insertAndFetch({ userId, movieId });
    }
    getAll() {

        const { Favorite } = this.server.models();

        return Favorite.query();
    }
    async delete(userId, movieId) {

        const { Favorite } = this.server.models();

        const currentFavorite = await Favorite.query().findOne({ userId, movieId });
        if (!currentFavorite) {
            return Boom.badRequest('Ce film n\'est pas dans vos favoris');
        }

        await Favorite.query().delete().where({ userId, movieId });
        return { success: 'Le film a bien été supprimé de vos favoris' };
    }
};
