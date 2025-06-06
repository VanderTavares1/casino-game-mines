package com.desafioyoux.casadeaposta.repository;

import com.desafioyoux.casadeaposta.entity.JogoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface JogoRepository extends JpaRepository<JogoEntity, Long> {
    @Query(value = "SELECT valor_apostado FROM jogo_entity", nativeQuery = true)
    Double valorInicialApostado();
}
