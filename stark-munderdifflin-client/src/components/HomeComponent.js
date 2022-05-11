import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardTitle,
  CardBody,
  Button,
  CardSubtitle,
  CardImg,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { addToCart } from '../data/cartData';

export default function HomeComponent({ paper, user, handleDelete }) {
  const [paperQty, setPaperQty] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handlepaperQty = (e) => {
    setPaperQty(Number(e.target.value));
  };

  const handleAdd = () => {
    const item = {
      paperId: paper.id,
      quantity: paperQty,
      orderId: 0,
    };
    addToCart(item);
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

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
              type='number'
              className='paper-qty-input'
              defaultValue={paperQty}
              onChange={(e) => handlepaperQty(e)}
            ></input>
            {!user ? (
              <>
                <div>
                  <Button
                    className='add-to-cart'
                    onClick={() => handleShowModal()}
                  >
                    Add to Cart
                  </Button>

                  <Modal isOpen={showModal} backdrop='static' keyboard={false}>
                    <ModalHeader>User Not Logged In</ModalHeader>
                    <ModalBody>Please Log In To Add to Cart</ModalBody>
                    <ModalFooter>
                      <Button onClick={handleCloseModal}>Cancel</Button>
                    </ModalFooter>
                  </Modal>
                </div>
              </>
            ) : (
              <Button
                id='paper-qty-input'
                className='add-to-cart'
                type='button'
                onClick={() => handleAdd()}
              >
                Add to Cart
              </Button>
            )}
            {!user?.isAdmin ? (
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
            {!user?.isAdmin ? (
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
