const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1964121",
  key: "4ab0a5b2186b6c48de02",
  secret: "54ffa9959b74031e79b4",
  cluster: "ap1",
  useTLS: true
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { nama, pesan } = req.body;
    try {
      await pusher.trigger("my-channel", "my-event", { nama, pesan });
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}