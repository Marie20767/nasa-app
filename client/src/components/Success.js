import { withStyles } from 'arwes';

import { colors } from '../constants/colors';

const styles = () => ({
  successContainer: {
    border: `1px solid ${colors.green}`,
    padding: '0px 10px',
    marginBottom: '10px',
  },
  successMessage: {
    color: colors.green,
    fontSize: '17px',
  },
});

const Success = ({ successMessage, classes }) => {
  return (
    <div className={classes.successContainer}>
      <p className={classes.successMessage}>{`✔ ${successMessage}`}</p>
    </div>
  );
};

export default withStyles(styles)(Success);
