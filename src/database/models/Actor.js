
module.exports = (sequelize, dataTypes) =>{

let alias =  'Actores';

let cols ={
    id:{
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    first_name:{
        type: dataTypes.STRING
    },
    last_name:{
        type: dataTypes.STRING
    },
    rating:{
        type: dataTypes.FLOAT
    },
    favorite_movie_id:{
        type: dataTypes.INTEGER
    },
}
    let config = {
    tableName: 'actors',
    // timestamps: false
}


const Actor = sequelize.define(alias,cols,config);

Actor.associate = function(models){
    Actor.belongsTo(models.Peliculas,{
      as: 'peliFavorita',
      foreignKey: 'favorite_movie_id',
    })
    Actor.belongsToMany(models.Peliculas,{
        as: 'actorPelicula',
        through: "ActoresPeliculas",
        foreignKey: 'actor_id',
        other: 'movie_id',
        timestamps: false
      })
}

return Actor

}