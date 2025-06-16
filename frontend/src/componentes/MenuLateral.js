import importCofrinho from '../imagens/money.svg';
import sair from '../imagens/sair.svg';
import user from '../imagens/user.svg';
import game from '../imagens/game.svg';
import dinheiro from '../imagens/dinheiro.svg';
import roleImg from '../imagens/role.svg';

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

        <div className='span_home' style={{display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center', marginTop: 10, marginRight: 20}}>
          <img src={importCofrinho} alt='cofrinho' style={{ width: 80 }}/>
          <b style={{fontFamily: 'Roboto', fontSize: 22}}>Saldo: {formatoDinheiro(qntdDinheiro)}</b>
        </div>

        <div className='div_role' style={{display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center', marginTop: 10}}>
          <img src={roleImg} style={{width: 40}}/>
          <h1 className='h1_home' style={{marginTop: 10, fontSize: 25, fontFamily: 'Roboto'}}> {role}</h1>
        </div>

        <div className='div_user' style={{display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center', marginTop: 10}}>
          <img src={user} style={{width: 40}}/>
          <h2 className='h2_home' style={{marginTop: 15, fontSize: 25, fontFamily: 'Roboto'}}> {nome}</h2>
        </div>

        <span className='span_home' style={{marginTop: 15, marginRight: 45,fontSize: 22, fontFamily: 'Roboto'}}> <img src={game} style={{width: 40}}/> Jogos feitos: {qntdJogos}</span>
        <span className='span_home' style={{marginTop: 15, fontSize: 22, marginLeft: 8, fontFamily: 'Roboto'}}> <img src={dinheiro} style={{width: 40}}/> Quantos ganhou: {formatoDinheiro(quantosGanho)}</span>
        <span className='span_home' style={{marginTop: 15, fontSize: 22, marginLeft: 8, fontFamily: 'Roboto'}}> <img src={dinheiro} style={{width: 40}}/> Quantos perdeu: {formatoDinheiro(quantosPerdeu)}</span>
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
