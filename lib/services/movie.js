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
    delete(id) {

        const { Movie } = this.server.models();

        return Movie.query().deleteById(id);
    }
    async update(id, movie) {

        const {Movie} = this.server.models();
        const {mailerService} = this.server.services();
        const movieToUpdate = Movie.query().patchAndFetchById(id, movie);
        if (movieToUpdate) {
            await mailerService.sendUpdateMovieEmail(movieToUpdate.title, movieToUpdate.id);
        }

        return movieToUpdate;
    }
};
