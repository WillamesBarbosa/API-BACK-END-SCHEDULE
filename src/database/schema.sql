-- Necessário para gerar UUIDs
CREATE DATABASE myschedules;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS pacientes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nameComplete VARCHAR,
    email VARCHAR,
    passwordUser VARCHAR,
    verified boolean
    authLevel smallint
);

CREATE TABLE IF NOT EXISTS medico (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR NOT NULL,
    especialidade VARCHAR(50) NOT NULL,
    crm VARCHAR(20) NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR
    authLevel smallint
);

CREATE TABLE IF NOT EXISTS horarios_disponiveis (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    data_hora TIMESTAMP WITH TIME ZONE,
    disponivel BOOLEAN NOT NULL DEFAULT TRUE,
    id_paciente UUID REFERENCES pacientes(id) ON DELETE SET NULL,
    id_medico UUID REFERENCES medico(id) ON DELETE SET NULL
);
