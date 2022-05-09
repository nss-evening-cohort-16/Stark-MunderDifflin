import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Form, FormControl, Button } from 'react-bootstrap';

import ProductCard from '../components/ProductCards';
import { getAllPapers } from '../data/paperData';

const CardStyle = styled.div`
  .flexContainer {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-evenly;
    margin-top: 2em;
  }
  .formStyle {
    display: block;
    margin: 0 auto;
    width: 50em;
    margin-top: 1em;
  }
`;

const SearchResult = (searchPaper, papers) => {
  if (!searchPaper) {
    return papers;
  }
  return papers.filter((paper) => paper.name.toUpperCase().includes(searchPaper.toUpperCase()));
};
export default function SearchView() {
  const [products, setProducts] = useState([]);
  const [searchProduct, setSearchProduct] = useState('');
  const searchWord = SearchResult(searchProduct, products);
  const [admin, setAdmin] = useState('');

  useEffect(() => {
    let isMounted = true;
    getAllPapers().then((paperArray) => {
      if (isMounted) setProducts(paperArray);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  

  return (
    <>
      <CardStyle>
        <div className="formStyle">
          <Form className="d-flex">
            <FormControl
              type="text"
              placeholder="Search By Name"
              className="me-2"
              aria-label="Search-by-name"
              onChange={(e) => {
                setSearchProduct(e.target.value);
                e.preventDefault();
              }}
            />
            <Button
              variant="outline-secondary"
              style={{ width: '5rem', height: '3rem', padding: '.5rem' }}
            >
              Search
            </Button>
          </Form>
        </div>
        <div className="flexContainer">
          {searchWord ? (
            <>
              {searchWord.map((word) => (
                <ProductCard
                  product={word}
                  setProducts={setProducts}
                  key={word.firebaseKey}
                  admin={admin}
                />
              ))}
            </>
          ) : (
            'NOT FOUND'
          )}
        </div>
      </CardStyle>
    </>
  );
}