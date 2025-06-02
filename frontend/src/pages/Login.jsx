import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    if (email === 'ddt@gmail.com' && senha === '123456') {
      localStorage.setItem('logada', 'true');
      window.dispatchEvent(new Event('storageChanged'));
      navigate('/admin');
    } else {
      alert('E-mail ou senha inválidos');
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 ">
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-4">Login da Tia</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">E-mail</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Digite seu e-mail"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Senha</label>
            <input
              type={mostrarSenha ? 'text' : 'password'}
              className="form-control"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              placeholder="Digite sua senha"
            />
            <div className="form-check mt-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="mostrarSenha"
                checked={mostrarSenha}
                onChange={(e) => setMostrarSenha(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="mostrarSenha">
                Mostrar senha
              </label>
            </div>
          </div>
          <button type="submit" className="btn-enviar w-100 py-2 rounded ">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
