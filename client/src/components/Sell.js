import React, { Component } from 'react'
import Navigationbar from './Navbar'
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import  { Redirect } from 'react-router-dom';
import './Ad.css';

export class Sell extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             category : 'console',
             title : '',
             price : '',
             desc : '',
             state1:'sindh',
             address:'',
             make:'',
             imgCollection:'',
             image2:'',
             image3:'',

        }
    }
    

    addProducts = postData => {
        const formData = new FormData();
        formData.append('category' ,this.state.category);
        formData.append('make' , this.state.make);
        formData.append('title' , this.state.title);
        formData.append('desc' , this.state.desc);
        formData.append('price' , this.state.price);
        formData.append('state1' , this.state.state1);
        formData.append('address' , this.state.address);
        for (const key of Object.keys(this.state.imgCollection)){

        formData.append('imgCollection' , this.state.imgCollection[key]);
        }
        let token = localStorage.getItem('token');
        let url = 'http://localhost:3001/products/products';
        let method = 'POST';

        fetch(url , {method: method , /*headers : {'Content-Type':'application/json'} */ 
        body: formData , headers : {Authorization: `Bearer ${token}`}
        //  body: JSON.stringify({
        //     category:this.state.category,
        //     make : this.state.make ,
        //     title: this.state.title,
        //     desc:this.state.desc,
        //     price : this.state.price,
        //     state1 : this.state.state1,
        //     address: this.state.address
        //  }) 
    })
         .then(result => {
             if(result.status !==200 && result.status !== 201){
                 console.log('creating product failed');
             }
             return result.json();
         })
         .then(data => {
             console.log(data);
            const products = {
                title : data.products.title,
                price : data.products.price,
                address : data.products.address
            }

         })
    }
    changeCategory =(e)=> {
        this.setState({
           category :e.target.value,
        })
    }
    changeMake =(e)=> {
        this.setState({
           make :e.target.value,
        })
    }
    changeTitle =(e)=> {
        this.setState({
           title :e.target.value,
        })
    }
    changeDesc =(e)=> {
        this.setState({
           desc :e.target.value,
        })
    }
    changePrice =(e)=> {
        this.setState({
           price :e.target.value,
        })
    }
    changeState =(e)=> {
        this.setState({
           state1 :e.target.value,
        })
    }

    changeAddress =(e)=> {
        this.setState({
          
          address :e.target.value
            
        })
    }
    changeImage =(e)=> {
        this.setState({
          
          imgCollection :e.target.files
            
        })
    }
    changeImage1 =(e)=> {
        this.setState({
          
          image1 :e.target.files[0]
            
        })
    }
    changeImage1 =(e)=> {
        this.setState({
          
          image3 :e.target.files[0]
            
        })
    }
    handleSubmit=(e) =>  {
        e.preventDefault();
       console.log(this.state);
        this.addProducts()
    }
    render() {
        
        return (
            <div>
                <Navigationbar />
                <h1 style={{padding : "10px"}}>Post Your AD</h1>
                <div className="form-ad">
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="12">
                        <form onSubmit = {this.handleSubmit}>
                        <label htmlFor="defaultFormLoginEmailEx" className="grey-text" >
                            Select Category *
                            </label>
                            <select  name="Category"
                            type="text"
                            onChange={this.changeCategory}
                            className="form-control"
                            >
                               
                                <option value="console">Console</option>
                                <option value="dvd">DVDs</option>
                                <option value="accessories">Accessories</option>
                                <option value="controllers">Controllers</option>
                                <option value="gamingPc">Gaming Pc</option>
                            </select>
                            <br />
                        <label htmlFor="defaultFormLoginEmailEx"  className="grey-text">
                            Make *
                            </label>
                            <input
                            autoComplete="off"
                            type="text"
                            id="defaultFormLoginEmailEx"
                            className="form-control"
                            onChange={this.changeMake}
                            />
                            <br />

                            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                            Ad Title*
                            </label>
                            <input
                            autoComplete="off"
                            type="text"
                            id="defaultFormLoginEmailEx"
                            onChange={this.changeTitle}
                            className="form-control"
                            />
                            <br />
                            <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                            Description*
                            </label>
                            <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            onChange={this.changeDesc}
                            rows="5"
                            />
                            <br />
                          
                            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                            Set A Price *
                            </label>
                            <input
                            autoComplete="off"
                            type="text"
                            id="defaultFormLoginEmailEx"
                            className="form-control"
                            onChange={this.changePrice}
                            />
                            <br />
                            <hr style={{background:"#D8D8D8"}}></hr>
                            <br />
                            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                            Upload Product pictures *
                            </label>
                            <div className="custom-file">
                            <input multiple
                            type="file"
                            className="custom-file-input"
                            id="inputGroupFile01"
                            aria-describedby="inputGroupFileAddon01"
                            onChange={this.changeImage}
                            />
                            <p>You have to add atleast 3 pictures</p>
                             <label className="custom-file-label" htmlFor="inputGroupFile01">
                            Choose file
                            </label>
                            </div>
                           {/* <div className="custom-file">
                            <input 
                            type="file"
                            className="custom-file-input"
                            id="inputGroupFile01"
                            aria-describedby="inputGroupFileAddon01"
                            onChange={this.changeImage2}

                            />
                            <br />
                            <label className="custom-file-label" htmlFor="inputGroupFile01">
                            Choose file
                            </label>
                            </div>
                            <div className="custom-file">
                            <input
                            type="file"
                            className="custom-file-input"
                            id="inputGroupFile01"
                            aria-describedby="inputGroupFileAddon01"
                            onChange={this.changeImage3}

                            />
                            <br />
                            <label className="custom-file-label" htmlFor="inputGroupFile01">
                            Choose file
                            </label> 
                            </div> */}
                            <br />
                            <br />
                            <hr style={{background:"#D8D8D8"}}></hr> 
                            <br />                            
                            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                            Select State *
                            </label>
                            <select  name="State"
                            type="text"
                            onChange={this.changeState}
                            className="form-control"
                            >
                               
                                <option value="sindh">Sindh</option>
                                <option value="punjab">Punjab</option>
                                <option value="balochistan">Balochistan</option>
                                <option value="kpk">KPK</option>
                                <option value="gilgit">Gilgit Baltistan</option>
                            </select>
                            <br />
                            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                            Address *
                            </label>
                            <input
                            autoComplete="off"
                            type="text"
                            id="defaultFormLoginEmailEx"
                            className="form-control"
                            onChange={this.changeAddress}
                            />
                            <br />
                            <div className="text-center mt-4">
                                
                            <MDBBtn type="submit" className="submit-button" >Submit</MDBBtn>
                            </div>
                        </form>
                        </MDBCol>
                    </MDBRow>
               </MDBContainer> 

                </div>
            </div>
        )
    }
}

export default Sell
