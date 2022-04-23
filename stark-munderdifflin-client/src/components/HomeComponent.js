import React from 'react';
import {
  Card,
  CardTitle,
  CardBody,
  Button,
  CardSubtitle,
  CardImg,
} from 'reactstrap';

export default function HomeComponent({ paper }) {
  return (
    <div className ="home-container">
<Card className="paper-card">
        <CardTitle className="paper-name">{paper.name}</CardTitle>
        <CardImg 
          alt="paper image"
          className="paper-image"
          src={paper.imageURL}
        />
        <CardBody>
          <CardSubtitle className="paper-color">{paper.color}        
          </CardSubtitle>
                 
            <Button
                className="add-to-cart"
                type="button"
              >
                Add to Cart
              </Button>        
        </CardBody>
      </Card>   
    </div>
  )
}

// Home.propTypes = {}
