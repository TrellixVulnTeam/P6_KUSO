const passwordValidator = require('password-validator');
const router = require('../routes/user');

var schema = new passwordValidator();

module.exports = (req, res, next) => {
schema
.is()
.min(6) // Minimum 8 caractères
.is()
.max(20) // Maximum 20 caractères
.has()
.uppercase(1) // Le mot de passe doit avoir des majuscules
.has()
.lowercase(1) // Le mot de passe doit avoir des minuscules
.has()
.digits(2) // Le mot de passe doit avoir des chiffres
.has()
.not()
.spaces(); // Le mot de passe ne doit pas avoir d'espace
}