package com.desafioyoux.casadeaposta.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JogoMinesDTO {
    private Integer posic;
    private Integer qntdDiamantesEncontrados;
    private Double resultado;
}
