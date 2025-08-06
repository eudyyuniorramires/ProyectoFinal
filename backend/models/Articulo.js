const mongoose = require('mongoose');

const articuloSchema = new mongoose.Schema({
  codigo: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  foto: {
    type: String, 
    required: false
  },
  descripcion: {
    type: String,
    required: false
  },
  cantidad: {
    type: Number,
    required: true,
    min: 0
  },
  precio: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Articulo', articuloSchema);