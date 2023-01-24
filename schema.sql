
-- Create and use database
CREATE DATABASE IF NOT EXISTS cop4331small;
USE cop4331small;

-- Create entities
CREATE TABLE IF NOT EXISTS User (
    id INT NOT NULL AUTO_INCREMENT,
    website_username VARCHAR(255),
    website_password VARCHAR(255),

    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Contact (
    id INT NOT NULL AUTO_INCREMENT,
    creator_id INT NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(320),
    phone_number VARCHAR(10),
    time_created DATE DEFAULT(CURRENT_DATE),
    is_favorited BOOLEAN,

    PRIMARY KEY (id)
    FOREIGN KEY (creator_id) REFERENCES User(id) ON DELETE CASCADE
);
