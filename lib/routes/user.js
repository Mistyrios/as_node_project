'use strict';

const Joi = require('joi');

const UserModel  = require('../models/user');

module.exports = [
    {
        method: 'post',
        path: '/user',
        options: {
            auth: false,
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    firstName: UserModel.field('firstName').required(),
                    lastName: UserModel.field('lastName').required(),
                    password: UserModel.field('password').required(),
                    mail: UserModel.field('mail').required(),
                    username: UserModel.field('username').required()
                })
            }
        },
        handler: async (request, h) => {

            const { userService } = request.services();
            return await userService.create(request.payload);
        }
    },
    {
        method: 'get',
        path: '/users',
        options: {
            auth: {
                scope: ['admin', 'user']
            },
            tags: ['api']
        },
        handler: async (request, h) => {

            const { userService } = request.services();
            return await userService.getAll();
        }
    },
    {
        method: 'get',
        path: '/user/{id}',
        options: {
            auth: {
                scope: ['admin', 'user']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: UserModel.field('id').required()
                })
            }
        },
        handler: async (request, h) => {

            const { userService } = request.services();
            return await userService.getOneById(request.params.id);
        }
    },
    {
        method: 'delete',
        path: '/user/{id}',
        options: {
            auth: {
                scope: ['admin']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: UserModel.field('id').required()
                })
            }
        },
        handler: async (request, h) => {

            const { userService } = request.services();
            await userService.delete(request.params.id);
            return '';
        }
    },
    {
        method: 'patch',
        path: '/user/{id}',
        options: {
            auth: {
                scope: ['admin']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: UserModel.field('id').required()
                }),
                payload: Joi.object({
                    firstName: UserModel.field('firstName'),
                    lastName: UserModel.field('lastName'),
                    password: UserModel.field('password'),
                    mail: UserModel.field('mail'),
                    username: UserModel.field('username'),
                    scope: UserModel.field('scope')
                })
            }
        },
        handler: async (request, h) => {

            const { userService } = request.services();
            return await userService.update(request.params.id, request.payload);
        }
    },
    {
        method: 'post',
        path: '/user/login',
        options: {
            auth: false,
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    mail: UserModel.field('mail').required(),
                    password: UserModel.field('password').required()
                })
            }
        },
        handler: async (request, h) => {

            const { userService } = request.services();
            return await userService.login(request.payload);
        }
    }
];

