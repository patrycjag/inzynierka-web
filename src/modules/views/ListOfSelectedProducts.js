import React  from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

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
  console.log(shops);
  console.log(shops[0]);
  return (
    <Paper className={classes.paper}>
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
       </TableBody>
     </Table>
    </Paper>
  );
}

ListOfSelectedProducts.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListOfSelectedProducts);
