const express = require('express');

const config = require('./config');
const postHandler = require('./handlers/post');
const putHandler = require('./handlers/put');
const deleteHandler = require('./handlers/delete');

const app = express();
const { PORT } = config;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.sendStatus(200));

app.post('/notifications', postHandler);
app.put('/notifications/:id', putHandler);
app.delete('/notifications/:id', deleteHandler);

app.listen(PORT, () => {
  console.log(`Notification service is running on ${PORT}`);
});
