import express from 'express';
import routes from './route.js';
import cors from 'cors'
import { init, closeConnection } from './src/db/db.js'


const app = express();

app.use(cors());
app.use(express.json());

// Use the routes
app.use('/', routes);

(async () => {
  const db = await init();
  const port = 3001;

  const server = app.listen(port, () => {
    console.log(`My apis are listening at port: ${port}`)

    const shutdown = async () => {
      console.log("shutting down...");
      server.close(async () => {
        await closeConnection();
        process.exit(0);
      })
    }

    process.on('SIGINT', shutdown)
    process.on('SIGTERM', shutdown)

  })
  

})()


