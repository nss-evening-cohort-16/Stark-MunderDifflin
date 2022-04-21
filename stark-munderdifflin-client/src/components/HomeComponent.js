import React from 'react';
import {
  Card,
  CardTitle,
  CardBody,
  Button,
  CardSubtitle,
  CardImg,
} from 'reactstrap';

export default function HomeComponent() {
  return (
    <div className ="home-page" onClick={
<Card className="paper-card" border="light" style={{ width: '20rem' }}>
        <CardTitle className="paper-name"></CardTitle>
        <CardImg 
          alt="paper image"
          className="paper-image"
        />
        <CardBody>
          <CardSubtitle className="paper-color">         
          </CardSubtitle>
          <div className="card-btn-container">          
            <Button
                className="add-to-cart"
                type="button"
              >
                <i className="btn btn-primary" />
              </Button>        
          </div>
        </CardBody>
      </Card>
    } >     
    </div>
  )
}

// Home.propTypes = {}
