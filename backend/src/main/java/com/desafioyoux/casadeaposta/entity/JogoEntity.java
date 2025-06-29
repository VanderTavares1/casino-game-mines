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

    @Column(name = "valor_apostado")
    private Double valorApostado;

    @Column(name = "posicoes_bomba")
    private Set<Integer> posicoesBomba;

    @Column(name = "valor_ganho")
    private Double valorGanho;

    @Column(name = "posicao_escolhida")
    private Integer posicaoEscolhida;

    @Column(name = "saldo")
    private Double saldoUsuario;

    private Integer quantidadeDiamante;

    private Status status;

    @ManyToOne
    @JoinColumn(name = "usuario_id", referencedColumnName = "id")
    private UsuarioEntity usuario;

}
