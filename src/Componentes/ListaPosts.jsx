import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

function ListaPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('fecha', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const listaPosts = [];
      snapshot.forEach((doc) => {
        listaPosts.push({ id: doc.id, ...doc.data() });
      });
      setPosts(listaPosts);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="lista-posts">
      <h3>Todas las Publicaciones</h3>
      
      {posts.length === 0 ? (
        <p>No hay publicaciones todavía</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="post">
            <div className="post-header">
              <div>
                <span className="autor"> @{post.autor}</span>
                {post.nombreCompleto && (
                  <p className="nombre-completo">{post.nombreCompleto}</p>
                )}
              </div>
              <span className="fecha">
                {post.fecha ? new Date(post.fecha.seconds * 1000).toLocaleDateString('es-ES') : 'Ahora'}
              </span>
            </div>
            <p className="contenido">{post.contenido}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default ListaPosts;