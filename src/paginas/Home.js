import '../estilizacao/HomeEstilo.css';
import imagemCassino from '../imagens/imagemCassinoMinas.png'
import importCofrinho from '../imagens/cofrinho.svg'
import sair from '../imagens/sair.svg'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {buscarUsuarioLogado} from '../utils/api'
import EscolhaQuantidadeBombas from '../componentes/Select';
import Input from '../componentes/Input'
import {enviandoDadosIniciaisDaAposta} from '../utils/api'
// eslint-disable-next-line
import TelaJogo from '../paginas/TelaJogo'

function Home() {

    const [nome, setNome] = useState("");
    const [role, setRole] = useState("");
    const [qntdDinheiro, setQntdDineheiro] = useState(0);
    const [qntdJogosFeitos, setQntsJogosFeitos] = useState(0);
    const [quantosGanho, setQuantosGanho] = useState(0);
    const [quantosPerdeu, setQuantosPerdeu] = useState(0);
    const [nomesDeTodosUsuarios, setNomesDeTodosUsuarios] = useState([]);
    const navigate = useNavigate();
    const [qntdBombas, setQntdBombas] = useState(0);
    const [apostaInicial, setApostaInicial] = useState(0);

    useEffect(() => {
      buscarUsuarioLogado()
      .then(data => {
        setNome(data.nome)
        setRole(data.role)
        setQntdDineheiro(data.qntdDinheiro)
        setQntsJogosFeitos(data.qntdJogosFeitos)
        setQuantosGanho(data.quantosGanho)
        setQuantosPerdeu(data.quantosPerdeu)
        setNomesDeTodosUsuarios(data.nomesDeTodosUsuarios)
        console.log("Usuário logado:", data);
      })
      .catch(err => {
      console.error("Erro ao buscar usuário logado:", err);
      });
    }, []);

    async function enviandoDadosAposta() {
      try {
        const resposta = await enviandoDadosIniciaisDaAposta(qntdBombas, apostaInicial);
        console.log('resposta', resposta)
        navigate(`/telajogo/${resposta}`);
      } catch (err) {
        console.error("Erro ao enviar dados da aposta:", err);
      }
    }


  return (
    <div className="home-container" style={{ position: 'relative', minHeight: '100vh' }}>

      <img
        src={sair}
        alt="Voltar"
        className="btn-voltar"
        onClick={() => navigate('/login')}
      />

      
      <div className="saldo-box">
          <span className='span_home' style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src={importCofrinho} alt='cofrinho' style={{ width: 55 }} />
          <b>Saldo: R$ {qntdDinheiro}</b>
          </span>
      </div>

      <div className="sidebar">
        <>
          <h1 className='h1_home'>{role}</h1>
          <h2 className='h2_home'>{nome}</h2>
          <span className='span_home'>Jogos feitos: {qntdJogosFeitos}</span>
          <span className='span_home'>Quantos ganhou: {quantosGanho}</span>
          <span className='span_home'>Quantos perdeu: {quantosPerdeu}</span>
          <span className='span_home'>Valor ganho: R$ 0,00</span>
          {role === "ADM" ? (
            <>
              <span className='span_home'>Valor ganho: R$ 0,00</span>
              <span className='span_home'>Lista usuários: {nomesDeTodosUsuarios}</span>
              {console.log('nome de todos usuários >>>>>>>>' + nomesDeTodosUsuarios)}
            </>
          ) : null}
        </>
      </div>

      <div className="main-content">
        <h1 className='h1_home'>Bem vindo,</h1>
        <h2 style={{ color: 'white' }}>{nome}</h2>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
          <Input value={apostaInicial} onChange={e => setApostaInicial(e.target.value)}/>
          <img src={imagemCassino} alt='Cassino YouX' id='img_cassino' onClick={enviandoDadosAposta} />
          <EscolhaQuantidadeBombas value={qntdBombas} onChange={(e) => setQntdBombas(e.target.value)}/>
        </div>
      </div>
    </div>
  );
}

export default Home;