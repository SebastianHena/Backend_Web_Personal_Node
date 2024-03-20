const express = require('express');
const router = express.Router();
//Models
const Project = require("../models/projects.model")


//Creacion de las rutas

//MIDDELWARE
const getProject = async(req, res, netx) =>{
    let project;
    const { id } = req.params;
    //const numeros = '1234567890';

    if (!id.match(/^[0-9a-fA-F]{24}$/)){
        return res.status(400).json({
            message: "El ID del proyecto no es valido"
        })
    }

    try {
        project = await Project.findById(id)
        if (!project) {
            return res.status(404).json({
                message: "El proyecto no fue encontrado"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
    
    res.project = project;
    netx();
}

//Obtener todos los proyectos
router.get("/", async (req, res) => {
    try {
        const projects = await Project.find()
        res.send(projects)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})


//Obtener un solo proyecto
router.get("/:id", getProject, (req, res) =>{
    res.json(res.project);
})


//Crear un nuevo proyecto
router.post("/", async (req, res) => {
    const {nombre, descripcion } = req?.body
    if (!nombre || !descripcion) {
        return res.status(400).json({
            message: "Los campos ID, Nombre y Descripcion son obligatorios"
        })
    }

    const project = new Project({
        nombre,
        descripcion
    })

    try {
        const newProject = await project.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})


//Actualizar proyecto
router.put("/:id", getProject, async(req, res) =>{
    try {
        const project = res.project;
        project.nombre = req.body.nombre || project.nombre;
        project.descripcion = req.body.descripcion || project.descripcion;

        const updateProject = await project.save()
        res.send(updateProject);

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})


//Actualizar un solo elemento
router.patch("/:id", getProject, async(req, res) =>{

    if (!req.body.nombre && !req.body.descripcion){
        res.status(400).json({
            message: "Al menos uno de estos campos debe de ser enviado: Nombre o Descripcion"
        })
    }

    try {
        const project = res.project;
        project.nombre = req.body.nombre || project.nombre;
        project.descripcion = req.body.descripcion || project.descripcion;

        const updateProject = await project.save()
        res.send(updateProject);

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})


//Eliminar un proyecto
router.delete("/:id", getProject, async(req, res) =>{
    try {
        const project = res.project;
        await project.deleteOne({
            _id: project._id
        });
        res.status(201).json({
            message: `El proyecto '${project.nombre}' fue eliminado correctamente` 
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})


//Exportamos las rutas
module.exports = router;