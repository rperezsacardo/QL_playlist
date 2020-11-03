CREATE TABLE account(
  id                 BIGSERIAL PRIMARY KEY,
  username           VARCHAR(64),
  email              VARCHAR(64),
  "passwordHash"     VARCHAR(64),
  "adminPrivileges"  BOOLEAN NOT NULL,
  premium            BOOLEAN NOT NULL,
  playlist           JSON [] 
)