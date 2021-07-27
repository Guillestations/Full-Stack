const Usuario = require('../models/Usuarios');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.crearUsuario = async (req, res) => {

    //reviso los posibles errores
    const errores = validationResult(req);
    if( !errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array()})
    }
    // leer los datos
    const { nombre, email, password } = req.body
    try {
        
        // crea el nuevo usuario
        await Usuario.create({
            nombre,
            email,
            password
        })

        // Crear y firmarel JWT
        const payload = {
            usuario: {
                id: Usuario.id
            }
        };

        // Firma el JWT
        jwt.sign(payload, process.env.SECRET , {
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error;

            // Mensaje de confirmacion
            res.json({ token });
        });

        //res.redirect('/')
        
    } catch (error) {
        console.log(error)
        res.status(400).send('Ocurrio un error');
    }
    
}