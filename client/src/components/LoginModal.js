import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBFooter } from 'mdbreact';
import { MDBRow, MDBCol, MDBInput, } from 'mdbreact';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

import LoginForm from './LoginForm';
import './modal.css';
class LoginModal extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        email:"",
        password:"",
        userId:"",
        token:"",
        userName:"",
        userPhone:"",
        isAuth:false
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);


    }

    // componentDidMount(){
    //   const token=localStorage.getItem('token');
    //   const expiryDate = localStorage.getItem('expiryDate');
    //   if(!token || !expiryDate){
    //     return;
    //   }
    //   if(new Date(expiryDate) <= new Date()){
    //     this.logoutHandler();
    //     return;
    //   }
    //   const userId = localStorage.getItem('userId');
    //   const userName = localStorage.getItem('userName');
    //   const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime();
    //   this.setState({ isAuth:true , token: token, userId: userId , userName:userName});
    //   this.setAutoLogout(remainingMilliseconds);
    // }

    handleChange(e) {
      this.setState({
       [e.target.name] : e.target.value
      })
    
    }


    handleSubmit(e){
    e.preventDefault();
      console.log(this.state);
      this.LoginHandler();
      this.props.onLogin(e,{
        userName:this.state.userName,
        isAuth:this.state.isAuth,
        userId:this.state.userId,
        token:this.state.token,
        userPhone:this.state.userPhone
      })
      
    
   }

   LoginHandler=() => {
    fetch('http://localhost:3001/users/signin' , 
    {method: 'POST' , headers:{'Content-Type' : 'application/json' },
    body:JSON.stringify({
        email:this.state.email,
        password:this.state.password
      })
    })
        .then(res => {
          if(res.status === 422){
            throw new Error('Validation Error');
          }
          if(res.status !==200 && res.status !==201){
            console.log('Error!');
            throw new Error('Could not authenticate you!');
          }
          console.log('done');
          return res.json()
         
        })
        .then(resData => {
          console.log(resData);
          this.setState({
            isAuth:true,
            token:resData.token,
            userId:resData.userId,
            userName:resData.userName,
            userPhone:resData.userPhone
          });
          // localStorage.setItem('token',resData.token);
          // localStorage.setItem('userId',resData.userId);
          // localStorage.setItem('userName',resData.userName);
          // const remainingMilliseconds = 60 * 60 * 1000;
          // const expiryDate = new Date(
          //   new Date().getTime() + remainingMilliseconds 
          // );
          // localStorage.setItem('expiryDate' , expiryDate.toISOString());
          // this.setAutoLogout(remainingMilliseconds);
        })
        .catch(err => {
          console.log(err);
          this.setState({
            isAuth: false,
          })
        })

   }

   logoutHandler = () => {
    this.setState({isAuth:false, token: null });
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('userPhone');
    localStorage.removeItem('userName');
    console.log(this.state);
  };

  // setAutoLogout = milliseconds => {
  //   setTimeout(() => {
  //     this.logoutHandler();
  //   }, milliseconds);
  // };
  responseFacebook = (response,e) => {
    console.log(response);
    this.setState({
      isAuth:true,
      token:response.accessToken,
      userId:response.userID,
      userName:response.name,
      
    });
    console.log(this.state);
    this.props.onLogin(e,{
      userName:this.state.userName,
      isAuth:this.state.isAuth,
      userId:this.state.userId,
      token:this.state.token,
      userPhone:this.state.userPhone
    })
  }

  responseGoogle = (response,e) => {
    console.log(response);
    this.setState({
      isAuth:true,
      token:response.accessToken,
      userId:response.userID,
      userName:response.name,
      
    });
    console.log(this.state);
    this.props.onLogin(e,{
      userName:this.state.userName,
      isAuth:this.state.isAuth,
      userId:this.state.userId,
      token:this.state.token,
      userPhone:this.state.userPhone
    })
  }

  render() {
    
      if(!this.props.modal){
          return null
      }
    return (
      <MDBContainer>
        {/* BUTTON */}
        {/* <MDBBtn color="info" onClick={this.props.toggle}>Click</MDBBtn> */}
        {/* MODAL */}
        <MDBModal isOpen={this.props.modal} toggle={this.props.toggle}    >
          <MDBModalHeader toggle={this.props.toggle}>Login In Form</MDBModalHeader>
          <MDBModalBody>
              {/*Login Form start here*/}   
             
              <div style={{textAlign:"center"}}>
                        <MDBContainer>
                          <MDBRow>
                            <MDBCol md="6">
                              <form >
                                <p className="h4 text-center mb-4">Sign in</p>
                                <FacebookLogin style={{}}
                                  appId="1535124569976383"
                                  autoLoad={false}
                                  fields="name,email,picture"
                                  onClick={this.componentClicked}
                                  callback={this.responseFacebook} 
                                  cssClass="my-facebook-button-class"
                                  />
                                  
                                  <br></br>
                                  <GoogleLogin 
                                    clientId="56218013761-fvuqggvvns777qmlnr14jop5k5vtjgmk.apps.googleusercontent.com"
                                    render = {renderProps => (<button className="google-custom-btn" onClick={renderProps.onClick} disabled={renderProps.disabled}>Login with Google</button>)}
                                    buttonText="Login"
                                    onSuccess={this.responseGoogle}
                                    onFailure={this.responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                  />
                                <hr></hr> 
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
                                
                                </div>
                              </form>
                            </MDBCol>
                          </MDBRow>
                        </MDBContainer>
                        </div>

            

               {/*Login Form end here*/}   
          </MDBModalBody>
          <MDBModalFooter>
            
            <MDBBtn color="primary" href="/Signup">Sign Up</MDBBtn>
            <form>
            <MDBBtn color="primary" onClick={this.handleSubmit}>login In</MDBBtn>
            </form>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }
}
export default LoginModal;