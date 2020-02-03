import React, { Component } from 'react'
import {Navbar,Nav,Button,NavDropdown,FormControl,Form} from 'react-bootstrap'
import LoginModal from './LoginModal'
import { FaShoppingCart } from 'react-icons/fa';
 import "./Navbar.css";
import { letterSpacing } from '@material-ui/system';
class Navigationbar extends Component {
  state = {
    modal: false,
    userName:"Login",
    isAuth:false,
    token:"",
    userId:"",
    userPhone:""
  };
 
  componentDidMount(){
    const token=localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    if(!token || !expiryDate){
      return;
    }
    if(new Date(expiryDate) <= new Date()){
      this.logoutHandler();
      return;
    }
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    const userPhone = localStorage.getItem('userPhone');
    const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime();
    this.setState({ isAuth:true , token: token, userId: userId , userName:userName , userPhone:userPhone});
    this.setAutoLogout(remainingMilliseconds);
  }

  check = () => {
    console.log(this.state)
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }
  userHandler=(e,authData) =>{
    this.setState({
      userName:authData.userName,
      isAuth:authData.isAuth,
      userId:authData.userId,
      token:authData.token,
      userPhone:authData.userPhone
    })
    localStorage.setItem('token',authData.token);
          localStorage.setItem('userId',authData.userId);
          localStorage.setItem('userName',authData.userName);
          localStorage.setItem('userPhone',authData.userPhone);
          const remainingMilliseconds = 60 * 60 * 1000;
          const expiryDate = new Date(
            new Date().getTime() + remainingMilliseconds 
          );
          localStorage.setItem('expiryDate' , expiryDate.toISOString());
          this.setAutoLogout(remainingMilliseconds);
         
  }

 

  setAutoLogout = milliseconds => {
    setTimeout(() => {
      this.logoutHandler();
    }, milliseconds);
  };

  logoutHandler=()=> {
  // this.refs.customeLogoutRef.logoutHandler();
  // this.setState({
  //   userName:"Login",
  //   isAuth:false
  // })
  this.setState({isAuth:false, token: null , userName:"Login"});
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
  }
  
 
    render() {
      let loginPageSelector
      if(this.state.isAuth){
        loginPageSelector = this.onDetails
      }
      else {
        loginPageSelector = this.toggle
      }
      let logoutNav 
      if(this.state.isAuth){
        logoutNav = <Nav.Link onClick={this.logoutHandler} style={{fontWeight:"bold" ,letterSpacing:"1px", color:"#F3F3F3"}} >Logout</Nav.Link>
      }
      else {
        logoutNav = null;
      }
      let rentPageSelector 
      if(!localStorage.getItem('token')){
       rentPageSelector = <Nav.Link onClick={loginPageSelector} style={{fontWeight:"bold",letterSpacing:"3px" ,color:"#F3F3F3"}}>Rent</Nav.Link>
      }
      else{
        rentPageSelector = <Nav.Link href = "/Rent" style={{fontWeight:"bold" ,letterSpacing:"3px", color:"#F3F3F3" }} >Rent</Nav.Link>
      }
        return (
            <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
  <Navbar.Brand href="/">Easy Gaming</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      
      
    </Nav>
    <Form inline style={{position:"absolute" , left:"68%" }}>
          <vr></vr>
       {/* <FormControl type="text" placeholder="Find gaming accessoires and more.." className="mr-sm-2"  />
       <Button variant="outline-info" >Search</Button> */}
    </Form>
    <Nav>  
      <Nav.Link onClick={loginPageSelector} style={{fontWeight:"bold" ,letterSpacing:"2px", color:"#F3F3F3" }}>{this.state.userName}</Nav.Link>
      {/* <Nav.Link eventKey={2} href={"/Rent"}>  
       Rent
      </Nav.Link> */}
      {rentPageSelector}
      {logoutNav}
          <Nav.Link href="/Cart" style={{fontWeight:"bold", color:"#F3F3F3"}}><FaShoppingCart /></Nav.Link> 
    </Nav>
  </Navbar.Collapse>
</Navbar>
<LoginModal modal={this.state.modal} toggle={this.toggle}  onLogin={this.userHandler} ref="customeLogoutRef"></LoginModal>
            </div>
        )
    }
}

export default Navigationbar
