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
    <div className ="home-page">
<Card className="paper-card">
        <CardTitle className="paper-name">{paper.name}</CardTitle>
        <CardImg 
          alt="paper image"
          className="paper-image"
          />
        <CardBody>
          <CardSubtitle className="paper-color">{paper.color}        
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
    </div>
</Link>
  )
}

// Home.propTypes = {}
