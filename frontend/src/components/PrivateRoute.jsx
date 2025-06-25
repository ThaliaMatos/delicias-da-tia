import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children, logada }) {
  if (!logada) {
    // Usuária não está logada, redireciona para /login
    return <Navigate to="/login" replace />;
  }
  // Usuária está logada, renderiza o componente protegido
  return children;
}
