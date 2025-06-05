package com.desafioyoux.casadeaposta.controller;

import com.desafioyoux.casadeaposta.dto.EscolhaUsuarioDTO;
import com.desafioyoux.casadeaposta.dto.InfosMinesDto;
import com.desafioyoux.casadeaposta.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/jogo")
public class JogoController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/mines/dados")
    public Long valorInicialEQntdBombas (@RequestBody InfosMinesDto infos) {
        return usuarioService.iniciarJogo(infos);
    }

    @PostMapping("/minesJogar")
    public String verifDimaOuBomba (@RequestBody EscolhaUsuarioDTO escolhaUsuarioDTO) {
        return usuarioService.verifDimaOuBomba(escolhaUsuarioDTO);
    }
}
