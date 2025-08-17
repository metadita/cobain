import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const filePath = path.join(process.cwd(), 'data', 'nilais.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    let data = JSON.parse(raw);

    const randomKurang = Math.floor(Math.random() * 100) + 1;
    data.nilai_awal -= randomKurang;

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return res.status(200).json({ nilai_awal: data.nilai_awal, randomKurang });
  } catch (err) {
    console.error("API /api/kurangi error:", err);
    return res.status(500).json({ error: "Gagal memproses nilai" });
  }
}
