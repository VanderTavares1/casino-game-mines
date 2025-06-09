import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../src/paginas/Login.js';
import Cadastro from './paginas/Cadastro.js'
import EsqueciSenhaModal from './paginas/EsqueciSenhaModal.js';
import Home from './paginas/Home.js'
import TelaJogo from './paginas/TelaJogo.js'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path='/esqueciSenha' element={<EsqueciSenhaModal />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/telajogo/:id' element={<TelaJogo />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
