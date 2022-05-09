
// import React, { useState } from 'react'
// import { Form, FormControl, Button } from 'react-bootstrap';
// import databaseConfig from '../data/auth/apiKeys';

// export default function SearchPaper({  func, placeholder, data }) {
//     const [wordEntered, setWordEntered] = useState('');
//     const filteredPaper = () => databaseConfig.filter((papers) => papers.name.toLowerCase().includes(wordEntered.toLowerCase()));
//     const handleSearch = (e) => {
//         const searchWord = e.target.value;
//         setWordEntered(searchWord);
//         if (searchWord === '') {
//             func({});
//         } else {
//             func(filteredPaper);
//         }

//     };

//     const clearInput = () => {
//         func({});
//         setWordEntered('');
//     };
//   return (
//     <>
     
//         <div className="formStyle">
//           <Form className="d-flex">
//             <FormControl
//               type="text"
//               placeholder={placeholder}
//               className="search-paper"
//               onChange={handleSearch}
//             />
//             <Button
//             >
//               Search
//             </Button>
//           </Form>
//         </div>  
//     </>
//   )
// }
