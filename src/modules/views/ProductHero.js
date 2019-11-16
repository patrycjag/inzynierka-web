import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '../components/Button';
import Typography from '../components/Typography';
import TextField from '../components/TextField';
import ProductHeroLayout from './ProductHeroLayout';
import {Link, useHistory} from 'react-router-dom';

const backgroundImage =
  'https://cdn.pixabay.com/photo/2016/03/26/13/09/notebook-1280538_960_720.jpg';

const styles = theme => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#7fc7d9', // Average color of the background image.
    backgroundPosition: 'center',
  },
  button: {
    minWidth: 200,
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10),
    },
  },
  textField: {
    width: '75%',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  more: {
    marginTop: theme.spacing(2),
  },
});


function ProductHero(props, context) {
  const { classes } = props;
  const [product, setProduct] = React.useState('Wpisz nazwę produtku');
  let history = useHistory();
  const handleChange = event => {
    setProduct(event.target.value);
  };

  return (
    <ProductHeroLayout backgroundClassName={classes.background}>
      <img style={{ display: 'none' }} src={backgroundImage} alt="increase priority" />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Przenieś swoje zakupy na nowy poziom
      </Typography>
      <TextField
        noBorder
        className={classes.textField}
        placeholder={product}
        onChange={handleChange}
        onKeyPress={(ev) => {
          if (ev.key === 'Enter') {
            history.push(`/search/${product}`);
          }
        }}
       />
       <Link to={`/search/${product}`}
             style={{textDecoration: 'none', color: 'white'}}>
       <Button
           color="secondary"
           variant="contained"
           size="large"
           className={classes.button}
         >
           Szukaj
         </Button>
     </Link>
      <Typography variant="body2" color="inherit" className={classes.more}>
        Odkryj naszą stronę
      </Typography>
    </ProductHeroLayout>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHero);
