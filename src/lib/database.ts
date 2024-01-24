// Get the client
import mysql from 'mysql2/promise';

// Create the connection to database
export const connection = await mysql.createConnection({
  host: process.env["DATABASE_HOST"],
  user: process.env["DATABASE_USERNAME"],
  password: process.env["DATABASE_PASSWORD"],
  database: process.env["DATABASE_DB"],
});