import React from 'react';
import { IntervalRow, IntervalStock, IntervalWaste} from './index';
import './Intervals.css';

const Interval = () => (
  <>
    <div className="row mx-1"> 
      {
        Array(4).fill(null).map((_, idx) => {
          return <IntervalRow idx={idx} key={idx+'row'} />
        })
      }
    </div>
    <div className="row mx-1"> 
      {
        Array(4).fill(null).map((_, idx) => {
          return <IntervalWaste idx={idx} key={idx+'waste'} />
        })
      }
      <IntervalStock />
    </div>
  </>
);

export default Interval;