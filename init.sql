CREATE DATABASE IF NOT EXISTS identity;

USE identity;

DROP TABLE IF EXISTS user_info;

CREATE TABLE IF NOT EXISTS user_info (id BIGINT NOT NULL AUTO_INCREMENT KEY, created_at DATETIME,
  ipfs_hash VARCHAR(512) UNIQUE, email varchar(512) UNIQUE, eth_address VARCHAR(512) UNIQUE,
  verified BOOLEAN DEFAULT FALSE, verification_hash VARCHAR(512));