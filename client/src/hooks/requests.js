import { API_DOMAIN } from '../constants/constants';

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
  const newLaunch = {
    ...launch,
    launchDate: launch.launchDate.toISOString(),
  };

  try {
    const response = await fetch(`${API_DOMAIN}/launches`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(newLaunch),
    });

    const result = await response.json();

    if (result.error) {
      console.log(result.error);

      return { error: result.error };
    }

    return result;
  } catch (e) {
    console.log('>>> e: ', e);

    return { error: 'Failed to launch mission' };
  }
};

const abortLaunchRequest = async (launchId) => {
  try {
    const response = await fetch(`${API_DOMAIN}/launches/${launchId}`, { method: 'DELETE' });

    const result = await response.json();

    if (result.error) {
      console.log(result.error);

      return { error: result.error };
    }

    return result;
  } catch (e) {
    console.log('>>> e: ', e);

    return { error: 'Failed to abort mission' };
  }
};

export {
  getRequest,
  submitLaunchRequest,
  abortLaunchRequest,
};
