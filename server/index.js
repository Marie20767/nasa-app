const http = require('http');
const app = require('./src/app');
const { loadPlanetsData } = require('./src/models/planets.model');

const PORT = process.env.PORT || 3001;

const server = http.createServer(app);

// await can only be called inside an async func for commonJS modules
const startServer = async () => {
  try {
    await loadPlanetsData();

    server.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

