
module.exports = (sequelize, dataTypes) =>{

let alias =  'Peliculas';

let cols ={
    id:{
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title:{
        type: dataTypes.STRING
    },
    rating:{
        type: dataTypes.FLOAT
    },
    awards:{
        type: dataTypes.INTEGER
    },
    release_date:{
        type: dataTypes.DATE
    },
    length:{
        type: dataTypes.DATE
    },
    genre_id:{
        type: dataTypes.INTEGER
    }
}
    let config = {
    tableName: 'movies',
    // timestamps: false
}


const Pelicula = sequelize.define(alias,cols,config);

Pelicula.associate = function(models){
    Pelicula.belongsTo(models.Generos,{
      as: 'genero',
      foreignKey: 'genre_id',
    }),
    Pelicula.hasMany(models.Actores,{
        as: 'peliFavorita',
        foreignKey: 'id',
      })
    Pelicula.belongsToMany(models.Actores,{
        as: 'actorPelicula',
        through: "ActoresPeliculas",
        foreignKey: 'movie_id',
        other: 'actor_id',
        timestamps: false
      })
}



return Pelicula

}