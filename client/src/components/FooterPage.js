import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import "./Footer.css";

const FooterPage = () => {
  return (
    <MDBFooter id="override-foot" className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title">Footer Content</h5>
            <p>
              Here you can use rows and columns here to organize your footer
              content.
            </p>
          </MDBCol>
          <MDBCol md="6">
            <h5 className="title">Contact</h5>
            <ul>
              <li className="list-unstyled">
                <p>Email: Afhamahmed21@gmail.com</p>
              </li>
              <li className="list-unstyled">
                <p>Class: BSSE-A (4-Year)</p>
              </li>
              <li className="list-unstyled">
                <p>Contact: +92-322-2656652</p>
              </li>
              
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.Tresmind.com"> Tresmind Solution </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;