var express = require('express');
const db = require('../database/models')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
 res.render('preindex',{title:'DhMovies'})});

module.exports = router;
