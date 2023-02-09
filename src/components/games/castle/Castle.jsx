import React from 'react';
import { CastleCardRow} from './index';
import './Castle.css';

const Castle = ({dragged}) => (
  <>
    {
      Array(4).fill(null).map((_, i) => 
        <CastleCardRow key={i} cardRow={i+1} dragged={dragged}/>
      )
    }
  </>
);

export default Castle;