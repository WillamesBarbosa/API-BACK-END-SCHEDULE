CREATE TABLE pacientes (
    id serial PRIMARY KEY,
    name varchar(100),
    email varchar(100),
    cell_phone varchar(100),
    password varchar(100),
    verified boolean,
    permission NOT NULL DEFAULT false
);

CREATE TABLE hours_and_date (
    id serial PRIMARY KEY,
    data_hora timestamp with time zone,
    disponivel boolean NOT NULL DEFAULT true,
    id_paciente integer REFERENCES pacientes(id) ON DELETE SET NULL
    id_agent integer REFERENCES agent(id) ON DELETE SET NULL
);

CREATE TABLE agent (
    id serial PRIMARY KEY,
    name varchar(100),
    identifier_number varchar(100),
    password varchar(100),
    permission NOT NULL DEFAULT true,
);
