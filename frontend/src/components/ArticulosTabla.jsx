import React from "react";
import { BACKEND_URL } from "../services/ArticulosService";

function ArticulosTabla({ articulos, onEditar, onBorrar }) {
  return (
    <table className="tabla-articulos">
      <thead>
        <tr>
          <th>Foto</th>
          <th>Código</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Cantidad</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {articulos.map((articulo) => (
          <tr key={articulo._id}>
            <td>
              <img
                src={`${BACKEND_URL}${articulo.foto}`}
                alt={articulo.nombre}
                className="tabla-foto"
              />
            </td>
            <td>{articulo.codigo}</td>
            <td>{articulo.nombre}</td>
            <td>{articulo.descripcion}</td>
            <td>{articulo.cantidad}</td>
            <td>{articulo.precio}</td>
            <td>
              <button onClick={() => onEditar(articulo)}>Editar</button>
              <button onClick={() => onBorrar(articulo._id)}>Borrar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ArticulosTabla;
