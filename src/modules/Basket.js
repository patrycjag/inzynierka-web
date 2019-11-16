import withRoot from './withRoot';
import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TopTitle from './views/TopTitle';
import ListOfSelectedProducts from './views/ListOfSelectedProducts';

class Basket extends Component {
  constructor(props) {
    super(props);
    this.state = {
        listOfSelectedProducts: [],
        listOfIds: "",
        listOfShops: [],
    };
  }

  fetchDeals = () => {
    let str = this.state.listOfIds.substring(0, this.state.listOfIds.length - 1);
    fetch(`http://ec2-35-180-69-117.eu-west-3.compute.amazonaws.com/api/v1/product/${str}/deals`)
      .then(response => response.json())
      .then(result => {
                this.setState({listOfShops: result,
                              listOfSelectedProducts: [],
                              listOfIds: "",})
                console.log(result)
            })
      .catch(e => {
                console.log(e)
            });
  }
  fetchDealsWithDelivery = () => {
    let str = this.state.listOfIds.substring(0, this.state.listOfIds.length - 1);
    fetch(`http://ec2-35-180-69-117.eu-west-3.compute.amazonaws.com/api/v1/product/${str}/deals?includeDelivery`)
      .then(response => response.json())
      .then(result => {
                this.setState({listOfShops: result,
                              listOfSelectedProducts: [],
                              listOfIds: "",})
                console.log(result)
            })
      .catch(e => {
                console.log(e)
            });
  }
  fetchDealsSingleShop = () => {
    let str = this.state.listOfIds.substring(0, this.state.listOfIds.length - 1);
    fetch(`http://ec2-35-180-69-117.eu-west-3.compute.amazonaws.com/api/v1/product/${str}/deals?includeDelivery&singleShop`)
      .then(response => response.json())
      .then(result => {
                this.setState({listOfShops: result,
                              listOfSelectedProducts: [],
                              listOfIds: "",})
                console.log(result)
            })
      .catch(e => {
                console.log(e)
            });
  }

  onClick = () => {
    localStorage.clear();
    this.setState({listOfShops: [],
                  listOfSelectedProducts: [],
                  listOfIds: "",})
  }

  render() {

      // iterate localStorage
    for (var i = 0; i < localStorage.length; i++) {
      () => {
        this.setState({listOfSelectedProducts: []});
        this.setState({listOfIds: ""});
      }

      // set iteration key name
      var key = localStorage.key(i);

      // use key name to retrieve the corresponding value
      var value = localStorage.getItem(key);
      this.state.listOfSelectedProducts.push(value);
      this.state.listOfIds += key;
      this.state.listOfIds += ",";
      // console.log the iteration key and value
      console.log('Key: ' + key + ', Value: ' + value);

    }
    return (
      <React.Fragment>
        <div style={{backgroundColor: "#eaeff1"}}>
          <TopTitle/>
        {
          this.state.listOfSelectedProducts.length > 0 ?
              <ListOfSelectedProducts products={this.state.listOfSelectedProducts} shops={this.state.listOfShops}/>
            :
              <div>
               <Typography color="textSecondary" align="center">
                 Brak produktów
               </Typography>
              </div>
        }
          <div style={{padding: "2em 0"}}>
            <Button
              variant="contained"
              color="secondary"
              style={{margin: "1em"}}
              onClick={this.onClick}
            >
              Usuń przedmioty z koszyka
            </Button>
            <Button
              variant="contained"
              color="secondary"
              style={{margin: "1em"}}
              onClick={this.fetchDeals}
            >
              Licz najniższą cenę
            </Button>
            <Button
              variant="contained"
              color="secondary"
              style={{margin: "1em"}}
              onClick={this.fetchDealsWithDelivery}
            >
              Licz najniższą cenę z dostawą
            </Button>
            <Button
              variant="contained"
              color="secondary"
              style={{margin: "1em"}}
              onClick={this.fetchDealsSingleShop}
            >
              Licz najniższą cenę z dostawą i jednego sklepu
            </Button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRoot(Basket);
