import React  from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Link, useHistory} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
  paper: {
    width: "75%",
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  table: {
   minWidth: 650,
 },
  block: {
    display: 'block',
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: '40px 16px',
  },
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  row: {
    width: '100%',
  },
  app: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    padding: theme.spacing(6, 4),
    background: '#eaeff1',
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    justifyContent: 'center',
  },
});

function Content(props) {
  const { classes } = props;
  const [selected, setSelected] = React.useState([]);
  const [product, setProduct] = React.useState('Wpisz nazwę produktu, który chcesz wyszukać');

  let history = useHistory();

  const handleChange = event => {
    setProduct(event.target.value);
  }
  const handleClick = (event, name) => {
   const selectedIndex = selected.indexOf(name);
   let newSelected = [];

   if (selectedIndex === -1) {
     newSelected = newSelected.concat(selected, name);
   } else if (selectedIndex === 0) {
     newSelected = newSelected.concat(selected.slice(1));
   } else if (selectedIndex === selected.length - 1) {
     newSelected = newSelected.concat(selected.slice(0, -1));
   } else if (selectedIndex > 0) {
     newSelected = newSelected.concat(
       selected.slice(0, selectedIndex),
       selected.slice(selectedIndex + 1),
     );
   }

   setSelected(newSelected);
 }

 const isSelected = name => selected.indexOf(name) !== -1;

 const handleOnClick = ( id, name) => {
   localStorage.setItem(id, name);
 }

  return (
      <div className={classes.root}>
        <CssBaseline />
        <div className={classes.app}>
          <main className={classes.main}>
          <Paper className={classes.paper}>
            <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
              <Toolbar>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <SearchIcon className={classes.block} color="inherit" />
                  </Grid>
                  <Grid item xs>
                    <TextField
                      fullWidth
                      placeholder={product}
                      onChange={handleChange}
                      onKeyPress={(ev) => {
                        if (ev.key === 'Enter') {
                          history.push(`/search/${product}`);
                          () => props.fetchData(product);
                        }
                      }}
                      InputProps={{
                        disableUnderline: true,
                        className: classes.searchInput,
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Link to={`/search/${product}`}
                          style={{textDecoration: 'none', color: 'white'}}>
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.addUser}
                        onClick={() => props.fetchData(product)}
                      >
                        Szukaj
                      </Button>
                  </Link>
                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>
            <div width='100%'>
              {props.listOfProducts.length > 0 ?
               <Table className={classes.table} aria-label="simple table">
                  <TableBody className={classes.row}>
                  {props.listOfProducts.map((product, index) => {
                    const isItemSelected = isSelected(product.name);

                    return (
                      <TableRow
                        key={index}
                        onClick={event => handleClick(event, product.name)}
                        selected={isItemSelected}>
                          <TableCell align="left" scope="row">
                            <Link to={`/productDetails/${product.sku}`}
                                style={{textDecoration: 'none', color: 'white'}}>
                              <img
                                style={{width: '100px', height: '100px'}}
                                src={product.image}
                                alt={product.name}
                              />
                            </Link>
                          </TableCell>
                          <TableCell align="left" scope="row">
                            <Link to={`/productDetails/${product.sku}`}
                                style={{textDecoration: 'none', color: 'black'}}>
                            {product.name}
                            </Link>
                          </TableCell>
                          <TableCell align="left" scope="row">
                            <Link to={`/productDetails/${product.sku}`}
                                style={{textDecoration: 'none', color: 'black'}}>
                                Minimalna cena: {product.offers.lowPrice} zł
                            </Link>
                          </TableCell>
                          <TableCell align="right" scope="row">
                            <Button
                              variant="contained"
                              color="secondary"
                              className={classes.button}
                              onClick={ () => handleOnClick(product.sku, product.name)}
                            >
                              Dodaj do koszyka
                            </Button>
                            <Link to={`/productDetails/${product.sku}`}
                                style={{textDecoration: 'none', color: 'white'}}>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  className={classes.button}
                                >
                                  Zobacz listę sklepów
                                </Button>
                            </Link>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
              :
                <div className={classes.contentWrapper}>
                 {props.loading && <CircularProgress />}
                </div>
         }
            </div>
          </Paper>
          </main>
        </div>
      </div>
  );
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);
