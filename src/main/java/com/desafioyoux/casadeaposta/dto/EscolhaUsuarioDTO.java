package com.desafioyoux.casadeaposta.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EscolhaUsuarioDTO {
    private Integer caixa_escolhida;
    private Long idJogo;
}
