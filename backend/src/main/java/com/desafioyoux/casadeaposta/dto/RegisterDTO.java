package com.desafioyoux.casadeaposta.dto;

import com.desafioyoux.casadeaposta.entity.enums.Role;

public record RegisterDTO (String usuario, String senha, Role role){
}
