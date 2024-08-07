'use strict';

module.exports = {
  async addItem(ctx) {
    try {
      // Ambil data dari request body
      const { data } = ctx.request.body; // Data berisi array item yang ingin ditambahkan

      const dataResponse = []; // Array untuk menampung hasil setiap iterasi

      for (const item of data) {
        // Mendapatkan buku berdasarkan bookId
        const bookRecord = await strapi.db.query("api::book.book").findOne({ where: { id: item.bookId } });

        // Periksa apakah buku dengan ID yang diberikan ditemukan
        if (!bookRecord) {
          dataResponse.push({ error: `Buku dengan ID ${item.bookId} tidak ditemukan` });
          continue; // Lanjutkan ke iterasi berikutnya jika buku tidak ditemukan
        }

        // Periksa apakah stok buku mencukupi
        if (bookRecord.stock < item.qty) {
          dataResponse.push({ error: `Stok untuk buku ${bookRecord.name} tidak mencukupi` });
          continue; // Lanjutkan ke iterasi berikutnya jika stok tidak mencukupi
        }

        // Menambahkan item ke keranjang (cart)
        const addCart = await strapi.db.query("api::cart.cart").create({
          data: {
            pembeli: ctx.state.user.id, // Mengambil cart berdasarkan user jika ada
            book: item.bookId,          // Menggunakan relasi bookId
            quantity: item.qty,
            publishedAt: new Date(),
          },
        });

        // Menambahkan hasil operasi berhasil ke dataResponse
        dataResponse.push({
          message: `Item ${bookRecord.name} berhasil ditambahkan ke keranjang.`,
          item: addCart,
        });

        // Update stok buku
        await strapi.db.query("api::book.book").update({
          where: {
            id: bookRecord.id,
          },
          data: {
            stock: bookRecord.stock - item.qty,
          },
        });
      }

      // Kirim respons dengan hasil operasi
      ctx.status = 200;
      ctx.body = {
        message: 'Operasi selesai. Berikut adalah hasil dari setiap item:',
        data: dataResponse,
      };
    } catch (err) {
      // Tangani kesalahan yang mungkin terjadi selama operasi
      ctx.status = 500;
      ctx.body = {
        error: `Terjadi kesalahan saat menambahkan item ke keranjang: ${err.message}`,
      };
    }
  },
};
