import React, { useState, useEffect } from 'react';
import { getAllPapers, deletePaper } from '../data/paperData';
import HomeComponent from '../components/HomeComponent';
import SearchPaper from '../components/SearchPaper';
import { Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

export default function Home({ user }) {
  const [papers, setPapers] = useState([]);
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);

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
    await deletePaper(paperId);
    getAllPapers().then((paperArray) => setPapers(paperArray));
  };

  return (
    <>
      <div className='add-paper-btn-container page-section'>
        {user?.isAdmin ? (
          <div className='add-paper-btn'>
            <Button
              className='btn btn-success'
              onClick={() => navigate(`/PaperForm`)}
            >
              Add New Paper
            </Button>
          </div>
        ) : (
          ''
        )}
        <div className='search-filter'>
          <SearchPaper
            placeholder='Search by Name Or Color'
            func={setFilteredData}
            data={papers}
          />
        </div>
      </div>

      <div className='paper-view page-section'>
        <>
          {filteredData.length
            ? filteredData.map((paper) => (
                <HomeComponent
                  key={paper.id}
                  paper={paper}
                  user={user}
                  setPapers={setPapers}
                />
              ))
            : papers.map((paper) => (
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
