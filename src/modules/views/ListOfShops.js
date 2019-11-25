import React  from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '../components/Typography';

const styles = theme => ({
  root: {
    width: '100%',
    background: '#eaeff1',
    padding: theme.spacing(6, 4),
  },
  paper: {
    width: "75%",
    margin: 'auto',
    overflow: 'hidden',
  },
  table: {
    minWidth: 650,
  },
  typography: {
    marginBottom: theme.spacing(4),
  },
  button: {
    width: "100%",
    paddingTop: theme.spacing(1),
  }
});
//Save product in local storage
const handleOnClick = ( id, name) => {
  localStorage.setItem(id, name);
}

function ListOfShops(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography className={classes.typography} variant="h2" color="inherit" align="left">
        Lista sklepów:
      </Typography>

      <Paper className={classes.paper}>
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          onClick={ () => handleOnClick(props.productID, props.listOfShops[0][0].description)}
        >
          Dodaj przedmiot do koszyka
        </Button>
        <Table aria-label="simple table">
           {props.listOfShops.map(list => {
             return (
               <TableBody key={list}>
                 {list.map((shop, index) => {
                   return(
                     <TableRow key={index}>
                       <TableCell align="left" scope="row">
                         <img
                           style={{height: '50px'}}
                           src={shop.imgUrl}
                           alt={shop.shopName}
                         />
                       </TableCell>
                       <TableCell align="left" scope="row">
                         {shop.shopName}
                       </TableCell>
                       <TableCell align="left" scope="row">
                         {shop.description}
                       </TableCell>
                       <TableCell align="left" scope="row">
                        Cena: {shop.price} zł
                       </TableCell>
                     </TableRow>
                   );
                 })}
               </TableBody>
             )
           })}
       </Table>
      </Paper>
    </div>
  );
}


ListOfShops.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListOfShops);
