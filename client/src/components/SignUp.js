import React, { Component } from 'react'
import Navigationbar from './Navbar'
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import './Ad.css';
import { throwStatement } from '@babel/types';
import { stat } from 'fs';


class SignUp extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             email:"",
             password:"",
             name:"",
             phone:"",
             address:""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    addUsers = userData => {
        let url ='http://localhost:3001/users/signup';
        let method = 'POST';

        fetch(url , {method: method , headers:{'Content-Type' : 'application/json'},
            body:JSON.stringify({
                email:this.state.email,
                password:this.state.password,
                name:this.state.name,
                phone:this.state.phone,
                address:this.state.address
            })
        })
        .then(result => {
            if(result.status !== 201 && result.status !== 200 ){
                console.log('Creating user failed!')
            }
            return result.json();
        })
        .then(data => {
            console.log('i am the fishy one',data);
           const users = {
            // email:data.users.email,
            // name:data.users.name,
            // phone:data.users.phone,
            // address:data.users.address
           }
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state)
        this.addUsers()
        alert("Congratulations your're signed up!!" , window.location.href="/");
    }

    handleChange (evt)  {
      this.setState({
          [evt.target.name] : evt.target.value
      });
    }
    render() {
        return (
            <div>
                 <Navigationbar />
                <h1 style={{padding : "10px"}}>Sign Up</h1>
                <h5>be a part of Easy gaming and start selling on the go!</h5>
                <div className="form-ad">
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="12">
                        <form onSubmit = {this.handleSubmit}>
                       
                        <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                            Email *
                            </label>
                            <input
                            type="Email"
                            name="email"
                            id="defaultFormLoginEmailEx"
                            className="form-control"
                            onChange={this.handleChange}
                            />
                            <br />

                            <label htmlFor="defaultFormLoginName" className="grey-text">
                            Name*
                            </label>
                            <input
                            type="text"
                            name="name"
                            id="defaultFormLoginEmailEx"
                            onChange={this.handleChange}
                            className="form-control"
                            />
                            <br />
                           
                            <label htmlFor="defaultFormLoginPassword" className="grey-text">
                            Password *
                            </label>
                            <input
                            type="password"
                            name="password"
                            id="defaultFormLoginEmailEx"
                            className="form-control"
                            onChange={this.handleChange}
                            />
                            <br />
                            <label htmlFor="defaultFormLoginPhone" className="grey-text">
                            Phone Number *
                            </label>
                            <input
                            type="text"
                            name="phone"
                            id="defaultFormLoginEmailEx"
                            className="form-control"
                            onChange={this.handleChange}
                            />
                            <br />
                            <label htmlFor="defaultFormLoginAddress" className="grey-text">
                            Address *
                            </label>
                            <input
                            type="text"
                            name="address"
                            id="defaultFormLoginEmailEx"
                            className="form-control"
                            onChange={this.handleChange}
                            />
                            <br />
                            <div className="text-center mt-4">
                                
                            <MDBBtn color="indigo" type="submit"  >Submit</MDBBtn>
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

export default SignUp
