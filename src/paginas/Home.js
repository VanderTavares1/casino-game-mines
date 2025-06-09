import '../estilizacao/HomeEstilo.css';
import imagemCassino from '../imagens/imagemCassinoMinas.png'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {buscarUsuarioLogado} from '../utils/api'
import EscolhaQuantidadeBombas from '../componentes/Select';
import Input from '../componentes/Input'
import {enviandoDadosIniciaisDaAposta} from '../utils/api'
import Menu from '../componentes/MenuLateral'
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
    const [qntdBombas, setQntdBombas] = useState(1);
    const [apostaInicial, setApostaInicial] = useState(0);
    const [qntdJogos, setQntdJogos] = useState(0);

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
        setQntdJogos(data.qntdJogos)
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

    const handleClickCassino = () => {
      if (apostaInicial > qntdDinheiro) {
        alert('Saldo insuficiente para realizar a aposta!');
      } else {
        enviandoDadosAposta();
      }
    };

    

return (
  <Menu
    nome={nome}
    role={role}
    qntdDinheiro={qntdDinheiro}
    qntdJogosFeitos={qntdJogosFeitos}
    quantosGanho={quantosGanho}
    quantosPerdeu={quantosPerdeu}
    nomesDeTodosUsuarios={nomesDeTodosUsuarios}
    qntdJogos={qntdJogos}
  >
    <div className="main-content">

     
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
        <Input value={apostaInicial} onChange={e => setApostaInicial(e.target.value)} />
        <img
          src={imagemCassino}
          alt="Cassino YouX"
          id="img_cassino"
          onClick={() => handleClickCassino()}
        />
        <EscolhaQuantidadeBombas
          value={qntdBombas}
          onChange={e => setQntdBombas(e.target.value)}
        />
      </div>
    </div>
  </Menu>
);

}

export default Home;