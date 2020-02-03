import React, { Component } from 'react';
import { BrowserRouter as Router , Route ,Switch  } from 'react-router-dom';
import BrowserRouter from 'react-router-dom';
import {Elements , StripeProvider} from 'react-stripe-elements';
import StripeScriptLoader from 'react-stripe-script-loader'
import Home from './Home';
import Sell from './Sell';
import Details from './Details';
import SignUp from './SignUp';
import Cart from './Cart';
import Upro from './Upro';
import Checkout from './Checkout';

export class Routes extends Component {
    render() {
        return (
            
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/page=:currentPage" render={props => (<Home {...props}/>)} />
                <Route exact path="/Rent" component={Sell} />
                <Route exact path="/Cart" component={Cart} />
                <Route exact path="/Checkout" render={props => ( 
               
               <StripeProvider apiKey="pk_test_epnoQ9rQS6ZGi90VMJcx9gUx007vsbgd7l">
                    <Elements>
                        <Checkout />
                    </Elements>
                </StripeProvider>
              )} />

                <Route exact path="/:productId" render={props => (<Details {...props}  />)} />
               
                
                <Route
                    render = {function () {
                        return <h1 className="text-center m-5">Page Not Found</h1>;
                    }}
                />
            </Switch>
        
        )
    }
}

export default Routes
