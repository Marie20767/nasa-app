const request = require('supertest');
const app = require('../../app');
const { mongoConnect, mongoDisconnect } = require('../../services/mongo');
const { loadPlanetsData } = require('../../models/planets.model');

const currentAPIVersion = 'v1';

describe('Launches API', () => {
  beforeAll(async () => {
    await mongoConnect();
    await loadPlanetsData();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe('Test GET /launches', () => {
    test('Gets upcoming launches successfully', async () => {
      await request(app).get(`/${currentAPIVersion}/launches/upcoming/1`).expect(200);
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
        .post(`/${currentAPIVersion}/launches`)
        .send(completeLaunchData)
        .expect(201);

      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();

      expect(responseDate).toBe(requestDate);
      expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    test('Catches missing required properties when adding a launch', async () => {
      const response = await request(app)
        .post(`/${currentAPIVersion}/launches`)
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
        .post(`/${currentAPIVersion}/launches`)
        .send(launchDataWithInvalidDate)
        .expect(400);

      expect(response.body).toStrictEqual({ error: 'Invalid launch date' });
    });
  });
});

