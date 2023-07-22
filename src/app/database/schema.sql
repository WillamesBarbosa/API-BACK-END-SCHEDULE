CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; -- Necessário para gerar UUIDs

CREATE TABLE pacientes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nameComplete VARCHAR(100),
    email VARCHAR(100),
    passwordUser VARCHAR(100),
    verified boolean,
);

CREATE TABLE medico (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(100) NOT NULL,
    especialidade VARCHAR(50) NOT NULL,
    crm VARCHAR(20) NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(100)
);

CREATE TABLE horarios_disponiveis (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    data_hora TIMESTAMP WITH TIME ZONE,
    disponivel BOOLEAN NOT NULL DEFAULT TRUE,
    id_paciente UUID REFERENCES pacientes(id) ON DELETE SET NULL,
    id_medico UUID REFERENCES medico(id) ON DELETE SET NULL
);
