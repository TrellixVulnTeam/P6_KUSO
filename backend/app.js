const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');

const Sauce = require('./models/Sauce');

const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

mongoose.connect('mongodb+srv://Adrien:Sbteam0109@p6.caw9v.gcp.mongodb.net/P6?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use (helmet());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use('/images', express.static(path.join(__dirname, 'images')));

  app.use("/api/sauces", sauceRoutes);
  app.use('/api/auth', userRoutes);
  

module.exports = app;