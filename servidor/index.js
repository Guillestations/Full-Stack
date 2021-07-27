const express = require('express');

// crear servidor
const app = express();

// Habilitar express.json
app.use(express.json({ extended: true }));

// puerto de la app
const PORT = process.env.PORT || 4000;

// Conexion a la BD
const db = require('./config/db');

// Importo los modelos
require('./models/Usuarios');

db.sync()
    .then(() => console.log('Conectado a la BD'))
    .catch(error => console.log(error));
    
// Importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/presupuesto', require('./routes/presupuesto'));



app.listen(PORT, () => {
    console.log(`***** El servidor esta corriendo en el puerto ${PORT} *******`)
})