const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const filePath = path.join(__dirname, 'data', 'records.json');

app.post('/api/saveRecord', (req, res) => {
  const newData = req.body;
  console.log('受け取ったデータ:', newData);

  const pad = (n) => n.toString().padStart(2, '0');
  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('/');
    return `${year}/${pad(month)}/${pad(day)}`;
  };

  const formattedDate = formatDate(newData.date);

  let existingData = [];
  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, 'utf-8');
    existingData = JSON.parse(raw);
  }

  const updatedData = [...existingData, newData];

  fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2), 'utf-8');
  console.log('保存完了:', newData);
  res.status(200).send('保存しました');
});

app.get('/api/records', (req, res) => {
  if (!fs.existsSync(filePath)) {
    return res.status(200).json([]);
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(raw);

  res.status(200).json(data);
});

app.listen(PORT, () => {
  console.log(`サーバー起動中 → http://localhost:${PORT}`);
});