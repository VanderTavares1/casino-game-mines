package com.desafioyoux.casadeaposta.dto;

import com.desafioyoux.casadeaposta.entity.enums.Role;

import java.util.Date;

public class UsuarioDTO {
    private String usuario;
    private Date dataDeNascimento;
    private Double qntdDinheiro;
    private Integer quantosGanho;
    private Integer quantosPerdeu;
    private Role role;

    public UsuarioDTO(){
    }

    public UsuarioDTO(String usuario, Date dataDeNascimento, Integer quantosGanho, Integer quantosPerdeu, Double qntdDinheiro, Role role) {
        this.usuario = usuario;
        this.dataDeNascimento = dataDeNascimento;
        this.quantosGanho = quantosGanho;
        this.quantosPerdeu = quantosPerdeu;
        this.qntdDinheiro = qntdDinheiro;
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

    public Integer getQuantosPerdeu() {
        return quantosPerdeu;
    }

    public void setQuantosPerdeu(Integer quantosPerdeu) {
        this.quantosPerdeu = quantosPerdeu;
    }

    public Double getQntdDinheiro() {
        return qntdDinheiro;
    }

    public void setQntdDinheiro(Double qntdDinheiro) {
        this.qntdDinheiro = qntdDinheiro;
    }

    public Integer getQuantosGanho() {
        return quantosGanho;
    }

    public void setQuantosGanho(Integer quantosGanho) {
        this.quantosGanho = quantosGanho;
    }
}
