const express = require('express');

const config = require('./config');

const app = express();
const { PORT } = config;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.sendStatus(200));

app.listen(PORT || 5000, () => {
  console.log(`Notification service is running on ${PORT}`);
});
