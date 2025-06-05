import React, { useState } from 'react';
import api, { fazerLogin } from '../utils/api.js'
// eslint-disable-next-line
import LoginEstilo from '../estilizacao/LoginEstilo.css'
import logoYoxuTelaInicial from '../imagens/logoYoxuTelaLogin.png'
import Cadastro from './Cadastro.js'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import EsqueciSenha from './EsqueciSenhaModal.js';

function Login() {

      const navigate = useNavigate();
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (usuario === '' || senha === '') {
            setErro('Preencha todos os campos.');
            return;
        }
        setErro('');
        alert('Login realizado com sucesso!');
    };

    async function enviandoDadosParaFazerLogin(){
        try{
            await fazerLogin(usuario, senha)
            navigate('/home')
        }catch{
            console.log('erro >>>>>>> ');
            
        }
    }

return (
    <div className="login-page">
      <div className="login_container">
        <span className="titulo-login">Cássino YouX</span>
        <div className='div_login_pai'>
          <div className='div_login_filho'>
            <div className='div_login'>
              <img src={logoYoxuTelaInicial} alt='Imagem Youx' />
              <h1>Login</h1>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>E-mail:</label>
                <input
                  type="email"
                  value={usuario}
                  onChange={e => setUsuario(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Senha:</label>
                <input
                  type="password"
                  value={senha}
                  onChange={e => setSenha(e.target.value)}
                  required
                />
                <a className="link-senha" href='/EsqueciSenha'>Esqueceu a senha?</a>
              </div>
              {erro && <div className="mensagem-erro">{erro}</div>}
              <div className="botoes-login">
                <button type="submit" id='btn_entrar' onClick={enviandoDadosParaFazerLogin}>Entrar</button>
                <button id="btn_nova_conta" onClick={() => navigate("/cadastro")}>Nova conta</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;