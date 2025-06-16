CREATE TABLE Usuario_Entity(
    id SERIAL PRIMARY KEY,
    nome varchar(255) NOT NULL,
    usuario varchar(255) NOT NULL UNIQUE,
    data_de_nascimento DATE,
    qntdJogosFeitos INTEGER,
    senha varchar(8) NOT NULL,
    qntd_dinheiro DOUBLE PRECISION,
    quantos_ganho INTEGER,
    quantos_perdeu INTEGER,
    qntd_jogos_feitos INTEGER
);