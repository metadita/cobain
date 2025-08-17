import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export default async function handler(req, res) {
  try {
    // Ambil nilai awal
    let nilai = await redis.get('nilai_awal');
    if (nilai === null) {
      nilai = 10000; // default kalau belum ada
      await redis.set('nilai_awal', nilai);
    }

    res.status(200).json({ nilai_awal: nilai });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal memuat nilai' });
  }
  }
