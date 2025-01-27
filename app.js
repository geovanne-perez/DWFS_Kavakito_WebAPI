const express = require('express');
const app = express();
require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb'); 

const port = process.env.PORT || 3000;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Call Routes
const userRoutes = require('./routes/user.routes');
const apiRoutes = require('./routes/api.routes'); 

(async () => {
  app.use('/api', apiRoutes);
  app.use('/api', userRoutes);
})();


app.listen(port, () => {
  console.log('Server running at http://localhost:' + port);
});
