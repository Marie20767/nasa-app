const launch = {
  flightNumber: 100,
  mission: 'Hello World',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  destination: 'Kepler-442 b',
  customers: ['NASA', 'Marie\'s Team'],
  upcoming: true,
  success: true,
};

const unsortedLaunches = [
  {
    flightNumber: 101,
    mission: 'SpaceX Crazy Mission',
    rocket: 'Explorer IS1',
    launchDate: new Date('November 27, 2029'),
    destination: 'Kepler-442 b',
    customers: ['Marie\'s Team'],
    upcoming: true,
    success: true,
  },
  launch,
];
const launches = unsortedLaunches.sort((a, b) => a.flightNumber - b.flightNumber);

module.exports = {
  launches,
};
