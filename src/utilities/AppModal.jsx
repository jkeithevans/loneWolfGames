import React, { useContext } from 'react';
import AppContext from '../AppContext';
import './AppModal.css';

const AppModal = ({ gameRestart }) => {

  const { appModal } = useContext(AppContext);
  
  const modalhandler = (type) => {
    if ((appModal.routineAccept === "restart") && (type === "accept")) {
      return gameRestart();
    }
    return (type === "accept")
        ? appModal.routineAccept()
        : appModal.routineRefuse();
  }

  return (
    <div id="appModal" className="pagePanel text-center offset-2 col-8 offset-xl-4 col-xl-4 pt-4 pb-4">
      <h2 className="pb-3">
        {appModal.promptTop}
      </h2>
      {
        (appModal.promptBottom) &&
          <h2 className="pb-3">
            {appModal.promptBottom}
          </h2>
      }
      <div className="row">
        <button className="acceptButton shimmer offset-3 col-6 offset-md-2 col-md-3 mt-4 py-2"
                type="button"
                name="modal"
                onClick={() => modalhandler("accept")} >
          {appModal.buttonAccept}
        </button> 
        <button className="refuseButton shimmer offset-3 col-6 offset-md-2 col-md-3 mt-4 py-2"
                type="button"
                name="modal"
                onClick={() => modalhandler("refuse")} >
          {appModal.buttonRefuse}
        </button>       
      </div>
    </div>
  );
};

export default AppModal;