import { useState } from 'react';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

function Registro({ cerrar }) {
  const [usuario, setUsuario] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [clave, setClave] = useState('');

  const handleRegistro = async (e) => {
    e.preventDefault();
    
    try {
      // Verificar si el usuario ya existe
      const q = query(collection(db, 'usuarios'), where('usuario', '==', usuario));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        alert('Este usuario ya existe');
        return;
      }

      // Guardar usuario en Firestore
      await addDoc(collection(db, 'usuarios'), {
        usuario: usuario,
        clave: clave,
        nombre: nombre,
        apellido: apellido
      });

      alert('Usuario creado!');
      cerrar();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="modal" onClick={cerrar}>
      <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
        <h2>Registrarse</h2>
        
        <form onSubmit={handleRegistro}>
          <input 
            type="text" 
            placeholder="Usuario" 
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required 
          />
          
          <input 
            type="text" 
            placeholder="Nombre" 
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required 
          />
          
          <input 
            type="text" 
            placeholder="Apellido" 
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required 
          />
          
          <input 
            type="password" 
            placeholder="Contraseña" 
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            required 
          />
          
          <button type="submit">Crear Cuenta</button>
          <button type="button" onClick={cerrar}>Cancelar</button>
        </form>
      </div>
    </div>
  );
}

export default Registro;