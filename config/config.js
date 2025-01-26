require('dotenv').config(); // Load environment variables from .env

module.exports = {
  development: {
    username: process.env.POSTGRES_USER || 'root',
    password: process.env.POSTGRES_PASSWORD || null,
    database: process.env.POSTGRES_DATABASE || 'database_development',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 5432, // Default PostgreSQL port
    dialect: 'postgres', // Change to 'mysql', 'sqlite', etc., if needed
  },
  test: {
    username: process.env.POSTGRES_USER || 'root',
    password: process.env.POSTGRES_PASSWORD || null,
    database: process.env.POSTGRES_DATABASE || 'database_development',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 5432, // Default PostgreSQL port
    dialect: 'postgres',
  },
  production: {
    username: process.env.POSTGRES_USER || 'root',
    password: process.env.POSTGRES_PASSWORD || null,
    database: process.env.POSTGRES_DATABASE || 'database_development',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 5432, // Default PostgreSQL port
    dialect: 'postgres',
    logging: false, // Disable logging in production
  },
};
