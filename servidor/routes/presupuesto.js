const express = require('express');
const router = express.Router();
const presupuestoController = require('../controllers/presupuestoController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// Crea un usuario
// Su end point sera api/presupuesto
router.post('/',
    auth,
    [
        check('nombre', 'El Presupuesto es necesario y no debe ir vacio').not().isEmpty()
    ],
    presupuestoController.crearPresupuesto
);

// Obtener los presupuestos creados via ID
router.get('/',
    auth,
    presupuestoController.obtenerPresupuestos
);

// actulalizar nombre de presupuesto
router.put('/:id',
    auth,
    [
        check('nombre', 'El Presupuesto es necesario y no debe ir vacio').not().isEmpty()
    ],
    presupuestoController.actualizarPresupuesto
)

// Eliminar un Presupuesto
router.delete('/:id',
    auth,
    presupuestoController.eliminarProyecto
)

module.exports = router;