const Pusher = require("pusher");

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true
});

exports.handler = async (event) => {
  // Cek kalau ada yang iseng akses bukan pakai POST
  if (event.httpMethod !== "POST") {
    return { 
      statusCode: 405, 
      body: "Method Gak Boleh!" 
    };
  }

  try {
    // Di Netlify, data chat ada di dalam event.body
    const { nama, pesan } = JSON.parse(event.body);

    // Kirim perintah ke Pusher buat sebarin pesan
    await pusher.trigger("my-channel", "my-event", {
      nama: nama,
      pesan: pesan
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ status: "Pesan Terkirim!" })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};