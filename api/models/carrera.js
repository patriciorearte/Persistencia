'use strict';
module.exports = (sequelize, DataTypes) => {
  const carrera = sequelize.define('carrera', {
    nombre: DataTypes.STRING
  }, {});
   /*
  //codigo de asociacion  (tiene muchos:)
  carrera.hasMany(models.materia, {
    as: "Materias-Relacionadas",
    foreignKey: "id_carrera",
    sourceKey: 'id'
  })
  ///////////////////////
*/
  return carrera;
};
