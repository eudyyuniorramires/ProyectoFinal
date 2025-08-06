const express = require('express');
const router = express.Router();
const Articulo = require('../models/Articulo');

// ✅ Crear nuevo artículo
router.post('/', async (req, res) => {
  try {
    const nuevoArticulo = new Articulo(req.body);
    const articuloGuardado = await nuevoArticulo.save();
    res.status(201).json(articuloGuardado);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

// ✅ Obtener todos los artículos
router.get('/', async (req, res) => {
  try {
    const articulos = await Articulo.find();
    res.json(articulos);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

// ✅ Obtener un artículo por ID
router.get('/:id', async (req, res) => {
  try {
    const articulo = await Articulo.findById(req.params.id);
    if (!articulo) return res.status(404).json({ mensaje: 'Artículo no encontrado' });
    res.json(articulo);
  } catch (error) {
    res.status(400).json({ mensaje: 'ID inválido' });
  }
});

// ✅ Actualizar artículo
router.put('/:id', async (req, res) => {
  try {
    const articuloActualizado = await Articulo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!articuloActualizado) return res.status(404).json({ mensaje: 'Artículo no encontrado' });
    res.json(articuloActualizado);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

// ✅ Eliminar artículo
router.delete('/:id', async (req, res) => {
  try {
    const articuloEliminado = await Articulo.findByIdAndDelete(req.params.id);
    if (!articuloEliminado) return res.status(404).json({ mensaje: 'Artículo no encontrado' });
    res.json({ mensaje: 'Artículo eliminado con éxito' });
  } catch (error) {
    res.status(400).json({ mensaje: 'ID inválido' });
  }
});

module.exports = router;
