import React, { useState, useCallback } from "react";
import "./App.css";
import { sessionData } from "./mockData";

const SvgApproach = () => {
  const [boxData, setBoxData] = useState([]);
  const [allBoxes, showAllBoxes] = useState(false);
  const handleIt = () => {
    let data = [];
    sessionData.variants.map((el) => {
      return (data = [...data, ...el.bounding_boxes]);
    });
    setBoxData(data);
  };
  const { images } = sessionData;
  return (
    <>
      <button
        onClick={() => {
          showAllBoxes(!allBoxes);
          handleIt();
        }}
        style={{ marginBottom: "10px" }}
      >
        Toggle Boxes
      </button>
      {images && (
        <div
          style={{
            height: images[0].height / 5,
            width: "960px",
            border: "1px solid red",
            display: "inline-flex",
            position: "relative",
            overflow: "scroll",
          }}
          onScroll={(e) => {
            const target = e.target;
          }}
        >
          {images.map((img, index) => (
            <div
              key={index}
              style={{
                height: "100%",
                display: "inline-flex",
                position: "relative",
              }}
            >
              <svg
                id="layer"
                // stroke-width="2px"
                style={{
                  height: "100%",
                  width: "100%",
                  position: "absolute",
                  marginRight: "0px",
                  marginLeft: "0px",
                  left: "0",
                  top: "0",

                  // zIndex: '999'
                }}
              >
                {allBoxes &&
                  boxData
                    .filter((el) => el.photoID === img.id)
                    .map((el) => (
                      <rect
                        x={el.left / 5}
                        y={el.top / 5}
                        width={(el.right - el.left) / 5}
                        height={(el.bottom - el.top) / 5}
                        stroke={el.color}
                        fill="none"
                        strokeWidth="2px"
                      ></rect>
                    ))}
              </svg>
              <div>
                <img src={img.scaled_img} height={"100%"}></img>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SvgApproach;
