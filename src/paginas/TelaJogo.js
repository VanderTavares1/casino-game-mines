import { useState, useEffect } from 'react';
import '../estilizacao/TelaJogo.css';
import { enviandoCaixaEscolhida, enviandoDadosAposParar, buscarUsuarioLogado } from '../utils/api';
import { useNavigate, useParams } from 'react-router-dom';
import diamante from '../imagens/diamante.png';
import imgBomba from '../imagens/bomba.png';
import Menu from '../componentes/MenuLateral';

export default function TelaJogo() {
  const { id } = useParams();
    const navigate = useNavigate();

  const [caixa_escolhida, setCaixa_escolhida] = useState("");
  const [jogoAtivo, setJogoAtivo] = useState(true);
  const [listaDiamantes, setListaDiamantes] = useState([]);
  const [bombaMinas, setBomba] = useState(0);
  const [valorGanhoDimas, setValorGanhoDimas] = useState(0);
  const [nome, setNome] = useState("");
  const [role, setRole] = useState("");
  const [qntdDinheiro, setQntdDineheiro] = useState(0);
  const [qntdJogosFeitos, setQntsJogosFeitos] = useState(0);
  const [quantosGanho, setQuantosGanho] = useState(0);
  const [quantosPerdeu, setQuantosPerdeu] = useState(0);
  const [nomesDeTodosUsuarios, setNomesDeTodosUsuarios] = useState([]);
  const [qntdJogos, setQntdJogos] = useState(0);

  const formatoDinheiro = (valor) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);
};

  useEffect(() => {
    buscarUsuarioLogado()
      .then(data => {
        setNome(data.nome);
        setRole(data.role);
        setQntdDineheiro(data.qntdDinheiro);
        setQntsJogosFeitos(data.qntdJogosFeitos);
        setQuantosGanho(data.quantosGanho);
        setQuantosPerdeu(data.quantosPerdeu);
        setNomesDeTodosUsuarios(data.nomesDeTodosUsuarios);
        setQntdJogos(data.qntdJogos);
      })
      .catch(err => {
        console.error("Erro ao buscar usuário logado:", err);
      });
  }, []);

    async function enviandoCaixaEscolhidaPeloUsuario(index) {
        if (!jogoAtivo) return;
        setCaixa_escolhida(index);
        try {
            const resp = await enviandoCaixaEscolhida(index, id, listaDiamantes.length);
            setValorGanhoDimas(resp.valorGanho)
            console.log('resp', resp)
            if (resp.resultado === "DIAMANTE") {
             setListaDiamantes([...listaDiamantes, index]);
            } else {
                setBomba(index);
                setJogoAtivo(false);
            }
        } catch (err) {
            console.error('Erro enviando caixa escolhida:', err);
        }
    }

    async function enviandoDadosPosParar(id) {
        try{
            const resp = await enviandoDadosAposParar(id)
            console.log('resp parar', resp)
        }catch{
            console.log("erro >>>>>>>>");
            
        }
    }
 return (
  <Menu
    nome={nome}
    role={role}
    qntdDinheiro={qntdDinheiro}
    qntdJogosFeitos={qntdJogosFeitos}
    quantosGanho={quantosGanho}
    quantosPerdeu={quantosPerdeu}
    nomesDeTodosUsuarios={nomesDeTodosUsuarios}
    rota={"/home"}
  >
    <div
      className="tela_jogo"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-25%, -50%)'
      }}
    >
      <h1 style={{ color: 'white', margin: 0 }}>Valor ganho: {formatoDinheiro(valorGanhoDimas)}</h1>

      <div className="container_botoes">
        {Array.from({ length: 25 }).map((_, index) => (
          <button
            key={index}
            id={`btn-${index}`}
            value={index}
            onClick={() => enviandoCaixaEscolhidaPeloUsuario(index)}
            disabled={!jogoAtivo}
          >
            {listaDiamantes.includes(index) ? (
               // eslint-disable-next-line
              <img src={diamante} id="img_diamante" />
            ) : bombaMinas === index && caixa_escolhida === index ? (
               // eslint-disable-next-line
              <img src={imgBomba} id="img_bomba" />
            ) : null}
          </button>
        ))}
      </div>

      {jogoAtivo && (
        <button id="parar" onClick={() => enviandoDadosPosParar(id) && navigate("/home")}>
          Parar
        </button>
      )}

      {!jogoAtivo && (
        <div className="fim_jogo">
          <p style={{ fontSize: 50, color: 'white' }}>Você perdeu! A bomba foi encontrada.</p>
        </div>
      )}
    </div>
  </Menu>
);

}
