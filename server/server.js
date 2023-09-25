const http = require('http');
const app = require('./src/app');
const { mongoConnect } = require('./src/services/mongo');
const { loadPlanetsData } = require('./src/models/planets.model');

const PORT = process.env.PORT || 3001;

const server = http.createServer(app);

const startServer = async () => {
  try {
    await mongoConnect();
    await loadPlanetsData();

    server.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
};

startServer();

