import { useState, useEffect } from "react";
import "./App.css";
import ArticulosTabla from "./components/ArticulosTabla";
import ArticuloFormulario from "./components/ArticuloFormulario";
import { fetchArticulos, BACKEND_URL } from "./services/ArticulosService";

function App() {
  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

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
          onArticuloAgregado={async () => {
            const data = await fetchArticulos();
            setArticulos(data);
            setMostrarFormulario(false);
          }}
          onCancelar={() => setMostrarFormulario(false)}
        />
      ) : articulos.length > 0 ? (
        <ArticulosTabla articulos={articulos} />
      ) : (
        <p>No hay artículos disponibles.</p>
      )}
    </div>
  );
}

export default App;
