import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function DashboardProtegido() {
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function buscarDashboard() {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login'); // redireciona se não tiver token
        return;
      }

      try {
        const resposta = await axios.get('http://localhost:3333/api/admin/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMensagem(resposta.data.message);
      } catch (error) {
        setErro('Erro ao acessar o dashboard. Faça login novamente.');
        localStorage.removeItem('token');
        localStorage.removeItem('logada');
        setTimeout(() => navigate('/login'), 3000); // redireciona após 3s
      }
    }

    buscarDashboard();
  }, [navigate]);

  if (erro) {
    return <div className="alert alert-danger">{erro}</div>;
  }

  return (
    <div>
      <h2>Dashboard Protegido</h2>
      <p>{mensagem}</p>
    </div>
  );
}
