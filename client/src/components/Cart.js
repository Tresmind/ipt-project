import React, { Component } from 'react'
import Navigationbar from './Navbar'
import './cart.css';
import img from './5.png';
import { colors } from '@material-ui/core';
import { get } from 'https';
import del from './del.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Cart extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             productName:"",
             productPrice:"",
             productQuantity:"",
             products:[],
             total:"2",
             ProductsLength:"",
             price:0,
             loading : false
        }
        this.proceed = this.proceed.bind(this)
    }
   
    componentDidMount(){
        fetch('http://localhost:3001/cart/getcart')
        .then(res => {
            if(res.status !== 200){
                throw new Error('Failed to fetch product');
            }
            return res.json();
        })
        .then(resData => {
            console.log(resData);
            this.setState({
                // productName:resData.cart[5].productName,
                // productPrice:resData.cart[5].productPrice,
                // productQuantity:resData.cart[5].productQuantity
                products:resData.cart
            })
    }).catch(err => {console.log(err)})
    
    
}

deleteCart = (e) => {
   const cartId = e.target.value;
    fetch('http://localhost:3001/cart/deletecart/' + cartId , {method:'DELETE'})
    .then(res => {
        if(res.status !==200 ){
            throw new Error('Deleting a product failed!')
        }
        return res.json();
    })
    .then(resData => {
        console.log(resData);
        this.setState(prevState => {
            const updatedCart = prevState.products.filter(p => p._id !== cartId);
            return {products : updatedCart }
        })
    })
    console.log(e.target.value)
}

continueShop(){
    
    window.location.href="/";
}

// getPrice (){
//     this.setState({loading:true})
//     this.state.products.map(product => {
//         const totalprice = product.productPrice * product.productQuantity;
//         this.setState(prevState => {
//            const updatedprice = prevState.price + totalprice;
//            return{price : updatedprice}
//         })
//     })
   
// }
proceed(e){
     e.preventDefault()
     this.state.products.map(product => {
        const totalprice = product.productPrice * product.productQuantity;
        if(sessionStorage.length<0){
        const finalprice = sessionStorage.setItem('totalPrice',JSON.stringify(totalprice))
        }
        else {
            const getPrice = JSON.parse(sessionStorage.getItem('totalPrice'))
            const finalValue = getPrice + totalprice
            const finalprice = sessionStorage.setItem('totalPrice',JSON.stringify(finalValue))
        }
       
    })
     window.location.href="/Checkout" 
}
   
    render() {
            const finalprice = sessionStorage.getItem('totalPrice')
        return (
           
            <div>
                
                <Navigationbar />
               <p>{finalprice}</p>
               
                <div className="Shopping-cart">
                    <h4>Your shopping cart ({this.state.products.length} items)</h4>
                    
                    
                    <button className="back" onClick={this.continueShop}>Add more products</button>
                    
                    <button className="proceed" onClick={this.proceed}>proceed to checkout</button>
                   
                   
                    <div className="Cart-box">
                        <table>
                            <thead>
                                <tr>
                                 <th className="item">Items</th>
                                 <th>unit price</th>
                                 <th>quantity</th>
                                 <th>sub total</th>
                                 <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.products.map(product => (
                                     <tr>
                                     <span><td><img className="cart-product-img" src={product.productImageUrl1}/> {product.productName}  </td> </span>
                                                  <td>{product.productPrice}</td>
                                                  <td>{product.productQuantity}</td>
                                                  <td>{product.productQuantity * product.productPrice}</td>
                                                  {/* <td><button onClick={this.deleteCart} value={product._id}>Delete</button></td> */}
                                                  <td>  
                                                       <button className="del-btn" onClick={this.deleteCart} value={product._id}
                                                  style={{backgroundColor:"transparent",border:"none",padding:"0px",margin:"0px"}} 
                                                  >
                                                     X      
                                                      </button></td>
                                              </tr>
                                              
                                ))}
                               
                                
                            </tbody>
                            <div className="Cartfoot">
                                
                                 <p> </p>
                            </div>
                        </table>
                    </div>
                </div>
                </div>
        
        );
    }
}

export default Cart
