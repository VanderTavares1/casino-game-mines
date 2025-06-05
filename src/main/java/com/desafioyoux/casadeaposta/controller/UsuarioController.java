package com.desafioyoux.casadeaposta.controller;
import com.desafioyoux.casadeaposta.dto.*;
import com.desafioyoux.casadeaposta.entity.JogoEntity;
import com.desafioyoux.casadeaposta.entity.UsuarioEntity;
import com.desafioyoux.casadeaposta.infra.TokenService;
import com.desafioyoux.casadeaposta.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    UsuarioService usuarioService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/addUsuario")
    public UsuarioDTO adicionandoUsuario(@RequestBody UsuarioEntity addUsuario){
        return usuarioService.adicionandoUsuario(addUsuario);
    }

    @GetMapping("/buscarTodosUsuarios")
    public List<UsuarioEntity> findAll(){
        return usuarioService.findAll();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Validated AuthenticationDTO data){
        var usuarioSenha = new UsernamePasswordAuthenticationToken(data.usuario(), data.senha());
        var auth = authenticationManager.authenticate(usuarioSenha);
        var token = tokenService.generateToken((UsuarioEntity) auth.getPrincipal());
        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @GetMapping("/home")
    public Object verificandoTipoRole() {
        Object usuario = usuarioService.verificandoTipoRole();
        return usuario;
    }

    @PostMapping("/mines/dados")
    public Long valorInicialEQntdBombas (@RequestBody InfosMinesDto infos) {
        return usuarioService.iniciarJogo(infos);
    }


    @PostMapping("/minesJogar")
    public String verifDimaOuBomba (@RequestBody EscolhaUsuarioDTO escolhaUsuarioDTO) {
        return usuarioService.verifDimaOuBomba(escolhaUsuarioDTO);
    }
}