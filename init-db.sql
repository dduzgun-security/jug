-- Initialize databases for Jug services
CREATE DATABASE jug_users;
CREATE DATABASE jug_ratings;

-- Connect to jug_users database and create tables
\c jug_users;

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    age INTEGER,
    phone_number VARCHAR(255),
    status VARCHAR(255) NOT NULL DEFAULT 'active'
);

-- Connect to jug_ratings database and create tables
\c jug_ratings;

CREATE TABLE ratings (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    restaurant VARCHAR(255) NOT NULL,
    cheese_squeakiness INTEGER NOT NULL,
    gravy_thickness INTEGER NOT NULL,
    fries_crispiness INTEGER NOT NULL,
    size VARCHAR(50),
    comments TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_ratings_user_id ON ratings(user_id);
CREATE INDEX idx_ratings_restaurant ON ratings(restaurant);
CREATE INDEX idx_ratings_created_at ON ratings(created_at DESC);
