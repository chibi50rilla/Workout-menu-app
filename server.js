const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');s

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const filePath = path.join(__dirname, 'data', 'records.json');

app.post('/api/saveRecord', (req, res) => {
  const newData = req.body;
  console.log('受け取ったデータ:', newData);

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

app.listen(PORT, () => {
  console.log(`サーバー起動中 → http://localhost:${PORT}`);
});