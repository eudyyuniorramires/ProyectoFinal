const Articulo = require('../models/Articulo');

// Crear nuevo artículo
const crearArticulo = async (req, res) => {
  try {
    const nuevoArticulo = new Articulo(req.body);
    await nuevoArticulo.save();
    res.status(201).json(nuevoArticulo);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

// Obtener todos los artículos
const obtenerArticulos = async (req, res) => {
  try {
    const articulos = await Articulo.find();
    res.json(articulos);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

// Obtener artículo por ID
const obtenerArticuloPorId = async (req, res) => {
  try {
    const articulo = await Articulo.findById(req.params.id);
    if (!articulo) {
      return res.status(404).json({ mensaje: 'Artículo no encontrado' });
    }
    res.json(articulo);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

// Actualizar artículo
const actualizarArticulo = async (req, res) => {
  try {
    const articulo = await Articulo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!articulo) {
      return res.status(404).json({ mensaje: 'Artículo no encontrado' });
    }
    res.json(articulo);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

// Eliminar artículo
const eliminarArticulo = async (req, res) => {
  try {
    const articulo = await Articulo.findByIdAndDelete(req.params.id);
    if (!articulo) {
      return res.status(404).json({ mensaje: 'Artículo no encontrado' });
    }
    res.json({ mensaje: 'Artículo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

module.exports = {
  crearArticulo,
  obtenerArticulos,
  obtenerArticuloPorId,
  actualizarArticulo,
  eliminarArticulo
};
