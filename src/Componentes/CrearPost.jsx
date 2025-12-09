import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

function CrearPost({ usuario }) {
  const [texto, setTexto] = useState('');
  const [cargando, setCargando] = useState(false);

  const publicar = async (e) => {
    e.preventDefault();
    
    if (!usuario) {
      alert('Debes iniciar sesión');
      return;
    }

    if (texto.trim() === '') {
      alert('Escribe algo!');
      return;
    }

    setCargando(true);

    try {
      await addDoc(collection(db, 'posts'), {
        contenido: texto.trim(),
        autor: usuario.usuario,
        nombreCompleto: `${usuario.nombre} ${usuario.apellido}`,
        fecha: serverTimestamp()
      });

      setTexto('');
      alert('Publicado!');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al publicar');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="crear-post">
      <h3>Crear Publicación</h3>
      <form onSubmit={publicar}>
        <textarea 
          placeholder="Cuenta algo interesante :)"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          rows="4"
          disabled={cargando}
        />
        <button type="submit" disabled={cargando}>
          {cargando ? 'Publicando...' : 'Publicar'}
        </button>
      </form>
    </div>
  );
}

export default CrearPost;