import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login({ setLogada }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const resposta = await axios.post('http://localhost:3333/api/login', {
        email,
        password: senha,
      });

      const token = resposta.data.token;

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('logada', 'true');
        setLogada(true); // atualiza o estado no App.jsx
        navigate('/admin');
      } else {
        alert('Login sem token. Verifique o backend.');
      }
    } catch (erro) {
      console.error('Erro ao fazer login:', erro);
      alert('E-mail ou senha inválidos');
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
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
                onChange={() => setMostrarSenha(!mostrarSenha)}
              />
              <label className="form-check-label" htmlFor="mostrarSenha">
                Mostrar senha
              </label>
            </div>
          </div>
          <button type="submit" className="btn-enviar w-100 py-2 rounded">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
