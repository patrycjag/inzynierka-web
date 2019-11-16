import withRoot from './withRoot';
import React, { Component } from 'react';
import ListOfShops from './views/ListOfShops';
import Typography from '@material-ui/core/Typography';


class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
        listOfShops: [],
        product: '',
    };
  }

  componentDidMount() {
    console.log("Match", this.props.match);
    const productID = this.props.match.params.id;
    console.log("Match", this.props.match.params.id);
    this.setState({product: productID})
    console.log("ID", this.props.match.params.id);

    fetch('http://ec2-35-180-69-117.eu-west-3.compute.amazonaws.com/api/v1/product/'+productID)
      .then(response => response.json())
      .then(result => {
                this.setState({listOfShops: result})
            })
      .catch(e => {
                console.log(e)
            });
  }

  render() {
    console.log(this.state.listOfShops)
    console.log(this.state.product)
    return (
      <React.Fragment>
      {this.state.listOfShops.length > 0 ?
        <ListOfShops listOfShops={this.state.listOfShops} productID={this.state.product}/>
        :
        <div>
         <Typography color="textSecondary" align="center">
           Brak produktów
         </Typography>
        </div>
      }
      </React.Fragment>
    );
  }
}

export default withRoot(ProductDetails);
