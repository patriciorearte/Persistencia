'use strict';
module.exports = (sequelize, DataTypes) => {
  const usuario = sequelize.define('usuario', {
    nombre:{ 
      type:DataTypes.STRING,
      validate:{is:["^[a-z ]+$",'i']}
  },
    apellido:{
      type:DataTypes.STRING,
      validate:{is:["^[a-z ]+$",'i']}
    } ,
    email:{
      type:DataTypes.STRING,
      validate:{isEmail:true}
    },
    fecha_nacimiento: {
      type: DataTypes.DATE,
      validate: {
        isDate: true  
      }
    },
    dni: DataTypes.NUMERIC,
    contrasenia: DataTypes.NUMERIC,
    token: DataTypes.STRING
  }, {});
  usuario.associate = function(models) {
    // associations can be defined here
  };
  return usuario;
};