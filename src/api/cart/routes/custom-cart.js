'use strict';

/**
 * cart router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = {
          method: 'POST',
      path: '/cart/add-item',
      handler: 'cart.addItem',
      },
      {
        method: "GET",
        path: "/carts",
        handler: "cart.bookRecord",
      }
    