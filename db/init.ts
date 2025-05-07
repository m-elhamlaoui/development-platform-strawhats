import { initDb } from './index';

async function main() {
  try {
    await initDb();
    console.log('Database initialized successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

main(); 