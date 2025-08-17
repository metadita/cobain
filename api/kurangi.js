import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'api', 'nilai.json');
  let data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const randomKurang = Math.floor(Math.random() * 100) + 1;
  data.nilai_awal -= randomKurang;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.status(200).json({ nilai_awal: data.nilai_awal, randomKurang });
}
