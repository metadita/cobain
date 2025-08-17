import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const filePath = path.join(process.cwd(), 'data', 'nilais.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw);

    res.status(200).json(data);
  } catch (err) {
    console.error("API /api/data error:", err);
    res.status(500).json({ error: "Gagal membaca nilai" });
  }
}
