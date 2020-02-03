import React from "react";
import { MDBPagination, MDBPageItem, MDBPageNav, MDBCol, MDBRow } from "mdbreact";
import {  Nav  } from 'react-bootstrap';

const PaginationPage = (props) => {
  let numPages = []


  for(let i=1; i <= props.lastPage; i++){
    numPages.push(<MDBPageItem >
      <MDBPageNav >
        {i} <span className="sr-only">(current)</span>
      </MDBPageNav>
      </MDBPageItem>
    )
  }
  return (
    
          <MDBRow>
      <MDBCol>
        <MDBPagination className="mb-5">
          {props.currentPage > 1 && (

         
          <MDBPageItem >
            <MDBPageNav aria-label="Previous" onClick={props.onPrevious} >
           
              <span aria-hidden="true">Previous</span>
            
            </MDBPageNav>
          </MDBPageItem>
           )}
           { numPages}
          {/* <MDBPageItem active>
            <MDBPageNav>
              1 <span className="sr-only">(current)</span>
            </MDBPageNav>
          </MDBPageItem>
          <MDBPageItem>
            <MDBPageNav>2</MDBPageNav>
          </MDBPageItem>
          <MDBPageItem>
            <MDBPageNav>3</MDBPageNav>
          </MDBPageItem> */}
          {props.currentPage < props.lastPage && (

          
          <MDBPageItem>
            <MDBPageNav aria-label="Next" onClick={props.onNext}>
             
               <span aria-hidden="true">Next</span>

            </MDBPageNav>
          </MDBPageItem>
          )}
        </MDBPagination>
      </MDBCol>

    </MDBRow>
   

    )
}

export default PaginationPage;