
var express = require("express");
var router = express.Router();
var models = require("../models");
const encriptador= require("bcrypt");
const jsonToken= require("jsonwebtoken");
const usuario2 = require("../models/usuario2");
router.get("/", (req, res) => {
  console.log("Esto es un mensaje para ver en consola");
  models.usuario2
    .findAll({
      attributes: ["id", "nombre" ,"apellido","dni"],
    })
    .then(usuarios => res.send(usuarios))
    .catch(() => res.sendStatus(500));
});

router.get("/:paginaActual&:cantidad", (req, res) => {
  console.log("Esto es un mensaje para ver en consola");
  models.usuario
    .findAll({
      offset: (parseInt(req.params.paginaActual) * parseInt(req.params.cantidad)), 
      limit: parseInt(req.params.cantidad),
      attributes: ["id", "nombre" ,"apellido","email","fecha_nacimiento","dni"],
    })
    .then(usuarios => res.send(usuarios))
    .catch(() => res.sendStatus(500));
});

router.post("/login", (req, res) => {
    //contraseniaEncriptada= encriptador.hashSync(req.body.contrasenia)
    models.usuario2.findOne({
       where: {dni: req.body.dni}
     }).then(user => {
       if(!user) {
        res.status(404).send("No existe ninguna cuenta asociada al dni")
       } 
       else 
       {
        // Si existe un usuario entonces se valida la contrasenia
          if(req.body.contrasenia===user.contrasenia)
          {
            //otorga el token
            let token = jsonToken.sign({ user: user}, "secret", { expiresIn: "24h"});
            res.status(201).send(`Hola de nuevo ,su token es: ${token}`) 
          }
          else 
          {
            res.send("Contraseña y/o mail incorrectos")  //TODO
          }

       }
     }).catch(err => {
       res.status(500).send(err)
     })
   
});

router.post("/registrarse", (req, res) => {
     //contraseniaEncriptada= encriptador.hashSync(req.body.contrasenia)
     models.usuario2.findOne({
        where: {dni: req.body.dni}
      }).then(user => {
        if(!user) {
            models.usuario2.create({nombre:req.body.nombre,apellido:req.body.apellido,dni:req.body.dni,contrasenia:req.body.contrasenia});
            res.status(201).send("Bienvenida/o su cuenta se a creado con exito")
        } else {
           res.status(400).send("Su dni esta asociado a una cuenta ")
        }
      }).catch(err => {
        res.status(500).send(err)
      })
    
});

const findAlumno = (id, { onSuccess, onNotFound, onError }) => {
  models.alumno
    .findOne({
      attributes: ["id", "nombres"],
      where: { id }
    })
    .then(alumno => (alumno ? onSuccess(carrera) : onNotFound()))
    .catch(() => onError());
};

router.get("/:id", (req, res) => {
    findAlumno(req.params.id, {
    onSuccess: alumno => res.send(alumno),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.put("/:id", (req, res) => {
  const onSuccess = alumno =>
  alumno
      .update({ nombres: req.body.nombres }, { fields: ["nombres"] })
      .then(() => res.sendStatus(200))
      .catch(error => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res.status(400).send('Bad request: existe otra carrera con el mismo nombre')
        }
        else {
          console.log(`Error al intentar actualizar la base de datos: ${error}`)
          res.sendStatus(500)
        }
      });
      findAlumno(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.delete("/:id", (req, res) => {
  const onSuccess = alumno =>
    alumno
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
      findAlumno(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

module.exports = router;
