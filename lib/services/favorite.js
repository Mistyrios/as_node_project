'use strict';

const {Service} = require('@hapipal/schmervice');
const Boom = require('boom');

module.exports = class FavoriteService extends Service {
    async create(userId, movieId) {

        const {Favorite} = this.server.models();

        const currentFavorite = await Favorite.query().findOne({userId, movieId});
        if (currentFavorite) {
            return Boom.badRequest('This movie is already in your favorites');
        }

        return await Favorite.query().insertAndFetch({userId, movieId});
    }

    getAll() {

        const {Favorite} = this.server.models();

        return Favorite.query();
    }

    async delete(userId, movieId) {

        const {Favorite} = this.server.models();

        const currentFavorite = await Favorite.query().findOne({userId, movieId});
        if (!currentFavorite) {
            return Boom.badRequest('This movie is not in your favorites');
        }

        await Favorite.query().delete().where({userId, movieId});
        return {success: 'This movie has been removed from your favorites'};
    }

    getByMovieId(movieId) {

        const {Favorite} = this.server.models();
        return Favorite.query().where({movieId});
    }

    deleteByMovieId(movieId) {

        const {Favorite} = this.server.models();
        return Favorite.query().delete().where({ movieId });
    }

    deleteByUserId(userId) {

        const { Favorite } = this.server.models();
        return Favorite.query().delete().where({ userId });
    }
};
