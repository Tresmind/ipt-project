import React from "react";
import { MDBRow, MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardFooter,  MDBTooltip } from "mdbreact";

const EcommercePage = () => {
  return (
    <section className="text-center my-5">
      <h2 className="h1-responsive font-weight-bold text-center my-5">
        Our bestsellers
      </h2>
      <p className="grey-text text-center w-responsive mx-auto mb-5">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit,
        error amet numquam iure provident voluptate esse quasi, veritatis
        totam voluptas nostrum quisquam eum porro a pariatur veniam.
      </p>
      <MDBRow>
        <MDBCol lg="3" md="12" className="mb-lg-0 mb-4">
          <MDBCard wide ecommerce>
            <MDBCardImage
              cascade
              src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/img (55).jpg"
              top
              alt="sample photo"
            />
            <MDBCardBody cascade className="text-center">
              <a href="#!" className="text-muted">
                <h5>Camera</h5>
              </a>
              <MDBCardTitle>
                <strong>
                  <a href="#!">GoPro</a>
                </strong>
              </MDBCardTitle>
              <MDBCardText>
                Lorem ipsum dolor sit amet, consectetur adipisicing minima
                veniam elit.
              </MDBCardText>
              <MDBCardFooter className="px-1">
                <span className="float-left font-weight-bold">
                  <strong>1439$</strong>
                </span>
                <span className="float-right">
                  <MDBTooltip
                    placement="top"
                    tag="a"
                    component="i"
                    componentClass="fa fa-eye grey-text ml-3"
                    tooltipContent="Quick look"
                  />
                  <MDBTooltip
                    placement="top"
                    tag="a"
                    component="i"
                    componentClass="fa fa-heart grey-text ml-3"
                    tooltipContent="Add to watchlist"
                  />
                </span>
              </MDBCardFooter>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol lg="4" md="12" className="mb-lg-0 mb-4">
          <MDBCard wide ecommerce>
            <MDBCardImage
              cascade
              src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/img (49).jpg"
              top
              alt="sample photo"
            />
            <MDBCardBody cascade className="text-center">
              <a href="#!" className="text-muted">
                <h5>Photography</h5>
              </a>
              <MDBCardTitle>
                <strong>
                  <a href="#!">Camera</a>
                </strong>
              </MDBCardTitle>
              <MDBCardText>
                Lorem ipsum dolor sit amet, consectetur adipisicing minima
                veniam elit.
              </MDBCardText>
              <MDBCardFooter className="px-1">
                <span className="float-left font-weight-bold">
                  <strong>1160$</strong>
                </span>
                <span className="float-right">
                  <MDBTooltip
                    placement="top"
                    tag="a"
                    component="i"
                    componentClass="fa fa-eye grey-text ml-3"
                    tooltipContent="Quick look"
                  />
                  <MDBTooltip
                    placement="top"
                    tag="a"
                    component="i"
                    componentClass="fa fa-heart grey-text ml-3"
                    tooltipContent="Add to watchlist"
                  />
                </span>
              </MDBCardFooter>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol lg="4" md="12" className="mb-lg-0 mb-4">
          <MDBCard wide ecommerce>
            <MDBCardImage
              cascade
              src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/img (56).jpg"
              top
              alt="sample photo"
            />
            <MDBCardBody cascade className="text-center">
              <a href="#!" className="text-muted">
                <h5>Smartphone</h5>
              </a>
              <MDBCardTitle>
                <strong>
                  <a href="#!">iPhone 6S</a>
                </strong>
              </MDBCardTitle>
              <MDBCardText>
                Lorem ipsum dolor sit amet, consectetur adipisicing minima
                veniam elit.
              </MDBCardText>
              <MDBCardFooter className="px-1">
                <span className="float-left font-weight-bold">
                  <strong>2160$</strong>
                </span>
                <span className="float-right">
                  <MDBTooltip
                    placement="top"
                    tag="a"
                    component="i"
                    componentClass="fa fa-eye grey-text ml-3"
                    tooltipContent="Quick look"
                  />
                  <MDBTooltip
                    placement="top"
                    tag="a"
                    component="i"
                    componentClass="fa fa-heart grey-text ml-3"
                    tooltipContent="Add to watchlist"
                  />
                </span>
              </MDBCardFooter>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </section>
  );
}

export default EcommercePage;