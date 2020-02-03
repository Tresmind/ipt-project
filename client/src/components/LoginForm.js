import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';



 class LoginForm extends Component {
   constructor(props) {
     super(props)
   
     this.state = {
        email:"",
        password:""
     }
     this.onSubmit = this.onSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);

   }
   
   handleChange(e) {
     this.setState({
      [e.target.name] : e.target.value
     })
   
   }

   onSubmit(e){
    e.preventDefault();
      console.log(this.state);
   }

  render() {
    return (
      <div style={{textAlign:"center"}}>
    <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <form >
            <p className="h4 text-center mb-4">Sign in</p>
            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="defaultFormLoginEmailEx"
              className="form-control"
              onChange={this.handleChange}
            />
            <br />
            <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
              Your password
            </label>
            <input
              type="password"
              name="password"
              id="defaultFormLoginPasswordEx"
              className="form-control"
              onChange={this.handleChange}
            />
            
            <div className="text-center mt-4">
              <MDBBtn color="primary" type="submit">Login</MDBBtn>
              <button type="submit" data-toggle="modal" data-target="" onSubmit={this.onSubmit} data-backdrop="static" data-keyboard="false">submit</button>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </div>
    )
  }
}




export default LoginForm;