import React, { useState, useEffect } from 'react';
import { getAllPapers } from '../data/paperData';
import HomeComponent from '../components/HomeComponent';

export default function Home() {
  const [papers, setPapers] = useState([]);
  
  useEffect(() => {
    let isMounted = true;
    getAllPapers().then((paperArray) => {
      if (isMounted) setPapers(paperArray);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="paper-view">
      <>
        {papers.map((paper) => (
          <HomeComponent 
          key={paper.id}         
            paper={paper}
           
          
          />
        ))}
      </>
    </div>
  );
}