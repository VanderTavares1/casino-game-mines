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

            return roleAdmDTO;
        }else {
            RoleUsuarioDTO roleUsuarioDTO = new RoleUsuarioDTO();
            roleUsuarioDTO.setRole(usuario.getRole());
            roleUsuarioDTO.setNome(usuario.getNome());
            roleUsuarioDTO.setQntdDinheiro(usuario.getQntdDinheiro());
            roleUsuarioDTO.setQuantosPerdeu(usuario.getQuantosPerdeu());
            roleUsuarioDTO.setQuantosGanho(usuario.getQuantosGanho());

            return roleUsuarioDTO;
        }
    }

    public Long valorInicialEQntdBombas(InfosMinesDto infos) {
        Random sorteio = new Random();
        JogoEntity jogoEntity = new JogoEntity();
        jogoEntity.setValor_apostado(infos.getApostaInicial());

        Set<Integer> posicDasBombas = new HashSet<>();

        while (posicDasBombas.size() < infos.getQntdBombas()) {
            posicDasBombas.add(sorteio.nextInt(25));
            jogoEntity.setPosicoes_bomba(posicDasBombas);
        }
        var jogo = jogoRepository.save(jogoEntity);
        return jogo.getId();
    }

    public String verifDimaOuBomba(EscolhaUsuarioDTO escolhaUsuarioDTO) {

        JogoEntity jogo = jogoRepository.findById(escolhaUsuarioDTO.getIdJogo()).orElseThrow();

        if (jogo.getPosicoes_bomba().contains(escolhaUsuarioDTO.getCaixa_escolhida())) {
            //lógica de perder o jogo
            return "BOMBA";
        } else {
            //lógica de ganhar o jogo e somar os valores
            return "DIAMANTE";
        }
    }



    public Long iniciarJogo(InfosMinesDto infos) {
        return valorInicialEQntdBombas(infos);
    }
}
