import withRoot from './withRoot';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TopTitle from './views/TopTitle';
import ListOfSelectedProducts from './views/ListOfSelectedProducts';

class Basket extends Component {
  constructor(props) {
    super(props);
    this.state = {
        listOfSelectedProducts: [],
        listOfShops: [],
        listOfIds: "",
        oneShop: [],
        loading: true,
    };
    console.log("Loading true")
  }
//Load initial data
  componentDidMount() {
    let str = this.state.listOfIds.substring(0, this.state.listOfIds.length - 1);
    fetch(`http://ec2-35-180-69-117.eu-west-3.compute.amazonaws.com/api/v1/product/${str}/deals`)
      .then(response => response.json())
      .then(result => {
                this.setState({listOfShops: result,
                              listOfSelectedProducts: [],
                              oneShop: [],
                              listOfIds: "",
                              loading: false})
            })
      .catch(e => {
                console.log(e)
            });
  }
  fetchDeals = () => {
    this.setState({listOfSelectedProducts: [],
                    listOfShops: [],
                    listOfIds: "",
                    oneShop: [],
                    loading: true})
    let str = this.state.listOfIds.substring(0, this.state.listOfIds.length - 1);
    fetch(`http://ec2-35-180-69-117.eu-west-3.compute.amazonaws.com/api/v1/product/${str}/deals`)
      .then(response => response.json())
      .then(result => {
                this.setState({listOfShops: result,
                              listOfSelectedProducts: [],
                              oneShop: [],
                              listOfIds: "",
                              loading: false})
            })
      .catch(e => {
                console.log(e)
            });
  }
  fetchDealsWithDelivery = () => {
    this.setState({listOfSelectedProducts: [],
                    listOfShops: [],
                    listOfIds: "",
                    oneShop: [],
                    loading: true})
    let str = this.state.listOfIds.substring(0, this.state.listOfIds.length - 1);
    fetch(`http://ec2-35-180-69-117.eu-west-3.compute.amazonaws.com/api/v1/product/${str}/deals?includeDelivery`)
      .then(response => response.json())
      .then(result => {
                this.setState({listOfShops: result,
                              listOfSelectedProducts: [],
                              oneShop: [],
                              listOfIds: "",
                              loading: false})
            })
      .catch(e => {
                console.log(e)
            });
  }
  fetchDealsSingleShop = () => {
    let str = this.state.listOfIds.substring(0, this.state.listOfIds.length - 1);
    fetch(`http://ec2-35-180-69-117.eu-west-3.compute.amazonaws.com/api/v1/product/${str}/deals?singleShop`)
      .then(response => response.json())
      .then(result => {
        this.setState({oneShop: result,
                      listOfSelectedProducts: [],
                      listOfIds: "",
                      loading: false})
            })
      .catch(e => {
                console.log(e)
            });
    fetch(`http://ec2-35-180-69-117.eu-west-3.compute.amazonaws.com/api/v1/product/${str}/deals`)
      .then(response => response.json())
      .then(result => {
                this.setState({listOfShops: result,
                              listOfSelectedProducts: [],
                              listOfIds: "",
                              loading: false})
            })
      .catch(e => {
                console.log(e)
            });
  }
  fetchDealsSingleShopWithDelivery = () => {
    let str = this.state.listOfIds.substring(0, this.state.listOfIds.length - 1);
    let oneShop = [];
    fetch(`http://ec2-35-180-69-117.eu-west-3.compute.amazonaws.com/api/v1/product/${str}/deals?includeDelivery&singleShop`)
      .then(response => response.json())
      .then(result => {
              this.setState({oneShop: result,
                            listOfSelectedProducts: [],
                            listOfIds: "",
                            loading: false})
            })
      .catch(e => {
                console.log(e)
            });
    fetch(`http://ec2-35-180-69-117.eu-west-3.compute.amazonaws.com/api/v1/product/${str}/deals?includeDelivery`)
      .then(response => response.json())
      .then(result => {
                this.setState({listOfShops: result,
                              listOfSelectedProducts: [],
                              listOfIds: "",
                              loading: false})
            })
      .catch(e => {
                console.log(e)
            });
  }
  onClick = () => {
    localStorage.clear();
    this.setState({listOfShops: [],
                  listOfSelectedProducts: [],
                  oneShop: [],
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
    }
    return (
      <React.Fragment>
        <div style={{backgroundColor: "#eaeff1"}}>
          <TopTitle/>
        {
          this.state.listOfSelectedProducts.length > 0 ?
              <ListOfSelectedProducts loading={this.state.loading} products={this.state.listOfSelectedProducts} shops={this.state.listOfShops} oneShop={this.state.oneShop}/>
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
              Licz najniższą cenę całego koszyka
            </Button>
            <Button
              variant="contained"
              color="secondary"
              style={{margin: "1em"}}
              onClick={this.fetchDealsWithDelivery}
            >
              Licz najniższą cenę całego koszyka razem z kosztami dostawy
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              color="secondary"
              style={{margin: "1em"}}
              onClick={this.fetchDealsSingleShop}
            >
              Porównaj ceny z jednego sklepu vs z różnych
            </Button>
            <Button
              variant="contained"
              color="secondary"
              style={{margin: "1em"}}
              onClick={this.fetchDealsSingleShopWithDelivery}
            >
              Porównaj ceny z jednego sklepu vs z różnych razem kosztami dostawy
            </Button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRoot(Basket);
