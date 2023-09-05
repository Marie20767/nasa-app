import { API_DOMAIN } from '../constants';

const getRequest = async (endpoint, errorMessage) => {
  try {
    const response = await fetch(`${API_DOMAIN}${endpoint}`);
    const result = await response.json();

    if (!result.error) {
      return result;
    }

    return { error: errorMessage };
  } catch (e) {
    console.log(e);

    return { error: errorMessage };
  }
};

const submitLaunchRequest = async (launch) => {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
};

const abortLaunchRequest = async (id) => {
  // TODO: Once API is ready.
  // Delete launch with given ID.
};

export {
  getRequest,
  submitLaunchRequest,
  abortLaunchRequest,
};
