const express = require('express');
const router = express.Router();

const bouncer = require ("express-bouncer")(120, 7200, 3);

const userCtrl = require('../controllers/user');

//appel des fonctions se connecter et s'enregistrer
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;