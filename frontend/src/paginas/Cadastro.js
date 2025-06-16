import { useState } from "react";
import InputDataNascimento from '../componentes/InputDataNascimento.js';
import api, { fazendoCadastro } from '../utils/api.js'
import CadastroEstilo from '../estilizacao/CadastroEstilo.css';
import logoYoxuTelaInicial from '../imagens/logoYoxuTelaLogin.png';
import { Link, useNavigate } from "react-router-dom";

export default function Cadastro() {
    const [nome, setNome] = useState('');
    const [usuario, setUsuario] = useState('');
    const [dataDeNascimento, setDataDeNascimento] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setSonfirmarSenha] = useState('');
    const [qntdDinheiro, setQntdDineheiro] = useState(0);
    const [quantosGanho, setQuantosGanho] = useState(0);
    const [quantosPerdeu, setQuantosPerdeu] = useState(0);
    const [qntdJogosFeitos, setQntdJogosFeitos] = useState(0);
    const [role, setRole] = useState('');
    const [erro, setErro] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (usuario === '' || senha === '' || dataDeNascimento === null || nome === '' || qntdDinheiro === null || quantosGanho === null || quantosPerdeu === null || confirmarSenha === "") {
            setErro('Preencha todos os campos.');
            return;
        }
        setErro('');
        alert('Login realizado com sucesso!');
    };

    async function enviandoDadosParaCadastrarNovoUsuario() {
        try {
            await fazendoCadastro(
                nome,
                usuario,
                dataDeNascimento,
                qntdJogosFeitos,
                senha,
                confirmarSenha,
                quantosGanho,
                quantosPerdeu,
                parseFloat(qntdDinheiro),
                role
            );
            console.log("Cadastro realizado com sucesso! >>>>>>>>>>> " + fazendoCadastro.data);
        } catch (error) {
            console.error("Erro durante o cadastro >>>>>>>", error);
            console.log(fazendoCadastro.data);
            
        }
    }

    const navigate = useNavigate();

     return (
    <div className="cadastro-wrapper">
      <div className="container_cadastro">
        <div className="div_pai">
          <div className="div_cadastro_imagem">
            <img src={logoYoxuTelaInicial} alt="Imagem Youx" />
            <h1 style={{ color: 'black' }}>Cadastro</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="container_nome">
              <label>Nome:</label>
              <input value={nome} onChange={e => setNome(e.target.value)} required />
            </div>

            <div className="container_usuario">
              <label>E-mail:</label>
              <input value={usuario} onChange={e => setUsuario(e.target.value)} type="email" required />
            </div>

            <div className="container_usuario">
              <label>Data de Nascimento:</label>
              <InputDataNascimento value={dataDeNascimento} onChange={e => setDataDeNascimento(e.target.value)} required />
            </div>

            <div className="container_usuario">
              <label>Senha:</label>
              <input value={senha} onChange={e => setSenha(e.target.value)} required />
              <label>Confirmar senha</label>
              <input value={confirmarSenha} onChange={e => setSonfirmarSenha(e.target.value)} style={{ marginBottom: 15 }} required />
            </div>

            <div className="container_usuario">
              <label>Dinheiro inicial:</label>
              <input type="number" placeholder="R$00,00" value={qntdDinheiro} onChange={e => setQntdDineheiro(e.target.value)} required />
            </div>

            <div className="container_usuario">
              <label>Autorização:</label>
              <input value={role} onChange={e => setRole(e.target.value)} placeholder="ADM ou USUARIO..." required />
            </div>

            {erro && <div style={{ color: 'red', marginBottom: 16 }}>{erro}</div>}

            <div className="botoes_cadastro">
              <button id="btn_nova_conta" onClick={() => navigate('/login')}>Cancelar</button>
              <button type="submit" id="btn_cadastrar" onClick={enviandoDadosParaCadastrarNovoUsuario}>Cadastrar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
