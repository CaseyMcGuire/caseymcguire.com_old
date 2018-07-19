CREATE TABLE users (
  id SERIAL NOT NULL UNIQUE,
  username VARCHAR(45) NOT NULL,
  password VARCHAR(60) NOT NULL,
  email TEXT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE posts (
  id serial NOT NULL UNIQUE,
  user_id INTEGER NOT NULL,
  title TEXT,
  contents TEXT,
  PRIMARY KEY (id),
  CONSTRAINT fk_id FOREIGN KEY (user_id) REFERENCES users (id)
);