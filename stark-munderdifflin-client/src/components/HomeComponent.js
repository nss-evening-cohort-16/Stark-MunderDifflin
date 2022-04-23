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
<<<<<<< HEAD
    <div className='home-page'>
      <Card className='paper-card'>
        <CardTitle className='paper-name'>{paper.name}</CardTitle>
        <CardImg
          src={paper.imageURL}
          alt='paper image'
          className='paper-image'
        />
        <CardBody>
          <CardSubtitle className='paper-color'>{paper.color}</CardSubtitle>
          <div className='card-btn-container'>
            <Button className='add-to-cart' type='button'>
              <i className='btn btn-primary' />
            </Button>
          </div>
=======
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
>>>>>>> main
        </CardBody>
      </Card>
    </div>
  );
}

// Home.propTypes = {}
