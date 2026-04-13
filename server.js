import express from 'express';
import cors from 'cors';
import routes from './route.js';
import { init, closeConnection } from './src/db/db.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/', routes);

let server;

// Start server
const startServer = async () => {
  try {
    await init();
    console.log("Database connected");

    server = app.listen(PORT, () => {
      console.log(`My APIs are listening at port: ${PORT}`);
    });

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Graceful shutdown
const shutdown = async () => {
  console.log("Shutting down server...");

  try {
    if (server) {
      server.close(async () => {
        await closeConnection();
        console.log("Database connection closed");
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  } catch (error) {
    console.error("Error during shutdown:", error);
    process.exit(1);
  }
};

// Handle process signals
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// Start app
startServer();