package com.desafioyoux.casadeaposta.service;

import com.desafioyoux.casadeaposta.dto.*;
import com.desafioyoux.casadeaposta.entity.JogoEntity;
import com.desafioyoux.casadeaposta.entity.UsuarioEntity;
import com.desafioyoux.casadeaposta.entity.enums.Role;
import com.desafioyoux.casadeaposta.repository.JogoRepository;
import com.desafioyoux.casadeaposta.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.*;

@Service
public class UsuarioService {

    public Optional<UsuarioEntity> buscarPorId;
    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    JogoRepository jogoRepository;

    private Set<Integer> bombasSorteadas;

    @Autowired
    PasswordEncoder passwordEncoder;


    public UsuarioDTO adicionandoUsuario(UsuarioEntity addUsuario) {
        try {
            addUsuario.setSenha(passwordEncoder.encode(addUsuario.getSenha()));
            usuarioRepository.save(addUsuario);

            UsuarioDTO usuarioDTO = new UsuarioDTO();

            usuarioDTO.setUsuario(addUsuario.getUsuario());
            usuarioDTO.setRole(addUsuario.getRole());
            usuarioDTO.setQntdDinheiro(addUsuario.getQntdDinheiro());
            usuarioDTO.setDataDeNascimento(addUsuario.getDataDeNascimento());
            usuarioDTO.setQuantosPerdeu(addUsuario.getQuantosPerdeu());
            usuarioDTO.setQuantosGanho(addUsuario.getQuantosGanho());

            return usuarioDTO;
        } catch (Exception e) {
            throw new RuntimeException("Erro ao salvar usuário: " + e.getMessage());
        }
    }

    public List<UsuarioEntity> findAll() {
        try {
            return usuarioRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Erro ao trazer todos usuários: " + e.getMessage());
        }
    }

    public UserDetails loadUserByUsername(String usuario) throws UsernameNotFoundException {
        return usuarioRepository.findByUsuario(usuario).orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado com o nome: " + usuario));
    }


    public void cadastrarUsuario(UsuarioEntity data) {
        UsuarioEntity newUser = new UsuarioEntity();
        newUser.setUsuario(data.getUsuario());
        newUser.setSenha(passwordEncoder.encode(data.getPassword()));
        newUser.setRole(data.getRole());
        usuarioRepository.save(newUser);
    }

