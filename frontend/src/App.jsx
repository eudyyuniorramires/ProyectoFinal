import { useState, useEffect } from "react";
import "./App.css";
import ArticulosTabla from "./components/ArticulosTabla";
import ArticuloFormulario from "./components/ArticuloFormulario";
import { fetchArticulos, BACKEND_URL } from "./services/ArticulosService";
import * as ArticulosService from './services/ArticulosService';

function App() {
  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [articuloEditando, setArticuloEditando] = useState(null);

  useEffect(() => {
    const getArticulos = async () => {
      try {
        const data = await fetchArticulos();
        setArticulos(data);
      } catch (err) {
        setError(
          `Error de conexión: ${err.message}. Verifica que el backend esté corriendo en ${BACKEND_URL}`
        );
      } finally {
        setLoading(false);
      }
    };
    getArticulos();
  }, []);

 const handleEditar = async (articulo) => {
    try {
      const articuloActualizado = await ArticulosService.getArticuloById(articulo._id);
      setArticuloEditando(articuloActualizado);
      setMostrarFormulario(true);
    } catch (error) {
      alert("No se pudo obtener la información del artículo.");
    }
  };

  const handleBorrar = async (id) => {
    await ArticulosService.borrarArticulo(id);
    setArticulos(articulos.filter(a => a._id !== id));
  };

  if (loading) return <div>Cargando artículos...</div>;
  if (error) return <div>Error: {error}</div>;

return (
  <div className="App">
    <h1>Lista de Artículos desde la API</h1>
    <button onClick={() => setMostrarFormulario(true)}>
      Agregar Artículo
    </button>

    {mostrarFormulario ? (
      <ArticuloFormulario
        articulo={articuloEditando}
        onArticuloAgregado={async () => {
          const data = await fetchArticulos();
          setArticulos(data);
          setMostrarFormulario(false);
          setArticuloEditando(null);
        }}
        onCancelar={() => {
          setMostrarFormulario(false);
          setArticuloEditando(null);
        }}
      />
    ) : articulos.length > 0 ? (
      <ArticulosTabla
        articulos={articulos}
        onEditar={handleEditar}
        onBorrar={handleBorrar}
      />
    ) : (
      <p>No hay artículos disponibles.</p>
    )}
  </div>
);
}

export default App;
