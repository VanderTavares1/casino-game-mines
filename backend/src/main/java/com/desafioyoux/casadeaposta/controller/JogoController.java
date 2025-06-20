package com.desafioyoux.casadeaposta.controller;

import com.desafioyoux.casadeaposta.dto.EscolhaUsuarioDTO;
import com.desafioyoux.casadeaposta.dto.InfosMinesDto;
import com.desafioyoux.casadeaposta.dto.ResultadoJogoDTO;
import com.desafioyoux.casadeaposta.entity.UsuarioEntity;
import com.desafioyoux.casadeaposta.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/jogo")
public class JogoController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/mines/dados")
    public Long valorInicialEQntdBombas (@AuthenticationPrincipal UsuarioEntity usuarioEntity, @RequestBody InfosMinesDto infos) {
        return usuarioService.iniciarJogo(infos, usuarioEntity);
    }

    @PostMapping("/minesJogar")
    public ResultadoJogoDTO verifDimaOuBomba (@RequestBody EscolhaUsuarioDTO escolhaUsuarioDTO) {
        return usuarioService.verifDimaOuBomba(escolhaUsuarioDTO);
    }

    @PostMapping("/parar/{id}")
    public Double pararJogo(@PathVariable Long id){
        return usuarioService.pararJogo(id);
    }
}