    public UsuarioEntity getUsuarioLogado() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            String username = ((UserDetails) principal).getUsername();
            return usuarioRepository.findByUsuario(username).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        }
        return null;
    }

    public Object verificandoTipoRole(){
        UsuarioEntity usuario = getUsuarioLogado();
        if (usuario.getRole() == Role.ADM){
            RoleAdmDTO roleAdmDTO = new RoleAdmDTO();
            roleAdmDTO.setRole(usuario.getRole());
            roleAdmDTO.setNome(usuario.getNome());
            roleAdmDTO.setQuantosGanho(usuario.getQuantosGanho());
            roleAdmDTO.setQntdDinheiro(usuario.getQntdDinheiro());
            roleAdmDTO.setQuantosPerdeu(usuario.getQuantosPerdeu());
            roleAdmDTO.setNomesDeTodosUsuarios(usuarioRepository.buscandoTodosUsuarios());
            roleAdmDTO.setQntdJogos(usuario.getJogosFeitos());

            return roleAdmDTO;
        }else {
            RoleUsuarioDTO roleUsuarioDTO = new RoleUsuarioDTO();
            roleUsuarioDTO.setRole(usuario.getRole());
            roleUsuarioDTO.setNome(usuario.getNome());
            roleUsuarioDTO.setQntdDinheiro(usuario.getQntdDinheiro());
            roleUsuarioDTO.setQuantosPerdeu(usuario.getQuantosPerdeu());
            roleUsuarioDTO.setQuantosGanho(usuario.getQuantosGanho());
            roleUsuarioDTO.setQntdJogos(usuario.getJogosFeitos());

            return roleUsuarioDTO;
        }
    }

    public Long valorInicialEQntdBombas(InfosMinesDto infos, UsuarioEntity usuarioEntity) {
        System.out.println("id jogador >>>>>>>>>>> " + usuarioEntity.getId());
        Set<Integer> posicDasBombas = new HashSet<>();
        Random sorteio = new Random();
        JogoEntity jogoEntity = new JogoEntity();
        jogoEntity.setValorApostado(infos.getApostaInicial());

        if (usuarioEntity.getQntdDinheiro() < jogoEntity.getValorApostado()){
            throw new IllegalArgumentException("Valor apostado não pode ser maior que seu saldo!");
        }
        if (jogoEntity.getValorApostado() == null || jogoEntity.getValorApostado() == 0 && infos.getQntdBombas() == null){
            throw new IllegalArgumentException("Adicione os valores necessários para iniciar a rodada!");
        }

        while (posicDasBombas.size() < infos.getQntdBombas()) {
            posicDasBombas.add(sorteio.nextInt(25));
        }
        jogoEntity.setPosicoesBomba(posicDasBombas);

        jogoEntity.setUsuario(usuarioEntity);
        jogoEntity.setSaldoUsuario(usuarioEntity.getQntdDinheiro());
        var jogo = jogoRepository.save(jogoEntity);
        return jogo.getId();
    }

    public ResultadoJogoDTO verifDimaOuBomba(EscolhaUsuarioDTO escolhaUsuarioDTO) {
        JogoEntity jogo = jogoRepository.findById(escolhaUsuarioDTO.getIdJogo()).orElseThrow();
        UsuarioEntity usuario = jogo.getUsuario();

        if (jogo.getPosicoesBomba().contains(escolhaUsuarioDTO.getCaixa_escolhida())) { // perdeu
            double novoSaldo = usuario.getQntdDinheiro() - jogo.getValorApostado();
            usuario.setQntdDinheiro(novoSaldo);
            usuario.setQuantosPerdeu(usuario.getQuantosPerdeu() + jogo.getValorApostado());

            jogo.setValorGanho(jogo.getValorApostado() - jogo.getValorGanho());
            usuario.setQuantosGanho(jogo.getValorApostado() - jogo.getValorGanho());
            jogo.setQuantidadeDiamante(0);
            usuarioRepository.save(usuario);
            jogoRepository.save(jogo);
            return new ResultadoJogoDTO("BOMBA", 0.0);
        } else {
            var quantidadeBombas = jogo.getPosicoesBomba().size();
            Double retornoDimas = jogo.getValorApostado() * (1 + escolhaUsuarioDTO.getQuantidadeDiamantesEncontrados()) * (quantidadeBombas / 10.0);
            jogo.setValorGanho(retornoDimas);
            jogo.setQuantidadeDiamante(escolhaUsuarioDTO.getQuantidadeDiamantesEncontrados());

//            usuario.setQuantosGanho(usuario.getQuantosGanho() + retornoDimas);

            usuarioRepository.save(usuario);
            jogoRepository.save(jogo);
            return new ResultadoJogoDTO("DIAMANTE", retornoDimas);
        }
    }

    public Long iniciarJogo(InfosMinesDto infos, UsuarioEntity usuarioEntity) {
        usuarioEntity.setJogosFeitos(getUsuarioLogado().getJogosFeitos() + 1);
        usuarioRepository.save(usuarioEntity);
        return valorInicialEQntdBombas(infos, usuarioEntity);
    }

    public Double pararJogo(Long id) {
        JogoEntity jogo = jogoRepository.findById(id).orElseThrow();
        UsuarioEntity usuario = usuarioRepository.findById(jogo.getUsuario().getId()).orElseThrow();

        usuario.setQntdDinheiro(usuario.getQntdDinheiro() + jogo.getValorGanho());

        usuarioRepository.save(usuario);
        jogoRepository.save(jogo);

        return jogo.getValorGanho();
    }
}
