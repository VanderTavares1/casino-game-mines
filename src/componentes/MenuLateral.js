import importCofrinho from '../imagens/cofrinho.png';
import sair from '../imagens/saindo.png';
import '../estilizacao/HomeEstilo.css';
import { useNavigate } from 'react-router-dom';

export default function Menu({nome, role, qntdDinheiro, qntdJogos, quantosGanho, quantosPerdeu, nomesDeTodosUsuarios, rota, children}) {
  const navigate = useNavigate();

  
  const formatoDinheiro = (valor) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);
};

  return (
    <div className="home-container" style={{ position: 'relative', minHeight: '100vh' }}>
      <img
        src={sair}
        alt="Voltar"
        className="btn-voltar"
        onClick={() => navigate(rota)}
      />

      <div className="sidebar">
        <span className='span_home' style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 20}}>
          <img src={importCofrinho} alt='cofrinho' style={{ width: 80 }}/>
          <b>Saldo: R$ {formatoDinheiro(qntdDinheiro)}</b>
        </span>
        <h1 className='h1_home' style={{marginTop: 10, fontSize: 30}}>{role}</h1>
        <h2 className='h2_home' style={{marginTop: 15, fontSize: 25}}>{nome}</h2>
        <span className='span_home' style={{marginTop: 15, fontSize: 22}}>Jogos feitos: {qntdJogos}</span>
        <span className='span_home' style={{marginTop: 15, fontSize: 22}}>Quantos ganhou: {formatoDinheiro(quantosGanho)}</span>
        <span className='span_home' style={{marginTop: 15, fontSize: 22}}>Quantos perdeu: {formatoDinheiro(quantosPerdeu)}</span>
        <span className='span_home' style={{marginTop: 15, fontSize: 22}}>Valor ganho: R$ 0,00</span>
        {role === "ADM" && (
          <>
                <hr style={{width: 250}}></hr>
                {<span className='span_home' style={{marginTop: 15, fontSize: 22}}>Lista usuário: </span>}
                <select 
                style={{
                    marginTop: 15,
                    fontSize: 18, 
                    width: 180, 
                    height: 45, 
                    borderRadius: 8,
                    border: '1.5px solid #6F102F',
                    backgroundColor: '#fff',
                    color: '#2c3e50',
                    fontWeight: '500',
                    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    cursor: 'not-allowed',
                }} 
                >
                    {nomesDeTodosUsuarios.map((nome, i) => (
                        <option key={i} value={nome} style={{padding:10.5}}>
                            {nome}
                        </option>
                    ))}
                </select>
          </>
        )}
      </div>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-30%, -50%)'}}>
            {children}
        </div>
    </div>
  );
}
