CREATE DATABASE IF NOT EXISTS dbconcessionaire CHARACTER SET 'utf8' COLLATE 'utf8_general_ci';

USE dbconcessionaire;

CREATE TABLE users(
    id                INT(255) AUTO_INCREMENT NOT NULL,
    role              VARCHAR(20),
    name              VARCHAR(255),
    surname           VARCHAR(255),
    password          VARCHAR(255),
    created_at        DATETIME DEFAULT NULL,
    updated_at        DATETIME DEFAULT NULL,
    remember_token    VARCHAR(255),

    CONSTRAINT pk_users_id PRIMARY KEY(id)
)ENGINE=INNODB;

CREATE TABLE cars(
    id                INT(255) AUTO_INCREMENT NOT NULL,
    user_id           INT(255) NOT NULL,
    title             VARCHAR(255),
    description       TEXT,
    price             VARCHAR(255),
    password          VARCHAR(255),
    status            VARCHAR(30),
    created_at        DATETIME DEFAULT NULL,
    updated_at        DATETIME DEFAULT NULL,

    CONSTRAINT pk_cars_id PRIMARY KEY(id),
    CONSTRAINT fk_cars_user_id FOREIGN KEY(user_id) REFERENCES users (id)
)ENGINE=INNODB;