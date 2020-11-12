
module.exports = (sequelize, dataTypes) =>{

let alias =  'ActoresPeliculas';

let cols ={
    id:{
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    actor_id:{
        type: dataTypes.STRING
    },
    movie_id:{
        type: dataTypes.STRING
    }
}
    let config = {
    tableName: 'actor_movie',
    // timestamps: false
}


const ActorPelicula = sequelize.define(alias,cols,config);

ActorPelicula.associate = function(models){
    ActorPelicula.belongsTo(models.Peliculas,{
      as: 'pelicula',
      foreignKey: 'movie_id',
    }),
    ActorPelicula.belongsTo(models.Actores,{
        as: 'actor',
        foreignKey: 'actor_id',
      })
}

return ActorPelicula

}