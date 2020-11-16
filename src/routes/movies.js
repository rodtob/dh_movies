var express = require('express');
const db = require('../database/models')
var router = express.Router();
const { Op } = require("sequelize");
const movieController = require('../controllers/movieController')

router.get('/', movieController.index);

router.get('/new', movieController.new);

router.get('/recommended', movieController.recomend);

router.get('/search', movieController.search);

router.post('/search', movieController.showsearch);

router.get('/detail/:id', movieController.detalle)

router.get('/create', movieController.create)

router.post('/create', movieController.store)

router.get('/edit/:id', movieController.update)

router.put('/edit/:id', movieController.change)

router.delete('/delete/:id', movieController.delete)


module.exports = router;
