import { useState } from 'react';
import Navegacion from './componentes/Navegacion';
import Registro from './componentes/Registro';
import Login from './componentes/Login';
import CrearPost from './componentes/CrearPost';
import ListaPosts from './componentes/ListaPosts';
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