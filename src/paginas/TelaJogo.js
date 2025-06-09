import { useState, useEffect } from 'react';
import '../estilizacao/TelaJogo.css';
import {enviandoCaixaEscolhida, enviandoDadosAposParar} from '../utils/api'
import { useNavigate, useParams } from 'react-router-dom';
import diamante from '../imagens/diamante.png'
import imgBomba from '../imagens/bomba.png'

export default function TelaJogo() {
    
    const { id } = useParams();
    const [caixa_escolhida, setCaixa_escolhida] = useState("");
    const [jogoAtivo, setJogoAtivo] = useState(true);
    const [listaDiamantes, setListaDiamantes] = useState([]);
    const [bombaMinas, setBomba] = useState(0);
    const [valorGanhoDimas, setValorGanhoDimas] = useState(0);
    const navigate = useNavigate();

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

    useEffect(() => {
        console.log('listaDiamantes', listaDiamantes)
    },[listaDiamantes])
    
    useEffect(() => {
        console.log('bomba', bombaMinas)
    },[bombaMinas])
    
    return (
        <div className="tela_jogo">
        <h1 style={{color: 'white', margin: 0}}>Valor ganho: {valorGanhoDimas}</h1>
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
                <img src={diamante} id='img_diamante'/>
            ) : bombaMinas === index && caixa_escolhida === index ? (
                <img src={imgBomba} id='img_bomba'/>
            ) : null}
            </button>
        ))}
        </div>
        {jogoAtivo && <button id='parar' onClick={() => enviandoDadosPosParar(id) && navigate("/home")}>Parar</button>}

        {!jogoAtivo && (
        <div className="fim_jogo">
            <p style={{ fontSize: 50, color: 'white' }}>Você perdeu! A bomba foi encontrada.</p>
        </div>
        )}
    </div>
    );

}