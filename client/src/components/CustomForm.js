import { Button, Loading } from 'arwes';

import Clickable from './Clickable';

const CustomForm = ({ submitLaunch, selectorBody, entered, isPendingLaunch }) => {
  const today = new Date().toISOString().split('T')[0];

  return (
    <form
      onSubmit={submitLaunch}
      style={{ display: 'inline-grid', gridTemplateColumns: 'auto auto', gridGap: '10px 20px' }}>
      <label htmlFor="launch-day">Launch Date</label>
      <input
        type="date"
        id="launch-day"
        name="launch-day"
        min={today}
        max="2040-12-31"
        defaultValue={today} />
      <label htmlFor="mission-name">Mission Name</label>
      <input type="text" id="mission-name" name="mission-name" />
      <label htmlFor="rocket-name">Rocket Type</label>
      <input type="text" id="rocket-name" name="rocket-name" defaultValue="Explorer IS1" />
      <label htmlFor="planets-selector">Destination Exoplanet</label>
      <select id="planets-selector" name="planets-selector">
        {selectorBody}
      </select>
      <Clickable>
        <Button
          animate
          show={entered}
          type="submit"
          layer="success"
          disabled={isPendingLaunch}>
          Launch Mission ✔
        </Button>
      </Clickable>
      {isPendingLaunch
        ? <Loading animate small />
        : null
        }
    </form>
  );
};

export default CustomForm;
