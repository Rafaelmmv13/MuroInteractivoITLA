function Navegacion({ usuario, abrirLogin, abrirRegistro, cerrarSesion }) {
  return (
    <nav className="navegacion">
      <h2>Bienvenido Al Muro Interactivo ITLA</h2>
      
      <div className="botones">
        {usuario ? (
          <>
            <span>Hola: @{usuario.usuario}</span>
            <button onClick={cerrarSesion}>Salir</button>
          </>
        ) : (
          <>
            <button onClick={abrirLogin}>Iniciar Sesión</button>
            <button onClick={abrirRegistro}>Registrarse</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navegacion;