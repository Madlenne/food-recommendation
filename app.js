require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const Neo4jApi = require('./neo4j-api');


const app = express();
const db = new Neo4jApi();
const port = process.env.PORT;

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  db.getNodes()
    .then(({ dishNodes, restaurantNodes }) => {
      const nodes = dishNodes.map((dishNode, index) => ({ ...dishNode, originSelect: restaurantNodes[index].originSelect }));

      res.render('./home.pug', { nodes });
    })
    .catch(error => res.status(500).send(error));
});

app.post('/dish', (req, res) => {
  const name = req.body.name;
  const originSelect = req.body.originSelect;
  const recommended = req.body.recommended;
  db.createDish(name, originSelect, recommended)
    .then(() => res.redirect('/'))
    .catch(error => res.status(500).send(error));
});

app.post('/restaurant', (req, res) => {
  const restaurant = req.body.restaurant;
  db.createRestaurant(restaurant)
    .then(() => res.redirect('/'))
    .catch(error => res.status(500).send(error));
});

app.post('/clear', (req, res) => {
  db.clearNodes()
    .then(() => res.redirect('/'))
    .catch(error => res.status(500).send(error));
});

app.listen(port,
  () => console.log(`Server listening on http://localhost:${port}`));
