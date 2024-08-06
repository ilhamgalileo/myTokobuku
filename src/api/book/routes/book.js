'use strict';

/**
 * book router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = {
    routes: [
      {
        method: "GET",
        path: "/books",
        handler: "book.customAction",
        config: {
          policies: [],
        },
      },
      {
        method: "POST",
        path: "/books",
        handler: "book.customCreate",
        config: {
          policies: [],
        },
      },
      {
        method: "DELETE",
        path: "/books/:id",
        handler: "book.customDelete",
      },
      {
        method: "PATCH",
        path: "/books/:id",
        handler: "book.customUpdate",
      },
    ],
  };

