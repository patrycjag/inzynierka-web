import React  from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '../components/Typography';

const styles = theme => ({
  typography: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
});

function TopTitle(props) {
  const { classes } = props;

  return (
    <Typography className={classes.typography} color="inherit" align="center" variant="h2">
      KOSZYK
    </Typography>
  );
}

TopTitle.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopTitle);
