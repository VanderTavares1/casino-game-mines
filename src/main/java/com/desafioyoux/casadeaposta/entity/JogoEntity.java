package com.desafioyoux.casadeaposta.entity;

import com.desafioyoux.casadeaposta.entity.enums.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JogoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double valor_apostado;
    private Set<Integer> posicoes_bomba;
    private Integer valor_ganho;
    private Integer posicao_escolhida;
    private Status status;

//    @ManyToOne
//    private UsuarioEntity usuarioEntity;
}
