import withRoot from './withRoot';
import React, { Component } from 'react';
import ListOfShops from './views/ListOfShops';
import CircularProgress from '@material-ui/core/CircularProgress';

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
        listOfShops: [],
        product: '',
        loading: true,
    };
  }
//Load initial data
  componentDidMount() {
    const productID = this.props.match.params.id;
    this.setState({product: productID})

    fetch('http://ec2-35-180-69-117.eu-west-3.compute.amazonaws.com/api/v1/product/'+productID)
      .then(response => response.json())
      .then(result => {
                this.setState({listOfShops: result,
                              loading: false})
            })
      .catch(e => {
                console.log(e)
            });
  }

  render() {
    return (
      <React.Fragment>
      {this.state.listOfShops.length > 0 ?
        <ListOfShops listOfShops={this.state.listOfShops} productID={this.state.product}/>
        :
        <div>
         {this.state.loading && <CircularProgress />}
        </div>
      }
      </React.Fragment>
    );
  }
}

export default withRoot(ProductDetails);
