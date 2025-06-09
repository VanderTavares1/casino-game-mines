package com.desafioyoux.casadeaposta.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResultadoJogoDTO {
    private String resultado;
    private Double valorGanho;
}
