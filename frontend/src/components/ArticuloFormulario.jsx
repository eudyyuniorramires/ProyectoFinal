import React, { useState, useEffect } from "react";
import { addArticulo, updateArticulo } from "../services/ArticulosService";

function ArticuloFormulario({ articulo, onArticuloAgregado, onCancelar }) {
  const [nuevoArticulo, setNuevoArticulo] = useState({
    codigo: "",
    nombre: "",
    descripcion: "",
    cantidad: "",
    precio: "",
  });
  const [fotoFile, setFotoFile] = useState(null);
  const [mensaje, setMensaje] = useState("");

  // Poblar campos si es edicion
  useEffect(() => {
    if (articulo) {
      setNuevoArticulo({
        codigo: articulo.codigo || "",
        nombre: articulo.nombre || "",
        descripcion: articulo.descripcion || "",
        cantidad: articulo.cantidad || "",
        precio: articulo.precio || "",
      });
      setFotoFile(null);
    } else {
      setNuevoArticulo({
        codigo: "",
        nombre: "",
        descripcion: "",
        cantidad: "",
        precio: "",
      });
      setFotoFile(null);
    }
  }, [articulo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoArticulo((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFotoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(articulo ? "Actualizando artículo..." : "Agregando artículo...");

    const formData = new FormData();
    Object.entries(nuevoArticulo).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (fotoFile) formData.append("foto", fotoFile);

    try {
      if (articulo && articulo._id) {
        await updateArticulo(articulo._id, formData);
        setMensaje("Artículo actualizado con éxito.");
      } else {
        await addArticulo(formData);
        setMensaje("Artículo agregado con éxito.");
      }
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
      <h2>{articulo ? "Editar Artículo" : "Agregar Nuevo Artículo"}</h2>
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
          {articulo && articulo.foto && (
            <div>
              <img src={articulo.foto} alt="foto actual" width={60} />
              <span>Foto actual</span>
            </div>
          )}
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
          <button type="submit">{articulo ? "Actualizar" : "Agregar"}</button>
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