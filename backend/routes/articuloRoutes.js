const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  crearArticulo,
  obtenerArticulos,
  obtenerArticuloPorId,
  actualizarArticulo,
  eliminarArticulo,
} = require("../controllers/articuloController");

// Configuración de multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Rutas
router.post("/", upload.single("foto"), crearArticulo); // Crear artículo con imagen
router.get("/", obtenerArticulos);
router.get("/:id", obtenerArticuloPorId);
router.put("/:id", upload.single("foto"), actualizarArticulo); // Actualizar con imagen
router.delete("/:id", eliminarArticulo);

module.exports = router;
