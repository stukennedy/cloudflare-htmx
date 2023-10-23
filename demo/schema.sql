DROP TABLE IF EXISTS auth_tokens;
CREATE TABLE auth_tokens (email TEXT PRIMARY KEY, token TEXT, type TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  uid TEXT PRIMARY KEY, 
  email TEXT, 
  first_name TEXT, 
  last_name TEXT,
  password TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  active BOOLEAN DEFAULT 1,
  verified BOOLEAN DEFAULT 1
);
