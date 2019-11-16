import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';
import TextField from '../components/TextField';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.secondary.light,
  },
  container: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
  },
  iconsWrapper: {
    height: 120,
  },
  icons: {
    display: 'flex',
  },
  icon: {
    width: 48,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.warning.main,
    marginRight: theme.spacing(1),
    '&:hover': {
      backgroundColor: theme.palette.warning.dark,
    },
  },
  list: {
    margin: 0,
    listStyle: 'none',
    paddingLeft: 0,
    alignItems: 'flex-start'
  },
  listItem: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    fontSize: 12,
  },
  language: {
    marginTop: theme.spacing(1),
    width: 150,
  },
}));

const LANGUAGES = [
  {
    code: 'pl-PL',
    name: 'Polski',
  },
  {
    code: 'en-US',
    name: 'English',
  },
];

export default function AppFooter() {
  const classes = useStyles();

  return (
    <Box borderTop={1} borderColor="grey.500">
      <Typography component="footer" className={classes.root}>
        <Container className={classes.container}>
          <Grid container spacing={5}>
            <Grid item xs={6} sm={4} md={2}>
              <Typography variant="h6" gutterBottom>
                Prawne
              </Typography>
              <ul className={classes.list}>
                <li className={classes.listItem}>
                  <Link href="/">Warunki i postanowienia</Link>
                </li>
                <li className={classes.listItem}>
                  <Link href="/">Polityka prywatności</Link>
                </li>
              </ul>
            </Grid>
            <Grid item xs={6} sm={8} md={4}>
              <Typography variant="h6" gutterBottom>
                Język
              </Typography>
              <TextField
                select
                SelectProps={{
                  native: true,
                }}
                className={classes.language}
              >
                {LANGUAGES.map(language => (
                  <option value={language.code} key={language.code}>
                    {language.name}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item>
              <Typography variant="caption">
                {'Icons made by '}
                {' from '}
                <Link href="https://www.flaticon.com" rel="nofollow" title="Flaticon">
                  www.flaticon.com
                </Link>
                {' is licensed by '}
                <Link
                  href="https://creativecommons.org/licenses/by/3.0/"
                  title="Creative Commons BY 3.0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CC 3.0 BY
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Typography>
    </Box>
  );
}
