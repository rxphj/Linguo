CREATE TABLE user
(
    id       BIGINT AUTO_INCREMENT NOT NULL,
    rolle    SMALLINT              NULL,
    username VARCHAR(255)          NULL,
    password VARCHAR(255)          NULL,
    CONSTRAINT pk_user PRIMARY KEY (id)
);

CREATE TABLE wort
(
    id   BIGINT AUTO_INCREMENT NOT NULL,
    name VARCHAR(255)          NULL,
    CONSTRAINT pk_wort PRIMARY KEY (id)
);