import React, { useState, useEffect } from 'react';
import { getAllPapers, deletePaper } from '../data/paperData';
import HomeComponent from '../components/HomeComponent';
import { useNavigate } from 'react-router-dom';
import {
  Button,
} from "reactstrap";

export default function Home({user}) {
  const [papers, setPapers] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    let isMounted = true;
    getAllPapers().then((paperArray) => {
      if (isMounted) setPapers(paperArray);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleDelete = async (paperId) => {
    await deletePaper(paperId) 
    getAllPapers().then((paperArray) => setPapers(paperArray));
    
        }

  return (
    <>
      <div className="add-paper-btn">
        {user ? (
        <Button
        className='btn btn-success'
        onClick={() => navigate(`/PaperForm`)}
      >
        Add New Paper
      </Button>
      ) : (
        ""
        )}
      </div>

    <div className="paper-view">
      <>
        {papers.map((paper) => (
          <HomeComponent 
          key={paper.id}         
          paper={paper}
          user={user}
          
          handleDelete={handleDelete}
          />
          ))}
      </>
    </div>
          </>
  );
}