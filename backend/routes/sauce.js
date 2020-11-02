const express = require("express"); //importation d' Express
const router = express.Router(); //Importation du router Express

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const sauceCtrl = require("../controllers/sauce"); //Importation du controleur de sauce

router.get('/',auth, sauceCtrl.getAllSauces);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id',auth, sauceCtrl.deleteSauce);
router.post("/:id/like", auth, multer, sauceCtrl.likeSauce);


module.exports = router;
