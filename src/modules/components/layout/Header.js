import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

const useStyles = makeStyles(theme => ({
  linkStyle: {
      color: '#fff',
      textDecoration: 'none'
  },
  root: {
    flexGrow: 1,
  },
  title: {
    alignItems: 'center',
    background: '#28282a'
  }
}));

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function ElevationAppBar(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <React.Fragment>
        <CssBaseline />
        <ElevationScroll {...props}>
            <AppBar className={classes.title}>
              <Toolbar>
                <Typography variant="h6">
                  WYSZUKIWARKA
                </Typography>
              </Toolbar>
            </AppBar>
        </ElevationScroll>
        <Toolbar />
      </React.Fragment>

    </div>

  );
}
