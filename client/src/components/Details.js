import React, { Component } from 'react'
import Navigationbar from './Navbar'
import { MDBRow, MDBContainer } from 'mdbreact'
import CarouselPage from './CarouselPage'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import './details.css'
import { Avatar} from '@material-ui/core';
import FooterPage from './FooterPage';
import { array } from 'prop-types';
import { exportDefaultSpecifier } from '@babel/types';
import { faShoppingCart} from "react-icons/fa";


 class Details extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            category:"",
            make:"", 
            title:"",
            description:"",
            price:"",
            state:"",
            address:"",
            createdAt:"",
            imageUrl1 : "",
            imageUrl2:"",
            imageUrl3:"",
            creator:"",
            creatorName:"",
            creatorPhone:"",
            productQuantity:"1"
          
        }
        
    }
    
    componentDidMount(){
        const productId = this.props.match.params.productId;
        fetch('http://localhost:3001/products/product/' + productId )
        .then(res => {
            if(res.status !== 200){
                throw new Error('Failed to fetch product');
            }
            return res.json();
        })
        .then(resData => {
            this.setState({
                category: resData.product.category,
                make:resData.product.make,
                title: resData.product.title,
                description:resData.product.description,
                price:resData.product.price,
                state:resData.product.state,
                address:resData.product.address,
                createdAt:resData.product.createdAt,
                creator:resData.product.creator,
                imageUrl1:'http://localhost:3001/images/'+ resData.product.imageUrl1[0],
                imageUrl2:'http://localhost:3001/images/'+ resData.product.imageUrl1[1],
                imageUrl3:'http://localhost:3001/images/'+ resData.product.imageUrl1[2]

            })
            const userId = resData.product.creator;
                fetch('http://localhost:3001/users/getuser/' +userId)
                .then(user => {
                    if(user.status !== 200){
                        throw new Error('Failed to fetch user');
                    }
                    return user.json();
                
                })
                .then(userData => {
                    console.log(userData)
                    this.setState({
                        creatorName:userData.user.name,
                        creatorPhone:userData.user.phone
                    })
                }) 
        })
       
       
    }
    
    onCart=() => {
        
        fetch('http://localhost:3001/cart/addcart/' , {method:'POST' , headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                productId : this.props.match.params.productId,
                productName: this.state.title,
                productPrice:this.state.price,
                productQuantity:this.state.productQuantity,
                productImageUrl1:this.state.imageUrl1

            })
        })
        .then(res => {
            if(res.status !== 200 && res.status !== 201 ){
                throw new Error('Failed to fetch product');
            }
            return res.json();
        })
        .then(Data => {
            console.log(Data);
        })   
       
    }

    changeHandler(e) {
        this.setState({productQuantity : e.target.value})
    }

    render() {
                 
        return (
            
            <div>
              
                <Navigationbar />
                   <div style={{padding:"40px 20px 20px 40px"}}>               
                        <div className="main-box">
                            <CarouselPage img1={this.state.imageUrl1} img2={this.state.imageUrl2} img3={this.state.imageUrl3}/>
                        </div>  
                        <faShoppingCart />
                       
                        <div className="sub-box">
                         
                                
                                <div className="price">
                                    <h1>Rs. {this.state.price}</h1>
                                </div>
                               <div className="add-to-cart"> 
                                    
                                    <label >Qty. </label>
                                    <input value="1" onChange={this.changeHandler}/>
                                    <button class="add-to-cart-btn" onClick={this.onCart}>Add to cart</button>
                               </div>
                                
                            <div className="title">
                                <span>{this.state.title}</span>
                            </div>
                            
                            <div className="bottom-el">
                                <p style={{float:"left"}}>{this.state.address}</p>
                                <p style={{textAlign:"right"}}>{new Date(this.state.createdAt).toLocaleDateString('en-us')}</p>
                            </div>
                           
                         
                            <hr style={{border:"1px solid #d3d3d3"}}></hr>
                            
                            <h3>Seller Description</h3>
                            <div className="seller-title">
                            <Avatar alt="Seller Name" className="ava" src="/broken-image.jpg">
                                
                             </Avatar>
                                 <h5>  {this.state.creatorName}</h5>
                            </div>
                            <div className="chat-btn">
                                <button> CHAT WITH SELLER</button>
                            </div>
                            <div className="sell-num">
                            <i className="fas fa-phone-alt" >  {this.state.creatorPhone}</i>
                               
                            </div>
                        
                            <hr></hr>
                            <h3>Posted In</h3>
                           
                            <p style={{textAlign:"left" , paddingLeft:"10px"}}>{this.state.address}</p>
                            <div className="mapp">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28938.192721836753!2d67.10881189971776!3d24.956787635129512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb34760beb2d8a1%3A0x554a7a62506ad696!2sGulzar-e-Hijri%20Gulshan-e-Iqbal%2C%20Karachi%2C%20Karachi%20City%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1578003042443!5m2!1sen!2s" 
                            ></iframe>
                            </div>
                            </div>   
                           
                            
                          
                        <div className="main-box-2">
                            <h2>Description</h2>
                            <p style={{textAlign:"left"}}>{this.state.description}</p>
                        </div>
                </div>
                </div> 
            
        )
    }
}

export default Details
