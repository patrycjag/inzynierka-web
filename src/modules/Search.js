import withRoot from './withRoot';
import React, { Component } from 'react';
import Content from './views/Content';

class Search extends Component {
  constructor() {
    super();
    this.fetchData = this.fetchData.bind(this)
    this.state = {
        listOfProducts: [],
        loading: true,
    };
  }
//load initial data
  componentDidMount() {
    const productName = this.props.match.params.name;
    fetch('http://ec2-35-180-69-117.eu-west-3.compute.amazonaws.com/api/v1/product?productName='+productName)
      .then(response => response.json())
      .then(result => {
                this.setState({listOfProducts: result,
                                loading: false})
            })
      .catch(e => {
                console.log(e)
            });
  }

  fetchData(product) {
    fetch('http://ec2-35-180-69-117.eu-west-3.compute.amazonaws.com/api/v1/product?productName='+product)
      .then(response => response.json())
      .then(result => {
                this.setState({listOfProducts: result,
                              loading: false})
            })
      .catch(e => {
                console.log(e)
            });
  }

  render() {
    return (
      <React.Fragment>
        <Content loading={this.state.loading} listOfProducts={this.state.listOfProducts} fetchData={this.fetchData}/>
      </React.Fragment>
    );
  }
}

export default withRoot(Search);
