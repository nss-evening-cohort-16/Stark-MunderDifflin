import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getPaperById } from '../data/paperData';

// import PropTypes from 'prop-types'

export default function PaperDetails() {
  const [paperDetail, setPaperDetail] = useState([]);
  const { dbKey } = useParams();

  useEffect(() => {
    // let isMounted = true;
    getPaperById(dbKey).then(setPaperDetail);
    return () => {
      // isMounted = false;
    };
  }, []);

  
  return (
      <h2>
        {paperDetail.name}
      </h2>
  );
};

// PaperDetails.propTypes = {}
