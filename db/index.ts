import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';

const sqlite = new Database('sqlite.db');
export const db = drizzle(sqlite, { schema });

// Initialize database with tables if they don't exist
export async function initDb() {
  // Create users table
  await db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      passwordHash TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      profile_image TEXT,
      departement TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('platform_admin', 'departement_admin', 'user')),
      storage_limit INTEGER NOT NULL DEFAULT 1073741824, -- 1GB in bytes
      storage_used INTEGER NOT NULL DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create files table
  await db.run(`
    CREATE TABLE IF NOT EXISTS files (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      size INTEGER NOT NULL,
      path TEXT NOT NULL,
      user_id INTEGER NOT NULL,
      category_id INTEGER,
      is_shared BOOLEAN NOT NULL DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (category_id) REFERENCES categories(id)
    )
  `);

  // Create categories table
  await db.run(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      user_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  // Create shared_files table for peer-to-peer sharing
  await db.run(`
    CREATE TABLE IF NOT EXISTS shared_files (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      file_id INTEGER NOT NULL,
      sender_id INTEGER NOT NULL,
      receiver_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (file_id) REFERENCES files(id),
      FOREIGN KEY (sender_id) REFERENCES users(id),
      FOREIGN KEY (receiver_id) REFERENCES users(id)
    )
  `);

  // Create department_shared_files table for department-wide sharing
  await db.run(`
    CREATE TABLE IF NOT EXISTS department_shared_files (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      file_id INTEGER NOT NULL,
      sender_id INTEGER NOT NULL,
      departement TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (file_id) REFERENCES files(id),
      FOREIGN KEY (sender_id) REFERENCES users(id)
    )
  `);

  // Create department_collaborations table
  await db.run(`
    CREATE TABLE IF NOT EXISTS departement_collaborations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      source_departement TEXT NOT NULL,
      target_departement TEXT NOT NULL,
      is_approved BOOLEAN NOT NULL DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(source_departement, target_departement)
    )
  `);

  // Create file_types table
  await db.run(`
    CREATE TABLE IF NOT EXISTS file_types (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      mime_type TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Insert default file types
  await db.run(`
    INSERT OR IGNORE INTO file_types (name, mime_type) VALUES
    ('Document', 'application/pdf'),
    ('Image', 'image/*'),
    ('Video', 'video/*'),
    ('Audio', 'audio/*'),
    ('Archive', 'application/zip'),
    ('Spreadsheet', 'application/vnd.ms-excel'),
    ('Presentation', 'application/vnd.ms-powerpoint'),
    ('Text', 'text/plain')
  `);
} 