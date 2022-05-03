import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getPaperById } from '../data/paperData';
import {
  Card,
  CardTitle,
  CardBody,
  CardSubtitle,
  CardImg,
} from 'reactstrap';

// import PropTypes from 'prop-types'

export default function PaperDetails() {
  const [paperDetail, setPaperDetail] = useState([]);
  const { dbKey } = useParams();
  useEffect(() => {
    getPaperById(dbKey).then(setPaperDetail);
    return () => {
    };
  }, []); 
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
         
      </Card>
      
    </div>
  );
};

// PaperDetails.propTypes = {}
