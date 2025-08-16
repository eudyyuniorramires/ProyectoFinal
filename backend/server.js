const express = require("express");
const cors = require("cors");
const conectarDB = require("./config/db");
const articulosRoutes = require("./routes/articuloRoutes");

require("dotenv").config();

conectarDB();

const app = express(); // 👉 primero inicializas la app

// Middlewares
app.use(cors());
app.use(express.json());

// 👉 aquí ya puedes usar app.use()
app.use("/uploads", express.static("uploads")); // Carpeta pública para las imágenes

// Rutas
app.use("/api/articulos", articulosRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API de artículos funcionando");
});

app.listen(PORT, () => {
  console.log(`El servidor está escuchando en el puerto ${PORT}`);
});
