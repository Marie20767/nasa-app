import { Button, withStyles } from 'arwes';

const styles = {
  buttonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
};

const MoreResultsButton = ({ classes, onHandleMoreLaunchResults }) => {
  return (
    <div className={classes.buttonContainer}>
      <Button onClick={onHandleMoreLaunchResults} className={classes.button}>
        More results
      </Button>
    </div>
  );
};

export default withStyles(styles)(MoreResultsButton);
