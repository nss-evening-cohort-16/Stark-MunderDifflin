import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getPaperById, deletePaper } from '../data/paperData';
import { useNavigate } from "react-router-dom";


import {
  Card,
  CardTitle,
  CardBody,
  CardSubtitle,
  CardImg,
  Button,
} from 'reactstrap';

// import PropTypes from 'prop-types'

export default function PaperDetails({user}) {
  const [paperDetail, setPaperDetail] = useState([]);
  const { dbKey } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getPaperById(dbKey).then(setPaperDetail);
    return () => {
    };
  }, []); 

  const handleDelete = (paperId) => {
    deletePaper(paperId) 
    navigate('/')
    };

  return (
    <div className='paper-details-container'>
      <Card className='paper-details-card'>
        <CardImg
          alt="paper image"
          className="paper-image"
          src={paperDetail.imageURL}
        />
        <CardTitle className='paper-details-name'>{paperDetail.name}</CardTitle>
        <CardBody>
          <CardSubtitle className='paper-details-color'>{paperDetail.color}</CardSubtitle>
          <CardSubtitle className='paper-details-specs'>Paper Size: {paperDetail.length}" x {paperDetail.width}"</CardSubtitle>
          <CardSubtitle className='paper-details-weight'>Paper weight: {paperDetail.weight} lbs</CardSubtitle>
        </CardBody>  
        {!user?.isAdmin ? (
              ''
            ) : (
              <>
                <Button
                  className='edit-paper'
                  onClick={() => navigate(`/Edit/${paperDetail.id}`)}
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
                  onClick={() => handleDelete(paperDetail.id)}
                >
                Delete
              </Button>
            )}
            
      </Card>
      
    </div>
  );
};

// PaperDetails.propTypes = {}
