CREATE TABLE Jogo_Entity(
    id SERIAL PRIMARY KEY,
    valor_apostado DOUBLE PRECISION,
    valor_ganho DOUBLE PRECISION,
    posicao_escolhida INTEGER,
    usuario_id INTEGER,
    saldo DOUBLE PRECISION,
    CONSTRAINT fk_jogo_usuario FOREIGN KEY(usuario_id) REFERENCES Usuario_Entity(id)
);
