USE competencias;

DROP TABLE IF EXISTS competencia;
CREATE TABLE competencia (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(300)
);

INSERT INTO competencia (nombre) VALUES ('¿Cuál es la mejor película?'),('¿Qué drama te hizo llorar más?'),('¿Cuál es la peli más bizarra?');

DROP TABLE IF EXISTS voto;
CREATE TABLE voto (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    competencia_id INT (11),
    pelicula_id INT (11) unsigned NOT NULL,
    FOREIGN KEY (competencia_id) REFERENCES competencia(id),
    FOREIGN KEY (pelicula_id) REFERENCES pelicula(id)
);

-- Agregando y Actualizando los campos en la tabla competencia
ALTER TABLE competencia ADD COLUMN genero_id INT (11) UNSIGNED, ADD FOREIGN KEY (genero_id) REFERENCES genero(id);
ALTER TABLE competencia ADD COLUMN director_id INT (11) UNSIGNED, ADD FOREIGN KEY (director_id) REFERENCES director(id);
ALTER TABLE competencia ADD COLUMN actor_id INT (11) UNSIGNED, ADD FOREIGN KEY (actor_id) REFERENCES actor(id);
-- Agrego la BAJA LOGICA DE LAS COMPETENCIAS 
ALTER TABLE competencia ADD COLUMN inactivo TINYINT(1) unsigned NOT NULL DEFAULT 0;

