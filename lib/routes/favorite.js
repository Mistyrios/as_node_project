'use strict';

const Joi = require('joi');

const FavoriteModel = require('../models/favorite');

module.exports = [
    {
        method: 'post',
        path: '/favorite',
        options: {
            auth: {
                scope: ['admin', 'user']
            },
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    movieId: FavoriteModel.field('movieId').required()
                })
            }
        },
        handler: async (request, h) => {
            const { favoriteService } = request.services();

            return await favoriteService.create(request.auth.credentials.id, request.payload.movieId);
        }
    },
    {
        method: 'get',
        path: '/favorites',
        options: {
            auth: {
                scope: ['admin', 'user']
            },
            tags: ['api']
        },
        handler: async (request, h) => {

            const { favoriteService } = request.services();

            return await favoriteService.getAll();
        }
    },
    {
        method: 'delete',
        path: '/favorite/{movieId}',
        options: {
            auth: {
                scope: ['admin']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    movieId: FavoriteModel.field('movieId').required()
                })
            }
        },
        handler: async (request, h) => {

            const { favoriteService } = request.services();
            return await favoriteService.delete(request.auth.credentials.id, request.params.movieId);
        }
    }
];

