// 'use strict';

// /**
//  * book controller
//  */

// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = {
//     async customAction(ctx) {
//         try {
//             const book = await strapi.db.query("api::book:book").findMany();
//             ctx.body = {
//                 data: book,
//             };
//         } catch (err) {
//             ctx.send({ error: err.message })
//         };
//     },
//     async customCrate(ctx) {
//         try {
//             const { title, author, publisher, stock, price } = ctx.request.body;
//             const book = await strapi.db.query("api:book:book").create({
//                 data: { title, author, publisher, stock, price, publishedAt: new Date() },
//             });
//             ctx.body = {
//                 message: "create sukses",
//                 data: book,
//             };
//         } catch (err) {
//             ctx.send({ error: err.message });
//         }
//     },

//     async customUpdate(ctx){
//         try{
//             const data={...ctx.request.body};
//             const{id}=ctx.params;
//             const book=await strapi.db.query("api::book:book").update({
//                 data:data,
//                 where:{id:id},
//             });
//         if(!book){
//             ctx.status(400);
//             ctx.body={
//                 error:"buku tidak ada",
//             };
//         }
//         return;
//         }
        
//     }







// }
