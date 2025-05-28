import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    const estaLogada = localStorage.getItem('logada') === 'true';
    if (!estaLogada) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <h1>Página Admin</h1>
      <p>Conteúdo protegido. Só quem está logado pode ver isso.</p>
    </div>
  );
}
