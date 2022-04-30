import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Card,
  CardTitle,
  CardBody,
  Button,
  CardSubtitle,
  CardImg,
} from 'reactstrap';

export default function HomeComponent({ paper }) {
  const navigate = useNavigate();

  return (

    <div className ="home-container">
<Card className="paper-card">
        <CardTitle className="paper-name">{paper.name}</CardTitle>
        <CardImg 
          alt="paper image"
          className="paper-image"
          src={paper.imageURL}
          onClick={() => navigate(`/PaperDetail/${paper.id}`)}
        />
        <CardBody>
          <CardSubtitle className='paper-color'>{paper.color}</CardSubtitle> 
          <div className="paper-btn-container"> 
          
          <Button className='add-to-cart' type='button'>
            Add to Cart
          </Button>
          <Link
                className="edit-paper"
                to={`/edit/${paper.Id}`}
              >
            Edit
              </Link>  
          </div>
        </CardBody>
      </Card>
    </div>

  )
}

// Home.propTypes = {}
