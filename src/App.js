import React, { useState } from "react";
import "./App.css";
import ReactPixi from "./reactPixi";
import SvgApproach from "./svgApproach";
import ReactKonva from "./reactKonva";
import Draggable from "react-draggable";

const App = () => {
  const [cropDetails, setCropDetails] = useState({});
  return (
    <>
      <ReactPixi setCropDetails={setCropDetails} />
      <SvgApproach setCropDetails={setCropDetails} />
      <ReactKonva setCropDetails={setCropDetails} />
      {Object.keys(cropDetails).length > 0 && (
        <Draggable
          defaultPosition={{ x: window.innerWidth - 235 - 300, y: -544 }}
        >
          <div style={{ backgroundColor: "#E5E5E5", width: "200px" }}>
            <div style={{ width: 280 }}>
              <div>
                <button onClick={() => setCropDetails({})}>close</button>
              </div>
              <h2>Id : {cropDetails.id}</h2>
              <h3>Photo : {cropDetails.photoID}</h3>
            </div>
          </div>
        </Draggable>
      )}
    </>
  );
};

export default App;
