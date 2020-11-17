const db = require('../database/models')
const moment = require('moment')
const { Op } = require("sequelize");

module.exports = {
    index: async (req,res) =>{
        try{
            const pelis =  await db.Peliculas.findAll({ 
            where: {
              deleted_at:{
                [Op.is]:null
              }
            },
             order: [
            ['title', 'ASC']]
          })
          res.render('index', { title: 'DhMovies', pelis });

        } catch(error){
            console.log(error)
        }

    },
    new: async (req, res) => {
       const pelis = await db.Peliculas.findAll({  where: {
          deleted_at:{
          [Op.is]:null
          }
        },
          limit: 5,
          order: [
          ['release_date', 'DESC']]
        })
          res.render('lasnew', { title: 'DhMovies', pelis });
        },
    recomend: async (req, res)=>{
        const pelis = await db.Peliculas.findAll({ 
          where: { 
            deleted_at:{
              [Op.is]:null
            },
            rating: {
              [Op.lt]: 8.0
            }
          },
          order: [
          ['release_date', 'DESC']]
        })
          res.render('lasnew', { title: 'DhMovies', pelis });
      },
      search: async(req, res) => {
        res.render('search', { title: 'DhMovies'});
      },
      showsearch: async (req, res) => {
        const pelis = await db.Peliculas.findAll({where:{
          title : {
            [Op.like]: '%' + req.body.labusqueda + '%'
          }
        } 
        })
          res.render('lasnew', { title: 'DhMovies', pelis });
      },
      detalle: async (req, res) =>{
        const pelis = await db.Peliculas.findByPk(req.params.id,{
          include: 
          [
              { association: 'genero'},
              { association: "actorPelicula"}
          ]
      })
      res.render('detalle', { title: pelis.title, pelis })
    },
    create: async (req,res) =>{
        const generos = await db.Generos.findAll()
        const actores = await db.Actores.findAll()
        res.render('crear', {generos, actores, title: "crear peli"})

    },

    store: async (req,res) =>{
        const nuevaPeli = await db.Peliculas.create(req.body)
        await nuevaPeli.addActorPelicula(req.body.actores)
        res.redirect('/')
    },

    update : async (req, res) =>{      
      try {
        let actores = await db.Actores.findAll()
        let generos = await db.Generos.findAll()
        let peli = await db.Peliculas.findByPk(req.params.id,{
          include: 
          [
              { association: 'genero'},
              { association: "actorPelicula"}

          ]
      })
        peli = peli.dataValues
        peli.release_date = moment(peli.release_date).format('YYYY-MM-DD')
        console.log(peli.release_date)
        res.render('editar', { title: 'Formulario edicion', peli, generos, actores })
    } catch (error) {
        console.log(error);
    }       
    },

    change : async (req,res) =>{
      const peliCambiada = await db.Peliculas.findByPk(req.params.id, {include: [ 'actorPelicula', 'genero' ]})
      await peliCambiada.removeActorPelicula(peliCambiada.actorPelicula)
      await peliCambiada.addActorPelicula(req.body.actores)
      await peliCambiada.update(req.body)
      res.redirect('/')
    },
    delete : async(req,res) =>{
      const peliaBorrar = await db.Peliculas.findByPk(req.params.id,{
        include: 
        [
            { association: 'genero'},
            { association: "actorPelicula"}
        ]
    })
      await peliaBorrar.removeActorPelicula(peliaBorrar.actorPelicula)
      await peliaBorrar.update({deleted_at: moment().format()})
      res.redirect('/')
    }
  
}