import mysql from "mysql2/promise";
import dotenv from "dotenv";
import path from "path";

// dotenv.config();
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const { DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD, DATABASE } =
  process.env;

if (!DATABASE_HOST || !DATABASE_USER || !DATABASE_PASSWORD || !DATABASE) {
  throw new Error("Missing database environment variables.");
}

const db = mysql.createPool({
  host: DATABASE_HOST,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD ? DATABASE_PASSWORD : "",
  database: DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default db;
