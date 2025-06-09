package com.desafioyoux.casadeaposta.dto;

import com.desafioyoux.casadeaposta.entity.enums.Role;

import java.util.Date;

public class UsuarioDTO {
    private String usuario;
    private Date dataDeNascimento;
    private Double qntdDinheiro;
    private Double quantosGanho;
    private Double quantosPerdeu;
    private Role role;

    public UsuarioDTO(){
    }

    public UsuarioDTO(Date dataDeNascimento, Double quantosPerdeu, Double quantosGanho, Double qntdDinheiro, String usuario, Role role) {
        this.dataDeNascimento = dataDeNascimento;
        this.quantosPerdeu = quantosPerdeu;
        this.quantosGanho = quantosGanho;
        this.qntdDinheiro = qntdDinheiro;
        this.usuario = usuario;
        this.role = role;
    }

    public Date getDataDeNascimento() {
        return dataDeNascimento;
    }

    public void setDataDeNascimento(Date dataDeNascimento) {
        this.dataDeNascimento = dataDeNascimento;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Double getQntdDinheiro() {
        return qntdDinheiro;
    }

    public void setQntdDinheiro(Double qntdDinheiro) {
        this.qntdDinheiro = qntdDinheiro;
    }

    public Double getQuantosGanho() {
        return quantosGanho;
    }

    public void setQuantosGanho(Double quantosGanho) {
        this.quantosGanho = quantosGanho;
    }

    public Double getQuantosPerdeu() {
        return quantosPerdeu;
    }

    public void setQuantosPerdeu(Double quantosPerdeu) {
        this.quantosPerdeu = quantosPerdeu;
    }
}
