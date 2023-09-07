CREATE DATABASE myschedules;

-- Necessário para gerar UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de pacientes
CREATE TABLE IF NOT EXISTS patient (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    street_address VARCHAR(255),
    city VARCHAR(255),
    state_province VARCHAR(255),
    mobile_number VARCHAR(20),
    authorization_level smallint DEFAULT 0,
    is_verified boolean DEFAULT false
);

-- Tabela dos médicos
CREATE TABLE IF NOT EXISTS medic (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    street_address VARCHAR(255),
    city VARCHAR(255),
    state_province VARCHAR(255),
    mobile_number VARCHAR(20),
    crm VARCHAR(20) NOT NULL,
    specialization VARCHAR(255) NOT NULL,
    authorization_level smallint DEFAULT 1,
    is_verified boolean DEFAULT false
);

-- Tabela dos administradores
CREATE TABLE IF NOT EXISTS admin (
   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    authorization_level smallint DEFAULT 2,
    is_verified boolean DEFAULT false
);

-- Tabela dos horários
CREATE TABLE IF NOT EXISTS available_times (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date_time TIMESTAMP WITH TIME ZONE,
    available BOOLEAN NOT NULL DEFAULT TRUE,
    id_patient UUID REFERENCES patient(id) ON DELETE SET NULL,
    id_medic UUID REFERENCES medic(id) ON DELETE SET NULL
);

-- Tabela de histórico
CREATE TABLE IF NOT EXISTS medical_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patient(id) NOT NULL,
    medic_id UUID REFERENCES medic(id) NOT NULL,
    consultation_date TIMESTAMP WITH TIME ZONE NOT NULL,
    diagnosis TEXT,
    treatment_plan TEXT,
    prescription TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- INDÍCES
