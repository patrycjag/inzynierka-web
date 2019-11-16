import React  from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
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
  button: {
    marginTop: theme.spacing(1),
    justifyContent: 'center',
  },
  typography: {
    marginBottom: theme.spacing(4),
  },
});

const useStateWithLocalStorage = localStorageKey => {
  const [value, setValue] = React.useState(
    localStorage.getItem(localStorageKey) || ''
  );
  React.useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value]);
  return [value, setValue];
};

function ListOfShops(props) {
  const { classes } = props;

  const [value, setValue] = useStateWithLocalStorage('ids');

  return (
    <div className={classes.root}>
      <Typography className={classes.typography} variant="h2" color="inherit" align="left">
        Lista sklepów:
      </Typography>
      <Paper className={classes.paper}>
        <Table aria-label="simple table">
           {props.listOfShops.map(list => {
             return (
               <TableBody key={list}>
                 {list.map((shop, index) => {
                   return(
                     <TableRow key={index}>
                       <TableCell align="left" scope="row">
                         <img
                           style={{width: '100px', height: '100px'}}
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
                         {shop.price}
                       </TableCell>
                       <TableCell align="left" scope="row">
                         <Button
                           variant="contained"
                           color="secondary"
                           onClick={
                             () => setValue(`${props.productID}`)
                           }
                         >
                           Dodaj do koszyka
                         </Button>
                         <Link to={`/`}
                               style={{textDecoration: 'none', color: 'white'}}>
                           <Button
                             variant="contained"
                             color="primary"
                             className={classes.button}
                           >
                             Idź do sklepu
                           </Button>
                         </Link>
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
