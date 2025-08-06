const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const conectarDB = require('./config/db');
const articulosRoutes = require('./routes/articuloRoutes')



require('dotenv').config();
console.log('DEBUG DB_URI:', process.env.DB_URI);

conectarDB();


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/articulos',articulosRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT,() =>{
    console.log(`El servidor esta escuchando en el puerto ${PORT}`); 
});


