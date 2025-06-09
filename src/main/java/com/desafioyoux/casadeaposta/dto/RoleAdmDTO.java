package com.desafioyoux.casadeaposta.dto;

import com.desafioyoux.casadeaposta.entity.enums.Role;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoleAdmDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private Role role;
    private Integer qntdJogosFeitos;
    private Double qntdDinheiro;
    private Double quantosGanho;
    private Double quantosPerdeu;
    private List<String> nomesDeTodosUsuarios;
    private Object valorGanho;
    private Integer qntdJogos;
}
