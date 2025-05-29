import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    if (email === 'ddt@gmail.com' && senha === '123456') {
      localStorage.setItem('logada', 'true');
      window.dispatchEvent(new Event('storageChanged')); // avisar o Footer
      navigate('/admin');
    } else {
      alert('E-mail ou senha inválidos');
    }
  }

  return (
    <div className="container mt-5">
      <h2>Login da Tia</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">E-mail:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Senha:</label>
          <input
            type="password"
            className="form-control"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Entrar</button>
      </form>
    </div>
  );
}
