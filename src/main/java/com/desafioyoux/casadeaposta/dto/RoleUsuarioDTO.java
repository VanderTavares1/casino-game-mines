package com.desafioyoux.casadeaposta.dto;

import com.desafioyoux.casadeaposta.entity.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoleUsuarioDTO {
    private Role role;
    private String nome;
    private Integer qntdJogosFeitos;
    private Double qntdDinheiro;
    private Double quantosGanho;
    private Double quantosPerdeu;
    private Integer qntdJogos;
}
