const Presupuesto = require('../models/Presupuesto');
const { validationResult } = require('express-validator');

exports.crearPresupuesto = async (req, res) => {

    //reviso los posibles errores
    const errores = validationResult(req);
    if( !errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array()})
    }

    // leer los datos
    const { nombre } = req.body
    const creador = req.usuario.id
    try {
        const presupuesto = await Presupuesto.create({
            nombre,
            creador
        })
        res.status(500).json(presupuesto)
    } catch (error) {
        console.log(error)
        res.status(400).json({msg: 'Ocurrio un error'})
    }
}

// Obtener los presupuestos del usuario actual
exports.obtenerPresupuestos = async (req, res) => {
    try {
        const presupuestos = await Presupuesto.findAll({
            where: { creador: req.usuario.id}
        });
        res.json({presupuestos})
    } catch (error) {
        console.log(error)
        res.status(500).send('Ocurrio un error')
    }
}

// Actulizar un presupuesto
exports.actualizarPresupuesto = async (req, res) => {
    //reviso los posibles errores
    const errores = validationResult(req);
    if( !errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array()})
    }

    // Extraer la informacion del prespuesto
    const { nombre } = req.body;
    const nuevoPresupuesto = {};

    if(nombre) {
        nuevoPresupuesto.nombre = nombre;
    }

    try {
        // revisar el ID
        let presupuesto = await Presupuesto.findOne({
            where: { id: req.params.id }
        })
        
        // si el presupuesto existe o no 
        if(!presupuesto){
            return res.status(404).json({msg: 'Presupuesto no encontardo'})
        }

        // verificar el creador del presupuesto
        if(presupuesto.creador !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'});
        
        }
        // actulizar
        const presupuestoUp = await Presupuesto.update(
            { nombre: nombre },
            { where: { id: req.params.id}}
        );
        res.json({presupuestoUp})


    } catch (error) {
        console.log(error)
        res.status(500).send('Error en el servidor');
    }
}

// Elimina un presupusto por su id
exports.eliminarProyecto = async (req, res) => {
    
    try {
        // revisar el ID
        let presupuesto = await Presupuesto.findOne({
            where: { id: req.params.id }
        })
        
        // si el presupuesto existe o no 
        if(!presupuesto){
            return res.status(404).json({msg: 'Presupuesto no encontardo'})
        }

        // verificar el creador del presupuesto
        if(presupuesto.creador !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'});
        
        }
        // eliminar
        await Presupuesto.destroy(
            { where: { id: req.params.id}}
        )
        res.json({msg: 'Presupuesto eliminado correcatamente'});

        
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor')
    }
}
