import React, { Component } from 'react'
import { MDBRow, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import SingleCard from './SingleCard';
import SpinnerPage from './SpinnerPage';
import { MDBAlert } from 'mdbreact';
import PaginationPage from './Pagination';
import Pagination from "react-js-pagination";
import "./ProCard.css";
import ad from "./Images/ad.jpg";

export class ProCard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             products : [],
             isLoading : false,
             error:null,
             productPage : 1,
             totalProducts : 0,
             image1 : '',


        }
    }
    componentDidMount(){
  this.loadProducts();      
};

loadProducts = direction => {
    if(direction){
        this.setState({isLoading : true , products:[]});
    }
    let page = this.state.productPage;
    if(direction === 'next'){
        page++ ;
        this.setState({productPage : page});
    }
    if(direction === 'previous'){
        page-- ;
        this.setState({productPage: page});
    }
    
// this.setState({isLoading:true})
let token = localStorage.getItem('token');
fetch('http://localhost:3001/products/products?page=' + page ,
 {headers : {Authorization: `Bearer ${token}`}})
.then(results => {
   if(results) {
    return results.json();
   }
   throw new Error('Something went wrong..');
   
    
}).then(data => {
        
   this.setState({
       products: data.products ,totalProducts : data.totalItems ,isLoading:false 
      
   });


})
.catch(error => this.setState({error , isLoading:false}));
}



    render() {
    
        const {products , isLoading ,error} = this.state;
    
        if(error){
            return <MDBAlert color="danger" >
            {error.message}
          </MDBAlert>
        }
        if(isLoading){
            return <SpinnerPage />
        }
        return (
            <div>
            <div className="main-body">
            
            {/* <div style={{paddingBottom:"10px"}}> */}
                    <div className="ad">
                    <img src={ad} class="ad-img" />
                    </div> 
                   
                        <div className="proCard">
                 {products.map(product => (
                      <SingleCard 
                        key={product._id}
                        id={product._id}
                        price={product.price}
                        title={product.title}
                        address={product.address}
                        createdAt={new Date(product.createdAt).toLocaleDateString('en-Us' , )}
                        imgCollection = {'http://localhost:3001/images/'+ product.imageUrl1[0]}
                        
                      />
                 ))}   

                       
                   
               
                </div>
                <div className="ad-two">
                <img src={ad} class="ad-img" />
                </div>
            </div>

            <div class="pagi">
            <PaginationPage id="pagination"
                    onPrevious={this.loadProducts.bind(this,'previous')} 
                    onNext = {this.loadProducts.bind(this,'next')}
                    currentPage = {this.state.productPage}
                    lastPage = {Math.ceil(this.state.totalProducts/8)}
                    />


            </div>
            </div>


)
    }
}

export default ProCard
