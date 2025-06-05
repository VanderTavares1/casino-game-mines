import { useState, useEffect } from 'react';
import '../estilizacao/TelaJogo.css';
import {enviandoCaixaEscolhida} from '../utils/api'

export default function TelaJogo() {

    const [caixa_escolhida, setCaixa_escolhida] = useState();
    
    async function enviandoCaixaEscolhidaPeloUsuario(index) {
        setCaixa_escolhida(index);
        try {
            await enviandoCaixaEscolhida(index, 18);
        } catch {
            console.log('erro');
        }
    }

    return (
        <div className="tela_jogo">
            <div className="container_botoes">
                {Array.from({ length: 25 }).map((_, index) => (
                    <button
                        key={index}
                        id={`btn-${index}`}
                        value={index}
                        onClick={() => enviandoCaixaEscolhidaPeloUsuario(index)}
                     />
                ))}
            </div>
            <button id='parar'>Parar</button>
        </div>
    );
}
