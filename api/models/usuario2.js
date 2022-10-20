'use strict';
module.exports = (sequelize, DataTypes) => {
  const usuario2 = sequelize.define('usuario2', {
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    dni: DataTypes.INTEGER,
    contrasenia: DataTypes.STRING
  }, {});
  usuario2.associate = function(models) {
    // associations can be defined here
  };
  return usuario2;
};