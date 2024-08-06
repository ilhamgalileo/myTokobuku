'use strict';

/**
 * cart router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports =  {
    routes: [
      {
        method: "POST",
        path: "/book/:bookId/carts",
        handler: "cart.createCart",
      },
      {
        method: "GET",
        path: "/carts",
        handler: "cart.findCart",
      },
    ],
  };