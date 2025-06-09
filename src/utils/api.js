import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/usuario'
});

const apiJogo = axios.create({
  baseURL: 'http://localhost:8080/jogo'
});

const apiEmail = axios.create({
  baseURL: 'http://localhost:8080/email'
});

export function logout() {
  localStorage.removeItem('authToken');
  window.location.href = '/login';
}

function getAuthToken() {
  return localStorage.getItem('authToken');
}

const attachToken = config => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const handleAuthError = error => {
  if (error.response && (error.response.status === 401 || error.response.status === 403)) {
    logout();
  }
  return Promise.reject(error);
};

api.interceptors.request.use(attachToken, Promise.reject);
apiJogo.interceptors.request.use(attachToken, Promise.reject);
api.interceptors.response.use(response => response, handleAuthError);
apiJogo.interceptors.response.use(response => response, handleAuthError);

export function infomacesToken() {
  const token = getAuthToken();
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
}

export function buscarTodosUsuários() {
  return api.get('/buscarTodosUsuarios');
}

export async function fazerLogin(usuario, senha) {
  const response = await api.post("/login", { usuario, senha });
  localStorage.setItem('authToken', response.data.token);
  return response.data;
}

export async function fazendoCadastro(nome, usuario, dataDeNascimento, qntdJogosFeitos, senha, confirmarSenha, quantosGanho, quantosPerdeu, qntdDinheiro, role) {
  const response = await api.post("/addUsuario", { nome, usuario, dataDeNascimento, qntdJogosFeitos, senha, confirmarSenha, quantosGanho, quantosPerdeu, qntdDinheiro, role });
  return response.data;
}

export async function requisicaoParaTrocarDeSenha(usuario) {
  const response = await apiEmail.post("/recuperar-senha", { usuario });
  return response.data;
}

export async function buscarUsuarioLogado() {
  const response = await api.get("/home");
  return response.data;
}

export async function enviandoDadosIniciaisDaAposta(qntdBombas, apostaInicial) {
  const response = await apiJogo.post("/mines/dados", { qntdBombas, apostaInicial });
  return response.data;
}

export async function enviandoCaixaEscolhida(caixa_escolhida, idJogo, quantidadeDiamantesEncontrados) {
  const response = await apiJogo.post("/minesJogar", { caixa_escolhida, idJogo, quantidadeDiamantesEncontrados });
  return response.data;
}

export async function enviandoDadosAposParar(idJogo) {
  const response = await apiJogo.post(`/parar/${idJogo}`);
  return response.data;
}
