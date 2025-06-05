package com.desafioyoux.casadeaposta.repository;

import com.desafioyoux.casadeaposta.entity.UsuarioEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioEntity, Long> {
    Optional<UsuarioEntity> findByUsuario(String usuario);

    @Query(value = "SELECT nome FROM usuario_entity WHERE usuario = ?1", nativeQuery = true)
    Optional<String> findNomeByEmail(String email);

    @Query(value = "SELECT nome FROM usuario_entity", nativeQuery = true)
    List<String> buscandoTodosUsuarios();

    @Query(value = "SELECT qntd_dinheiro FROM usuario_entity", nativeQuery = true)
    Double valorDepositado();
}
