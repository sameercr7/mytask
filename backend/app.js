const express = require('express');
const fs = require('fs');
const cors = require('cors'); 
const app = express();
const port = 3001;

app.use(cors()); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let storedData = JSON.parse(fs.readFileSync('static.json'));

app.get('/data', (req, res) => {
  res.json({ data: storedData });
});

app.post('/data', (req, res) => {
  const newData = req.body.data;
  storedData = newData;
  fs.writeFileSync('static.json', JSON.stringify(storedData, null, 2));

  res.json({ data: storedData });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
