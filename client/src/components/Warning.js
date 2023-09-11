import { withStyles } from 'arwes';

import { colors } from '../constants/colors';

const styles = () => ({
  warningContainer: {
    border: `1px solid ${colors.red}`,
    padding: '0px 10px',
    marginBottom: '10px',
  },
  errorMessage: {
    color: colors.red,
    fontSize: '17px',
  },
});

const Warning = ({ errorMessage, classes }) => {
  return (
    <div className={classes.warningContainer}>
      <p className={classes.errorMessage}>{`✖ ${errorMessage}`}</p>
    </div>
  );
};

export default withStyles(styles)(Warning);
