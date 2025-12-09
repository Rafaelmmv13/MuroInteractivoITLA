import { useState } from 'react';
import Navegacion from './Componentes/Navegacion';
import Registro from './Componentes/Registro';
import Login from './Componentes/Login';
import CrearPost from './Componentes/CrearPost';
import ListaPosts from './Componentes/ListaPosts';
import './App.css';

function App() {
  const [usuario, setUsuario] = useState(null);
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const [mostrarLogin, setMostrarLogin] = useState(false);

  const cerrarSesion = () => {
    setUsuario(null);
  };

  return (
    <div className="App">
      <Navegacion 
        usuario={usuario}
        abrirLogin={() => setMostrarLogin(true)}
        abrirRegistro={() => setMostrarRegistro(true)}
        cerrarSesion={cerrarSesion}
      />

      <div className="contenedor">
        <h1>Muro Interactivo</h1>

        {usuario && <CrearPost usuario={usuario} />}

        <ListaPosts />
      </div>

      {mostrarRegistro && (
        <Registro cerrar={() => setMostrarRegistro(false)} />
      )}

      {mostrarLogin && (
        <Login 
          cerrar={() => setMostrarLogin(false)}
          setUsuario={setUsuario}
        />
      )}
    </div>
  );
}

export default App;