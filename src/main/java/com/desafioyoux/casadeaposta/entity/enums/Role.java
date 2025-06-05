package com.desafioyoux.casadeaposta.entity.enums;

public enum Role {
    ADM("admin"),
    USUARIO("usuario");

    private String role;

    Role(String role){
        this.role = role;
    }

    public String getRole(){
        return role;
    }
}
