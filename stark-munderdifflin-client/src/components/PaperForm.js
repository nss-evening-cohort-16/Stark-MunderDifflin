import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPaperById, createPaper, updatePaper } from '../data/paperData';


const initialState = {
  name: '',
  color: '',
  width: '',
  length: '',
  weight: '',
  price: '',
  imageURL: ''
};

export default function PaperForm() {
    // const [adminID, setAdminID] = useState(null);
    const [formInput, setFormInput] = useState({});
    const { dbKey } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      if(dbKey) {
        getPaperById(dbKey).then((obj) => {
          setFormInput({
            id: obj?.id,
            name: obj?.name,
            color: obj?.color,
            width: obj?.width,
            length: obj?.length,
            weight: obj?.weight,
            price: obj?.price,
            imageURL: obj?.imageURL
          });
        });
      } else {
        setFormInput(initialState)
      }
    }, []);


    // Is this necessary?
    // useEffect(() => {
    //   setAdminID(/* getCurrentUserID */);
    // }, []);

    const handleChange= (e) => {      
      const { name, value } = e.target;
      setFormInput((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };

    const resetForm = () => {
      setFormInput({...initialState});
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (dbKey) {
        updatePaper(formInput).then(() => {
          resetForm();
          navigate('/');
        });
      } else {
        createPaper({...formInput}).then(()=> {
          resetForm();
          navigate('/');
        })
      }      
    };

  return (
    <>
    <h3>Paper Form</h3>
    <form onSubmit={handleSubmit}>
      <div>
        <input 
          type="text"
          className="form-control"
          name='name'
          value={formInput.name || ''}
          onChange={handleChange}
          placeholder="Paper Name"
          required
        />
      </div>
      <div>
        <input 
          type="text"
          className="form-control"
          name='color'
          value={formInput.color || ''}
          onChange={handleChange}
          placeholder="Paper Color"
          required
        />
      </div>
      <div>
        <input 
          type="number"
          className="form-control"
          name='width'
          value={formInput.width || ''}
          onChange={handleChange}
          placeholder="Paper Width"
          required
        />
      </div>
      <div>
        <input 
          type="number"
          className="form-control"
          name='length'
          value={formInput.length || ''}
          onChange={handleChange}
          placeholder="Paper Length"
          required
        />
      </div>
      <div>
        <input 
          type="number"
          className="form-control"
          name='weight'
          value={formInput.weight || ''}
          onChange={handleChange}
          placeholder="Paper Weight"
          required
        />
      </div>
      <div>
        <input 
          type="number"
          className="form-control"
          name='price'
          value={formInput.price || ''}
          onChange={handleChange}
          placeholder="Paper Price"
          required
        />
      </div>
      <div>
        <input 
          type="url"
          className="form-control"
          name='imageURL'
          value={formInput.imageURL || ''}
          onChange={handleChange}
          placeholder="Paper Image"
          required
        />
      </div>
    <button type="submit">
      Submit
    </button>
    </form>
    </>
  )
}
