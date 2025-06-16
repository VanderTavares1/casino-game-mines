import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './paginas/Login.js';
import Cadastro from './paginas/Cadastro.js';
import EsqueciSenhaModal from './paginas/EsqueciSenhaModal.js';
import Home from './paginas/Home.js';
import TelaJogo from './paginas/TelaJogo.js';
import PrivateRoute from './utils/PrivateRoute.js';

function App() {
  const token = localStorage.getItem('authToken');

  return (
    <BrowserRouter>
      <Routes>
        {/* Redirecionamento da rota inicial */}
        <Route
          path="/"
          element={
            token ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/esqueciSenha" element={<EsqueciSenhaModal />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/telajogo/:id"
          element={
            <PrivateRoute>
              <TelaJogo />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
