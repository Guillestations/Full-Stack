const Usuario = require('../models/Usuarios');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

exports.autenticarUsuario = async (req, res) => {
    
    //reviso losposibles errores
    const errores = validationResult(req);
    if( !errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array()})
    }

    // extraer el email y password
    const { email, password } = req.body;

    try {
        // reviso si el usuario existe
        let usuario = await Usuario.findOne({
            where: { email: email }
        })
        if(!usuario) {
            return res.status(400).json({msg: 'EL usuario no Existe'})
        }

        // Revisar que sea password correcto
        const passCorrecto = await bcrypt.compare(password, usuario.password);
        if(!passCorrecto) {
            return res.status(400).json({msg: 'Password incoreecto'})
        }

        // Si todo es correto crear y firmar el JWT
        const payload = {
            usuario: {
                id: usuario.id
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
    } catch (error) {
        console.log(error);
    }
}