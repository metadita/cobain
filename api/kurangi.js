import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export default async function handler(req, res) {
  try {
    let nilai = await redis.get('nilai_awal');
    if (nilai === null) nilai = 10000;

    const randomKurang = Math.floor(Math.random() * 100) + 1;
    nilai = Math.max(0, nilai - randomKurang); // jangan sampai minus

    await redis.set('nilai_awal', nilai);

    res.status(200).json({ nilai_awal: nilai, randomKurang });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal memproses nilai' });
  }
}
