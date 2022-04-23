import React from 'react';
import { Link } from 'react-router-dom';
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
<Link to={`/PaperDetail/${paper.id}`}>
    <div className ="home-container">
<Card className="paper-card">
        <CardTitle className="paper-name">{paper.name}</CardTitle>
        <CardImg 
          alt="paper image"
          className="paper-image"
          src={paper.imageURL}
        />
        <CardBody>
          <CardSubtitle className='paper-color'>{paper.color}</CardSubtitle>

          <Button className='add-to-cart' type='button'>
            Add to Cart
          </Button>
        </CardBody>
      </Card>
    </div>
</Link>
  )
}

// Home.propTypes = {}
