import React, { Component } from 'react'
import { MDBRow, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import {  Nav  } from 'react-bootstrap';
import { height } from '@material-ui/system';


export class SingleCard extends Component {
    render() {
        return (
            <div>
                 <MDBCol>
                 <Nav.Link href={this.props.id}>
                    <MDBCard style={{ width: "15rem" }}>
                        <MDBCardImage className="img-fluid" src={this.props.imgCollection} waves />
                        <MDBCardBody>
                        <MDBCardTitle>Rs {this.props.price}</MDBCardTitle>
                        <MDBCardText>
                            {this.props.title}
                        </MDBCardText>
                            <hr></hr>
                            <div>
                                <p style={{float:"left"}}>{this.props.address}</p>
                                <p style={{float:"right"}}>{this.props.createdAt}</p>

                                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </Nav.Link>
                </MDBCol>
            </div>
        )
    }
}

export default SingleCard
