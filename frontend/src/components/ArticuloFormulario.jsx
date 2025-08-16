import React, { useState } from "react";
import { addArticulo } from "../services/ArticulosService";

function ArticuloFormulario({ onArticuloAgregado, onCancelar }) {
  const [nuevoArticulo, setNuevoArticulo] = useState({
    codigo: "",
    nombre: "",
    descripcion: "",
    cantidad: "",
    precio: "",
  });
  const [fotoFile, setFotoFile] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoArticulo((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFotoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("Agregando artículo...");

    const formData = new FormData();
    Object.entries(nuevoArticulo).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (fotoFile) formData.append("foto", fotoFile);

    try {
      await addArticulo(formData);
      setMensaje("Artículo agregado con éxito.");
      setNuevoArticulo({
        codigo: "",
        nombre: "",
        descripcion: "",
        cantidad: "",
        precio: "",
      });
      setFotoFile(null);
      onArticuloAgregado();
    } catch (error) {
      setMensaje(`Error: ${error.message}`);
    }
  };

  return (
    <div className="formulario-container">
      <h2>Agregar Nuevo Artículo</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Código:
          <input
            type="text"
            name="codigo"
            value={nuevoArticulo.codigo}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={nuevoArticulo.nombre}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Foto:
          <input type="file" name="foto" onChange={handleFileChange} />
        </label>
        <label>
          Descripción:
          <input
            type="text"
            name="descripcion"
            value={nuevoArticulo.descripcion}
            onChange={handleChange}
          />
        </label>
        <label>
          Cantidad:
          <input
            type="number"
            name="cantidad"
            value={nuevoArticulo.cantidad}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Precio:
          <input
            type="number"
            name="precio"
            step="0.01"
            value={nuevoArticulo.precio}
            onChange={handleChange}
            required
          />
        </label>
        <div className="botones-formulario">
          <button type="submit">Agregar</button>
          <button type="button" onClick={onCancelar}>
            Cancelar
          </button>
        </div>
      </form>
      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>
  );
}

export default ArticuloFormulario;
