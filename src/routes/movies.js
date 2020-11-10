var express = require('express');
const db = require('../database/models')
var router = express.Router();
const { Op } = require("sequelize");

/* GET home page. */
router.get('/', function(req, res) {
  db.Peliculas.findAll({ order: [
    ['title', 'ASC']]
  })
  .then((resultado)=>{
    let pelis = resultado
    res.render('index', { title: 'DhMovies', pelis });
  })
  
});

router.get('/new', function(req, res) {
  db.Peliculas.findAll({ 
    limit: 5,
    order: [
    ['release_date', 'DESC']]
  })
  .then((resultado)=>{
    let pelis = resultado
    res.render('lasnew', { title: 'DhMovies', pelis });
  })
  
});

router.get('/recommended', function(req, res) {
  db.Peliculas.findAll({ 
    where: {
      rating: {
        [Op.lt]: 8.0
      }
    },
    order: [
    ['release_date', 'DESC']]
  })
  .then((resultado)=>{
    let pelis = resultado
    res.render('lasnew', { title: 'DhMovies', pelis });
  })
});

router.get('/search', function(req, res) {
    res.render('search', { title: 'DhMovies'});
  });



router.post('/search', function(req, res) {
  db.Peliculas.findAll({where:{
    title : {
      [Op.like]: '%' + req.body.labusqueda + '%'
    }
  } 
  })
  .then((resultado)=>{
    let pelis = resultado
    res.render('lasnew', { title: 'DhMovies', pelis });
  })
});








router.get('/en-cartelera', function(req, res) {
  res.render('en-cartelera', { title: 'En cartelera' });
});

router.get('/mas-votadas', function(req, res) {
  res.render('mas-votadas', { title: 'Más Votadas' });
});

router.get('/sucursales', function(req, res) {
  res.render('sucursales', { title: 'Sucursales' });
});

router.get('/contacto', function(req, res) {
  res.render('contacto', { title: 'Contacto' });
});

router.get('/preguntas-frecuentes', function(req, res) {
  res.render('faq', { title: 'Preguntas Frecuentes' });
});


router.get('/detail/:id', function(req, res) {
  db.Peliculas.findByPk(req.params.id,{
    include: 
    [
        { association: 'genero'},
    ]
})
  .then((resultado)=>{
    let pelis = resultado
    console.log(pelis)
    res.render('detalle', { title: pelis.title, pelis });
  })
});

module.exports = router;
