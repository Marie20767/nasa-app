import { Button, withStyles } from 'arwes';

const styles = {
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
};

const MoreResultsButton = ({ classes, onHandleMoreLaunchResults }) => {
  return (
    <div className={classes.buttonContainer}>
      <Button onClick={onHandleMoreLaunchResults}>
        More results
      </Button>
    </div>
  );
};

export default withStyles(styles)(MoreResultsButton);
