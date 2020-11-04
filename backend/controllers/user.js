
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passwordValidator = require('password-validator')
const User = require('../models/User');



//fonction s'inscrire
exports.signup = (req, res, next) => {
  if (!schema.validate(req.body.password)) {
    //Test du format du mot de passe
    return res.status(400).json({ error: "Merci de bien vouloir entrer un mot de passe valide !" });
    console.log(error);
  } else if (schema.validate(req.body.password)) {
    bcrypt
      .hash(req.body.password, 10) //Salage du mot de passe à 10 reprises
      .then((hash) => {
        const user = new User({
          email: req.body.email,
          password: hash,
        });
        user
          .save()
          .then(() => res.status(201).json({ message: "Utilisateur créé!" }))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  }
};

//Connection à un compte existant
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }
      bcrypt
        .compare(req.body.password, user.password) //compare le password soumis avec le password de la base de données
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", { //TOKEN de 24h qui est généré
              expiresIn: "12h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};