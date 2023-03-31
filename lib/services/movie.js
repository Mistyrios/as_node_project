'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class MovieService extends Service {
    async create(movie) {

        const { Movie } = this.server.models();
        const { mailerService } = this.server.services();
        const newMovie = await Movie.query().insertAndFetch(movie);
        if (newMovie) {
            await mailerService.sendNewMovieEmail(newMovie.title);
        }

        return newMovie;
    }
    getAll() {

        const { Movie } = this.server.models();
        return Movie.query();
    }
    getOneById(id) {

        const { Movie } = this.server.models();
        return Movie.query().findById(id);
    }
    async delete(id) {

        const { Movie } = this.server.models();
        const { favoriteService } = this.server.services();
        await favoriteService.deleteByMovieId(id);
        return await Movie.query().deleteById(id);
    }
    async update(id, movie) {

        const { Movie } = this.server.models();
        const { mailerService } = this.server.services();
        const updatedMovie = await Movie.query().patchAndFetchById(id, movie);
        if (updatedMovie) {
            await mailerService.sendUpdateMovieEmail(updatedMovie.title, id);
        }

        return updatedMovie;
    }
};
