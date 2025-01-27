const express = require('express');
const app = express();
const { MongoClient, ObjectId } = require('mongodb'); 

const puerto = 3000;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// users routes
app.get('/', (req, res) => {
  res.send('API running');
});


app.get('/users', (req, res) => {
  res.send('API get response');
});

app.post('/users', (req, res) => {
  res.send('API post response');
});

app.put('/users', (req, res) => {
  res.send('API put response');
}); 

app.delete('/users', (req, res) => {
  res.send('API delete response');
});

app.listen(puerto, () => {
  console.log('Servidor escuchando en http://localhost:' + puerto);
});
