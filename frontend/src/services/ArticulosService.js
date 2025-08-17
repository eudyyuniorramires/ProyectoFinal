/* eslint-disable no-useless-catch */
const BACKEND_URL = "http://localhost:5000";

// Función para obtener la lista de artículos desde la API
export const fetchArticulos = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/articulos`);
    if (!response.ok) {
      throw new Error("No se pudo obtener la lista de artículos.");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en la llamada a la API:", error);
    throw error;
  }
};

// Función para agregar un nuevo artículo
export const addArticulo = async (formData) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/articulos`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Error al agregar el artículo.");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const borrarArticulo = async (id) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/articulos/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error al borrar el articulo.");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getArticuloById = async (id) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/articulos/${id}`);
    if (!response.ok) {
      throw new Error("No se pudo obtener el artículo.");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const updateArticulo = async (id, formData) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/articulos/${id}`, {
      method: "PUT",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Error al actualizar el artículo.");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export { BACKEND_URL };


