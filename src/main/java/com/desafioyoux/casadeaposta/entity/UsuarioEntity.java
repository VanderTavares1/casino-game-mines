package com.desafioyoux.casadeaposta.entity;
import com.desafioyoux.casadeaposta.entity.enums.Role;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class UsuarioEntity implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String usuario;

    @Column(name = "data_de_nascimento")
    private Date dataDeNascimento;

    @Column(name = "qntd_jogos_feitos")
    private Integer qntdJogosFeitos;
    private String senha;

    @Column(name = "qntd_dinheiro")
    private Double qntdDinheiro;

    @Column(name = "quantos_ganho")
    private Double quantosGanho;

    @Column(name = "quantos_perdeu")
    private Double quantosPerdeu;

    private Integer jogosFeitos = 0;

    @Enumerated(EnumType.STRING)
    private Role role;

    public UsuarioEntity(String usuario, String encryptedPassword, Role role) {
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (this.role == Role.ADM)
            return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"), new SimpleGrantedAuthority("ROLE_USUARIO"));
        return List.of(new SimpleGrantedAuthority("ROLE_USUARIO"));
    }

    @Override
    public String getPassword() {
        return senha;
    }

    @Override
    public String getUsername() {
        return usuario;
    }

    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled() { return true; }
}
