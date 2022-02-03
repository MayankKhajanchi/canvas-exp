import React, { useState, useCallback, useRef } from "react";
import "./App.css";
import { sessionData } from "./mockData";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Draggable from "react-draggable";
const SvgApproach = ({ setCropDetails }) => {
  const [boxData, setBoxData] = useState([]);
  const [allBoxes, showAllBoxes] = useState(false);
  const [zoom, setZoom] = useState(false);
  const handleIt = () => {
    let data = [];
    sessionData.variants.map((el) => {
      return (data = [...data, ...el.bounding_boxes]);
    });
    setBoxData(data);
  };
  const { images } = sessionData;
  const divRef = useRef();
  const dargRef = useRef();
  const [scrollValue, setScrollValue] = useState(0);
  const [minPos, setMinPos] = useState(false);
  console.log("images svg", images.length);
  return (
    <>
      <div>
        <button
          onClick={() => {
            showAllBoxes(!allBoxes);
            handleIt();
          }}
          style={{ marginBottom: "10px" }}
        >
          Toggle Boxes SVG
        </button>
        <button
          onClick={() => {
            setZoom(!zoom);
          }}
          style={{ marginBottom: "10px" }}
        >
          {!zoom ? "Enable Zoom" : "Disable Zoom"}
        </button>
      </div>
      <TransformWrapper disabled={!zoom}>
        <TransformComponent>
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
                setScrollValue(target.scrollLeft);
                // if (minPos) setMinPos(false);
              }}
              ref={divRef}
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
                            style={{ cursor: "pointer" }}
                            fill="transparent"
                            strokeWidth="2px"
                            onClick={() =>
                              setCropDetails({
                                photoID: el.photoID,
                                id: el.id,
                              })
                            }
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
        </TransformComponent>
      </TransformWrapper>
      <div
        // ref={divRef}
        style={{
          width: "960px",
          overflow: "scroll",
          height: images[0].height / 9.99,
          border: "1px solid red",
          display: "inline-flex",
          position: "relative",
          marginTop: 10,
          // display: 'inline-block'
        }}
      >
        <Draggable
          axis="x"
          ref={dargRef}
          bounds={{ left: 0, right: divRef.current?.clientWidth }}
          onDrag={(e) => {
            divRef.current.scrollLeft =
              scrollValue / 2 + dargRef.current.state.x;
          }}
          onStop={() => setMinPos(false)}
          onMouseDown={() => setMinPos(true)}
          onMouseUp={() => setMinPos(false)}
          position={
            {
              x: minPos ? dargRef.current.state.x : scrollValue / 2,
              y: 0,
            }
            // : { x: dargRef.current.state.x, y: 0 }
          }
        >
          <svg
            draggable
            style={{
              height: "100%",
              position: "absolute",
              marginRight: "0px",
              marginLeft: "0px",
              width: `${(5 * 960) / 9.99}`,
              // left: `${scrollValue}`,
              top: "0",

              zIndex: "999",
              // stroke-width="2px"
            }}
            // onDrag={e => {
            //   setScrollValue(e.target.scrollLeft);
            // }}
          >
            <rect
              x={0}
              y={0}
              width={(5 * 960) / 9.99}
              height={"100%"}
              stroke={"yellow"}
              strokeWidth="4px"
              fill="none"
            ></rect>
          </svg>
        </Draggable>
        {images.map((img) => (
          <div
            // ref={divRef}
            style={{
              height: "100%",
              // border: '1px solid red',
              display: "inline-flex",
              position: "relative",
              // display: 'inline-block'
            }}
          >
            {allBoxes && (
              <svg
                id="layer"
                stroke-width="2px"
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
                {console.log("images", images.length)}
                {boxData
                  .filter((el) => el.photoID === img.id)
                  .map((el) => (
                    <rect
                      x={el.left / 10}
                      y={el.top / 10}
                      width={(el.right - el.left) / 10}
                      height={(el.bottom - el.top) / 10}
                      stroke={el.color}
                      fill="none"
                    ></rect>
                  ))}

                {/* <g className="plot-area" />
                <g className="x-axis" />
                <g className="y-axis" /> */}
              </svg>
            )}

            <img src={img.scaled_img} height={"100%"}></img>
          </div>
        ))}
      </div>
    </>
  );
};

export default SvgApproach;
