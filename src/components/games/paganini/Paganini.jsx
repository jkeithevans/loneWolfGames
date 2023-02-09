import React from 'react';
import PagCardRow from './PagCardRow';
import './Paganini.css';

const Paganini = () => (
  <>
    {
      Array(8).fill(null).map((_, i) => 
        <PagCardRow key={i} cardRow={i+1} />
      )
    }
  </>
);

export default Paganini;