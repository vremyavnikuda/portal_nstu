-- +goose Up
-- SQL в этой секции будет выполнен при применении миграции

CREATE TABLE users
(
    user_id     SERIAL PRIMARY KEY,
    login       VARCHAR(255) UNIQUE NOT NULL,
    first_name  VARCHAR(255)        NOT NULL,
    last_name   VARCHAR(255)        NOT NULL,
    middle_name VARCHAR(255),
    user_age    VARCHAR(255),
    email       VARCHAR(255) UNIQUE NOT NULL,
    password    BYTEA               NOT NULL,
    gender      VARCHAR(50),
    b_days      DATE,
    role        VARCHAR(50)
);

CREATE TABLE user_temporary_data
(
    user_id           INTEGER PRIMARY KEY,
    login             VARCHAR(255) UNIQUE NOT NULL,
    registration_data TIMESTAMP,
    b_day             DATE,
    user_age          VARCHAR(255),
    last_login        TIMESTAMP,
    status            VARCHAR(50)
);

-- +goose Down
-- SQL в этой секции будет выполнен при откате миграции

DROP TABLE IF EXISTS user_temporary_data;
DROP TABLE IF EXISTS users;
