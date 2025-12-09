import { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

function Login({ cerrar, setUsuario }) {
  const [usuarioInput, setUsuarioInput] = useState('');
  const [claveInput, setClaveInput] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!usuarioInput.trim() || !claveInput.trim()) {
      alert('Por favor completa todos los campos');
      return;
    }

    setCargando(true);
    
    try {
      // Buscar el usuario en Firestore
      const q = query(
        collection(db, 'usuarios'), 
        where('usuario', '==', usuarioInput.trim())
      );
      
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        alert('Usuario no encontrado');
        setCargando(false);
        return;
      }
      
      const userData = querySnapshot.docs[0].data();
      
      // Verificar la contraseña
      if (userData.clave !== claveInput) {
        alert('Contraseña incorrecta');
        setCargando(false);
        return;
      }
      
      // Guardar usuario en el estado
      setUsuario({
        id: querySnapshot.docs[0].id,
        usuario: userData.usuario,
        ...userData
      });
      
      alert('Bienvenido!');
      cerrar();
    } catch (error) {
      console.error('Error:', error);
      alert('Error al iniciar sesión');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="modal" onClick={cerrar}>
      <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
        <h2>Iniciar Sesión</h2>
        
        <form onSubmit={handleLogin}>
          <input 
            type="text" 
            placeholder="Usuario" 
            value={usuarioInput}
            onChange={(e) => setUsuarioInput(e.target.value)}
            disabled={cargando}
            required 
          />
          
          <input 
            type="password" 
            placeholder="Contraseña" 
            value={claveInput}
            onChange={(e) => setClaveInput(e.target.value)}
            disabled={cargando}
            required 
          />
          
          <button type="submit" disabled={cargando}>
            {cargando ? 'Cargando...' : 'Entrar'}
          </button>
          <button type="button" onClick={cerrar} disabled={cargando}>Cancelar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;