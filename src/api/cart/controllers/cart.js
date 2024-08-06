'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = {
  async findCart(ctx) {
    try {
      const carts = await strapi.db.query('api::cart.cart').findMany();
      ctx.body = {
        data: carts,
      };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Keranjang tidak ditemukan' };
    }
  },

  async createCart(ctx) {
    try {
      const { cust,bookId,stok } = ctx.request.body;
      const book = await strapi.db.query('api::book.book').findOne({
        where: { id: bookId },
      });

      if (!book) {
        ctx.status = 400;
        ctx.body = {
          error: 'Book tidak tersedia',
        };
        return;
      }

      const cart = await strapi.db.query('api::cart.cart').create({
        data: {cust,stok,bookId},
      });

      ctx.status = 201;
      ctx.body = {
        message: 'Create successfully',
        data: cart,
      };
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        error: 'Create gagal',
      };
    }
  },
};
