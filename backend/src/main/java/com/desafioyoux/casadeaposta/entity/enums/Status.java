package com.desafioyoux.casadeaposta.entity.enums;

public enum Status {
    JOGANDO("jogando"),
    GANHOU("ganhou"),
    PERDEU("perdeu");

    private String status;

    Status(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }
}
