import React, { Component } from 'react'
import {CardElement, injectStripe , ReactStripeElements} from 'react-stripe-elements';
import Navigationbar from './Navbar';
import './checkout.css';
import visa from './visa.png';
import mastercard from './mastercard.png'
import paypal from './paypal.png'
import western from './western.png'
import FooterPage from './FooterPage';
import { MDBContainer, MDBAlert } from 'mdbreact';

 class Checkout extends Component {
     constructor(props) {
         super(props)
     
         this.state = {
              amount : "",
              name:"",
              address:"",
              city:"",
              state:"",
              postal:"",
              phone:"",
              cardName:"",
              successful:""

         }
         this.onSubmit = this.onSubmit.bind(this);
         this.onChange= this.onChange.bind(this);
     }
    //  async submit(ev){
    //     let {token} = await this.props.stripe.createToken({name:"testing"});
    //     console.log(token)
    // //     let response = await fetch("http://localhost:3001/cart/checkout/",{method:'POST' , headers:{'Content-Type':'text/plain'},
    // //     body: {token_id : token.id}
    // // });
    // // if(response.ok){
    // //     console.log("purchase completed")
    // // }
    //  }
     onChange (e) {
        this.setState({
            [e.target.name] : e.target.value
           })
     }
     clear(){
         
     }
   async onSubmit(e)  {
        e.preventDefault()
        const Name = this.state.cardName;
        try{
            let {token} = await this.props.stripe.createToken({name:Name})
            console.log(token);
            let amount = sessionStorage.getItem('totalPrice')
            await fetch('http://localhost:3001/cart/checkout/' , {method:'POST',headers:{'Content-type':'application/json'},
        body:JSON.stringify({token , amount})})
        this.setState({successful:"Payment is successfull.Check your email for product and delivery details"})
            
    }
        catch(err){
        this.setState({successful:"Something went wrong"})
            throw err;

        }
        sessionStorage.removeItem('totalPrice');
        this.clear()
    } 
    render() {
        let alert;
        if(this.state.successful){
            alert = <MDBAlert color="success" >{this.state.successful}</MDBAlert>
        }
        else {
            alert = null
        }
       
        return (
                <div>
                    <div className="checkout">
                <Navigationbar />
                {alert}
                <div className="checkout-main">
                    <div className="main-Form">
                        <h4>Shipping Details</h4>
                        <hr></hr>
                        <form>
                            <ul>
                            
                    <li>  <label >Name *</label></li>
                    <li>  <input name="name" onChange={this.onChange}></input></li>
                    <li> <label>Street Address *</label></li>
                    <li><input name="address" onChange={this.onChange}></input></li>
                        <li> <label>City *</label></li>
                        <li><input name="city" onChange={this.onChange}></input></li>
                        <li> <label>State/province *</label></li>
                        <li><input name="state" onChange={this.onChange}></input></li>
                        <li> <label>Postal code </label></li>
                        <li><input name="postal" onChange={this.onChange}></input></li>
                        <li> <label>Phone Number *</label></li>
                        <li><input name="phone" onChange={this.onChange}></input></li>
                        </ul>
                        </form>
                {/* <p>Would you like to continue with transaction?</p>
                <CardElement />
                <button onClick={this.onSubmit}>Purchase</button> */}
                </div>
                                        <div className="main-summary">
                                        
                                        <h4 style={{paddingTop:"8px"}}>Payment Method</h4>
                                                <hr></hr>
                                        <ul>        <li><label >Name on Card *</label></li>
                                            <li><input name="cardName" onChange={this.onChange}></input></li>  
                                            <div className="cardnum"><li><label>Card Number* - Expiry Date * - CVC *</label></li>  
                                            <li><CardElement /></li> </div> 
                                                <li><button className="checkout-btn" onClick={this.onSubmit}>Purchase</button></li>
                                                </ul>
                                                <div className="pics">
                                                    <img src={paypal} />
                                                    <img src={mastercard} />
                                                    <img src={visa} />
                                                    <img src={western} />


                                                </div>
                                         </div>      
                </div>
                </div>
                <FooterPage />
            </div>
        )
    }
}

export default injectStripe(Checkout);
