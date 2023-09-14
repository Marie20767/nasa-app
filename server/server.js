const http = require('http');
const mongoose = require('mongoose');
const app = require('./src/app');
const { loadPlanetsData } = require('./src/models/planets.model');
const { DB_USERNAME, DB_PASSWORD } = require('./src/constants/database');

const PORT = process.env.PORT || 3001;

const MONGO_URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.oxcxsoi.mongodb.net/?retryWrites=true&w=majority`;

const server = http.createServer(app);

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    await loadPlanetsData();

    server.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
};

startServer();

