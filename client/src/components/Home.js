import React, { Component } from 'react'
import Navigationbar from './Navbar';
import EcommercePage from './Min-pro';
import ProCard from './ProCard';
import { MDBRow } from 'mdbreact';
import FooterPage from './FooterPage';
import LoginModal from './LoginModal';
import main from './main.jpg';


export class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             token:"",
             userId:""
        }
    }
    
    componentDidMount(){
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        this.setState({
            token:token,
            userId:userId
        })
       
    }
    render() {
        const items = [
            {name : 'Consoles' ,label:'Console'},
            {name : 'Gaming Pc' ,label:'Gaming Pc'},
            {name : 'Game DVDs' ,label:'Game DVDs'},
            {name : 'Accessories' ,label:'Accessories'}
    
        ]
        
        return (
            <div>
                  <Navigationbar  />
                    <img src = {main} />
            
                     
                     
             <div>
             <ProCard token={this.state.token}/>
                     
            </div>
                         
           <div>
                    
                  <FooterPage />
            </div>

            </div>
        )
    }
}

export default Home
      