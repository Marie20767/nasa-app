const request = require('supertest');
const app = require('../../app');
const { mongoConnect, mongoDisconnect } = require('../../services/mongo');

describe('Launches API', () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe('Test GET /launches', () => {
    test('Gets all launches successfully', async () => {
      await request(app).get('/launches').expect(200);
    });
  });

  describe('Test POST /launches', () => {
    const launchDataWithoutDate = {
      mission: 'USS Enterprise',
      rocket: 'NCC 1701-D',
      destination: 'Kepler-62 f',
    };

    const completeLaunchData = {
      ...launchDataWithoutDate,
      launchDate: 'January 4, 2028',
    };

    test('Adds a launch successfully', async () => {
      const response = await request(app)
        .post('/launches')
        .send(completeLaunchData)
        .expect(201);

      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();

      expect(responseDate).toBe(requestDate);
      expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    test('Catches missing required properties when adding a launch', async () => {
      const response = await request(app)
        .post('/launches')
        .send(launchDataWithoutDate)
        .expect(400);

      expect(response.body).toStrictEqual({ error: 'Missing required launch property' });
    });

    test('Catches invalid dates when adding a launch', async () => {
      const launchDataWithInvalidDate = {
        ...completeLaunchData,
        launchDate: 'Date',
      };

      const response = await request(app)
        .post('/launches')
        .send(launchDataWithInvalidDate)
        .expect(400);

      expect(response.body).toStrictEqual({ error: 'Invalid launch date' });
    });
  });
});

