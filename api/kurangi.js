import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    let nilai = await redis.get("nilai_awal");
    if (nilai === null) nilai = 10000;

    const randomKurang = Math.floor(Math.random() * 100) + 1;
    nilai = parseInt(nilai) - randomKurang;

    await redis.set("nilai_awal", nilai);

    res.status(200).json({ nilai_awal: nilai, randomKurang });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal memproses nilai" });
  }
}
