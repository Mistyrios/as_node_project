'use strict';

const { Service } = require('@hapipal/schmervice');
const Hasher = require('@mistyrios/iut-encrypt');
const Jwt = require('@hapi/jwt');
const Boom = require('boom');

module.exports = class UserService extends Service {
    async create(user) {

        const { User } = this.server.models();
        const { mailerService } = this.server.services();

        user.password = Hasher.encryptPassword(user.password);

        const newUser = await User.query().insertAndFetch(user);
        if (newUser) {
            await mailerService.sendWelcomeEmail(newUser.mail, newUser.firstName + ' ' + newUser.lastName);
        }

        return newUser;
    }
    getAll() {

        const { User } = this.server.models();
        return User.query();
    }
    getOneById(id) {

        const { User } = this.server.models();
        return User.query().findById(id);
    }
    async delete(id) {

        const { User } = this.server.models();
        const { favoriteService } = this.server.services();
        await favoriteService.deleteByUserId(id);
        return await User.query().deleteById(id);
    }
    update(id, user) {

        const { User } = this.server.models();
        return User.query().patchAndFetchById(id, user);
    }
    async login(user) {

        const { User } = this.server.models();
        const findUser = await User.query().findOne({ mail: user.mail });
        if (findUser) {
            if (Hasher.comparePassword(user.password, findUser.password)) {
                return Jwt.token.generate(
                    {
                        aud: 'urn:audience:iut',
                        iss: 'urn:issuer:iut',
                        id: findUser.id,
                        firstName: findUser.firstName,
                        lastName: findUser.lastName,
                        email: findUser.mail,
                        scope: findUser.scope
                    },
                    {
                        key: 'as_jwt_key',
                        algorithm: 'HS512'
                    },
                    {
                        ttlSec: 14400
                    }
                );
            }
        }

        return Boom.unauthorized('Invalid email or password');
    }
};
