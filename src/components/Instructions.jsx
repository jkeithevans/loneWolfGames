import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../AppContext';
import axios from '../api/index';

const Instructions = () => {

  let { currentGame } = useContext(AppContext);
  let [instructions, setInstructions] = useState([]);

  useEffect(() => {
    axios.getGame(currentGame.name)
      .then(res => setInstructions(res.data))
  }, []);
 
  return (
    <div className="page">
      <h1 className="text-center">Instructions</h1>
      <div className="pagePanel offset-1 col-10 offset-xl-3 col-xl-6 mt-4 p-3">
        <h5 className="ml-5 mb-3">{currentGame.name}</h5>
        {
          instructions.map((line, idx) => {
            return <h6 className="mx-5 mt-2" key={idx}>{line}</h6>
          })
        }
      </div>
    </div>
  );
};

export default Instructions;