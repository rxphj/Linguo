CREATE TABLE benutzer
(
    id       INTEGER PRIMARY KEY  AUTOINCREMENT NOT NULL ,
    rolle    TEXT,
    username VARCHAR(255),
    password VARCHAR(255)
);

CREATE TABLE wort
(
    id   INTEGER  PRIMARY KEY AUTOINCREMENT NOT NULL,
    name VARCHAR(255) NULL,
    rubrik VARCHAR(255)
);
CREATE TABLE highscore
(
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    benutzerid INTEGER,
    wortid INTEGER,
    punkte INTEGER,
    FOREIGN KEY (benutzerid) REFERENCES benutzer(id),
    FOREIGN KEY (wortid) REFERENCES wort(id)
)