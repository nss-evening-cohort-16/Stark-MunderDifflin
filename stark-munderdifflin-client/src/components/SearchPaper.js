
import React, { useState } from 'react'
import {
    Button  
  } from "reactstrap";

export default function SearchPaper({  func, placeholder, data }) {
    const [wordEntered, setWordEntered] = useState('');
    const filteredData = () => data?.filter((papers) => papers.name.toLowerCase().includes(wordEntered.toLowerCase()) || papers.color.toLowerCase().includes(wordEntered.toLowerCase()));
    
    const handleSearch = (e) => {
        const searchWord = e.target.value;
        setWordEntered(searchWord);

        if (searchWord === '') {
            func({});
        } else {
            func(filteredData);
        }
    };

  return (
    <>  
          <div className="searchInputs" >
            <input
              value = {wordEntered}
              placeholder={placeholder}
              onChange={handleSearch}
            />
            <Button type='button'
            className = 'search-button'
            >
              Search
            </Button>
          </div>
        
    </>
  )
}
