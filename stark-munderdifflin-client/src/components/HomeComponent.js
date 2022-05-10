import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardTitle,
  CardBody,
  Button,
  CardSubtitle,
  CardImg,
} from 'reactstrap';
import { addToCart } from '../data/cartData';

export default function HomeComponent({ paper, user, handleDelete }) {
  const [paperQty, setPaperQty] = useState(1);
  const navigate = useNavigate();

  const handlepaperQty = (e) => {
    setPaperQty(e.value);
  };

  const handleAdd = () => {
    const item = {
      PaperId: paper.id,
      Quantity: paperQty,
      orderId: 0,
    };
    addToCart(item);
  };

  return (
    <div className='home-container'>
      <Card className='paper-card'>
        <CardTitle className='paper-name'>{paper.name}</CardTitle>
        <CardImg
          alt='paper image'
          className='paper-image'
          src={paper.imageURL}
          onClick={() => navigate(`/PaperDetail/${paper.id}`)}
        />
        <CardBody>
          <CardSubtitle className='paper-color'>{paper.color}</CardSubtitle>
          <div className='paper-btn-container'>
            QTY:{' '}
            <input
              id='paperQ'
              className='paper-qty-input'
              defaultValue={paperQty}
              onChange={(e) => handlepaperQty(e)}
            ></input>
            <Button
              id='paper-qty-input'
              className='add-to-cart'
              type='button'
              onClick={() => handleAdd()}
            >
              Add to Cart
            </Button>
            {!user ? (
              ''
            ) : (
              <>
                <Button
                  className='btn btn-success'
                  onClick={() => navigate(`/Edit/${paper.id}`)}
                >
                  Edit
                </Button>
              </>
            )}
            {!user ? ( 
              ''
              ) : (
                <Button
                className='btn btn-danger'
                onClick={() => handleDelete(paper.id)}
              >
            Delete
              </Button>
              )}
                

          </div>
        </CardBody>
      </Card>
    </div>
  );
}

// Home.propTypes = {}
