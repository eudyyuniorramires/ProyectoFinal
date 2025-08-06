const express = require('express');
const router = express.Router();
const {
  crearArticulo,
  obtenerArticulos,
  obtenerArticuloPorId,
  actualizarArticulo,
  eliminarArticulo
} = require('../controllers/articuloController');

router.post('/', crearArticulo);               // Crear artículo
router.get('/', obtenerArticulos);             // Obtener todos
router.get('/:id', obtenerArticuloPorId);      // Obtener uno por ID
router.put('/:id', actualizarArticulo);        // Actualizar
router.delete('/:id', eliminarArticulo);       // Eliminar

module.exports = router;
