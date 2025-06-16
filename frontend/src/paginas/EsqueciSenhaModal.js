import { useNavigate } from "react-router-dom"
import setaCirculoEsquerda from '../imagens/setaCirculoEsquerda.svg'
import api, { requisicaoParaTrocarDeSenha } from '../utils/api.js'
import EsqueciSenha from '../estilizacao/CadastroEstilo.css'
import { useState } from "react";

export default function EsqueciSenhaModal(){

    const [usuario, setUsuario] = useState('');
    const [erro, setErro] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (usuario === '') {
            setErro('Preencha o campo email.');
            return;
        }
        setErro('');
    };

    async function enviandoEmailParaReceberCodigoTrocarSenha(){
        try{
            await requisicaoParaTrocarDeSenha(usuario)
            alert('Email enviado com sucesso!');
        }catch{
            console.log('erro >>>>>>>>>>>> ');
            alert('Falha ao enviar email');
        }
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh',
            backgroundColor: '#6F102F',
        }}>
            <div style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                width: 400,
                height: 450,
            }}>
                <img
                    src={setaCirculoEsquerda}
                    onClick={() => navigate('/login')}
                    style={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        width: 30,
                        height: 30,
                        cursor: 'pointer'
                    }}
                    alt="voltar"
                />
                <h1>Redefinição de senha!</h1>
                <p>Informe um email e enviaremos um link <br/> para recuperação da sua senha.</p>

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 20 }}>
                        <label><b>Email</b></label>
                        <input
                            style={{ borderRadius: 3, fontSize: 15 }}
                            type="email"
                            value={usuario}
                            onChange={e => setUsuario(e.target.value)}
                            required
                        />
                        {erro && <div style={{ color: 'red', marginBottom: 16 }}>{erro}</div>}
                    </div>
                    <button
                        onClick={enviandoEmailParaReceberCodigoTrocarSenha}
                        type="submit"
                        style={{
                            backgroundColor: '#6A0DAD',
                            color: '#FFFFFF',
                            width: 250,
                            padding: '10px',
                            borderRadius: 5,
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Enviar link de recuperação.
                    </button>
                </form>
            </div>
        </div>
    )
}
