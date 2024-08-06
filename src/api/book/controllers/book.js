'use strict';

/**
 * book controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = {
    async customAction(ctx) {
        try {
            const books = await strapi.db.query("api::book.book").findMany();
            ctx.body = {
                data: books,
            };
        } catch (err) {
            ctx.body = { error: err.message };
            ctx.status = 500; // Set the status code to 500 to indicate a server error
        }
    },

    async customCreate(ctx) {
        try {
            const { title, author, publisher, stock, price } = ctx.request.body;
            const book = await strapi.db.query("api::book.book").create({
                data: { title, author, publisher, stock, price, publishedAt: new Date() },
            });
            ctx.body = {
                message: "Create sukses",
                data: book,
            };
            ctx.status = 201; // Set the status code to 201 to indicate resource creation
        } catch (err) {
            ctx.body = { error: err.message };
            ctx.status = 400; // Set the status code to 400 to indicate a client error
        }
    },

    async customUpdate(ctx) {
        try {
            const data = { ...ctx.request.body };
            const { id } = ctx.params;
            const book = await strapi.db.query("api::book.book").update({
                data: data,
                where: { id: id },
            });
            if (!book) {
                ctx.status = 404; // Set the status code to 404 if the book is not found
                ctx.body = {
                    error: "Buku tidak ada",
                };
                return;
            }
            ctx.body = {
                message: "Update berhasil",
                data: book,
            };
            ctx.status = 200; // Set the status code to 200 to indicate success
        } catch (err) {
            ctx.body = { error: err.message };
            ctx.status = 400; // Set the status code to 400 to indicate a client error
        }
    },

    async customDelete(ctx) {
        try {
            const { id } = ctx.params;
            const book = await strapi.db.query("api::book.book").delete({
                where: {
                    id: id,
                },
            });
            if (!book) {
                ctx.status = 404; // Set the status code to 404 if the book is not found
                ctx.body = {
                    error: 'Buku tidak ada',
                };
                return;
            }
            ctx.body = {
                message: "Delete berhasil",
            };
            ctx.status = 200; // Set the status code to 200 to indicate success
        } catch (error) {
            ctx.body = { error: error.message };
            ctx.status = 400; // Set the status code to 400 to indicate a client error
        }
    },
};
