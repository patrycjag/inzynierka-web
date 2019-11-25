import React  from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
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
  table: {
   minWidth: 650,
   },
   row: {
     width: '100%',
   },
});

function ListOfSelectedProducts(props) {
  const { classes } = props;

  const shops = props.shops;
  const oneShop = props.oneShop;
  const strShops = JSON.stringify(shops);
  const strOneShop = JSON.stringify(oneShop);
  console.log("Shop", strShops);
  console.log("One Shop", strOneShop);

//Comparison of two prices
  if (strOneShop !== "[]") {
    let total = 0;
    return (
      <Paper className={classes.paper}>
        {props.loading && <CircularProgress />}

        <Table className={classes.table} aria-label="simple table">
          <TableBody className={classes.row}>
          {props.products.map((product, index) => {
            //calculate total price
            total += shops[index].bestPrice;
            return (
              <TableRow
                key={index}>
                <TableCell align="left" scope="row">
                  {product}
                </TableCell>
                <TableCell align="left" scope="row">
                  {oneShop.selectedShop}
                </TableCell>
                <TableCell align="right" scope="row">
                  {oneShop.pricesFromBestShop[index]} zł
                </TableCell>
                <TableCell align="left" scope="row">
                  {shops[index].shopName}
                </TableCell>
                <TableCell align="right" scope="row">
                  {shops[index].bestPrice} zł
                </TableCell>
                <TableCell align="right" scope="row">
                  Różnica: {(oneShop.pricesFromBestShop[index] - shops[index].bestPrice).toFixed(2)} zł
                </TableCell>
              </TableRow>
            )
          })}
            <TableRow>
              <TableCell align="center" scope="row">
              </TableCell>
              <TableCell align="center" scope="row">
              </TableCell>
              <TableCell align="right" scope="row">
                Total: {oneShop.bestPrice} zł
              </TableCell>
              <TableCell align="center" scope="row">
              </TableCell>
              <TableCell align="right" scope="row">
                Total: {total} zł
              </TableCell>
              <TableCell align="right" scope="row">
                Różnica: {(oneShop.bestPrice - total).toFixed(2)} zł
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    );
//Only lowest price
  } else if (strShops !== "[]") {
      let total = 0;
      return (
        <Paper className={classes.paper}>
          {props.loading && <CircularProgress />}
          <Table className={classes.table} aria-label="simple table">
             <TableBody className={classes.smallRow}>
             {props.products.map((product, index) => {
               //calculate total price
               total += shops[index].bestPrice;
               return (
                 <TableRow
                   key={index}>
                   <TableCell align="left" scope="row">
                     {product}
                   </TableCell>
                   <TableCell align="left" scope="row">
                     {shops[index].shopName}
                   </TableCell>
                   <TableCell align="right" scope="row">
                     {shops[index].bestPrice} zł
                   </TableCell>
                 </TableRow>
               )
             })}
             <TableRow>
               <TableCell align="center" scope="row">
               </TableCell>
               <TableCell align="center" scope="row">
               </TableCell>
               <TableCell align="right" scope="row">
                 Total: {total} zł
               </TableCell>
             </TableRow>
           </TableBody>
         </Table>
        </Paper>
      );
//Empty basket
    } else {
    return (
      <Paper className={classes.paper}>
        {props.loading && <CircularProgress />}
        <Table className={classes.table} aria-label="simple table">
           <TableBody className={classes.row}>
           {props.products.map((product, index) => {
             return (
               <TableRow
                 key={index}>
                 <TableCell align="left" scope="row">
                   {product}
                 </TableCell>
               </TableRow>
             )
           })}
           <TableRow>
             <TableCell align="right" scope="row">
               Total: 0 zł
             </TableCell>
           </TableRow>
         </TableBody>
       </Table>
      </Paper>
    );
  }
}

ListOfSelectedProducts.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListOfSelectedProducts);
