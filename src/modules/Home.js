import withRoot from './withRoot';
// --- Post bootstrap -----
import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import AppFooter from './views/AppFooter';
import ProductHero from './views/ProductHero';
import ProductHowItWorks from './views/ProductHowItWorks';
import AppAppBar from './views/AppAppBar';
import Search from './Search';
import ProductDetails from './ProductDetails';
import Basket from './Basket';

class Home extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <AppAppBar />
          <Switch>
            <Route exact path="/"
                   render={() =>
                     <React.Fragment>
                       <ProductHero />
                       <ProductHowItWorks />
                     </React.Fragment>
                   } />
            <Route path="/search/:name" component={Search} />
            <Route path="/productDetails/:id" component={ProductDetails} />
            <Route path="/basket" component={Basket} />
          </Switch>
          <AppFooter />
        </div>
      </Router>
    );
  }
}

export default withRoot(Home);
