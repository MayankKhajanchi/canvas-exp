import React, { useRef, useState } from "react";
import { Stage, Layer, Rect } from "react-konva";
import "./App.css";
import { sessionData } from "./mockData";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Draggable from "react-draggable";
const ReactKonva = ({ setCropDetails }) => {
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
  console.log("images konva", images.length);
  const divRef = useRef();
  const dargRef = useRef();
  const [scrollValue, setScrollValue] = useState(0);
  const [minPos, setMinPos] = useState(false);
  const devRef = useRef();
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
          Toggle Boxes konva
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
                  <Stage
                    width={600}
                    height={300}
                    options={{
                      backgroundColor: 0x0000ffff,
                      backgroundAlpha: 0,
                    }}
                    id="layer"
                    style={{
                      height: "100%",
                      width: "100%",
                      position: "absolute",
                      marginRight: "0px",
                      marginLeft: "0px",
                      left: "0",
                      top: "0",
                    }}
                  >
                    <Layer>
                      {allBoxes &&
                        boxData
                          .filter((el) => el.photoID === img.id)
                          .map((el) => (
                            <>
                              <Rect
                                x={el.left / 5}
                                y={el.top / 5}
                                width={(el.right - el.left) / 5}
                                height={(el.bottom - el.top) / 5}
                                stroke={el.color}
                                strokeWidth={2}
                                onPointerdown={() =>
                                  setCropDetails({
                                    photoID: el.photoID,
                                    id: el.id,
                                  })
                                }
                              />
                            </>
                          ))}
                    </Layer>
                  </Stage>
                  <div>
                    <img src={img.scaled_img} height={"100%"}></img>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TransformComponent>
      </TransformWrapper>
      {/* minimap */}
      <div
        style={{
          height: images[0].height / 9.99,
          width: "960px",
          border: "1px solid red",
          display: "inline-flex",
          position: "relative",
          overflow: "scroll",
          marginTop: 10,
        }}
      >
        <Draggable
          axis="x"
          ref={dargRef}
          bounds={{ left: 0, right: divRef.current?.clientWidth }}
          onDrag={(e) => {
            console.log("dragging");
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
          {/* <Stage
            width={(5 * 960) / 9.99}
            height={100}
            options={{
              backgroundColor: 0x0000ffff,
              backgroundAlpha: 0,
            }}
            id="layer"
            style={{
              height: "100%",
              width: "100%",
              position: "absolute",
              marginRight: "0px",
              marginLeft: "0px",
              left: "0",
              top: "0",
              zIndex: "999",
            }}
          >
            <Layer>
              <Rect
                x={0}
                y={0}
                width={(5 * 960) / 9.99}
                height={100}
                stroke={"yellow"}
                strokeWidth={4}
              />
            </Layer>
          </Stage> */}
        </Draggable>
        {images.map((img, index) => (
          <div
            key={index}
            style={{
              height: "100%",
              display: "inline-flex",
              position: "relative",
              zIndex: "1",
            }}
          >
            <Stage
              width={600}
              height={100}
              options={{
                backgroundColor: 0x0000ffff,
                backgroundAlpha: 0,
              }}
              id="layer"
              style={{
                height: "100%",
                width: "100%",
                position: "absolute",
                marginRight: "0px",
                marginLeft: "0px",
                left: "0",
                top: "0",
              }}
            >
              <Layer>
                {allBoxes &&
                  boxData
                    .filter((el) => el.photoID === img.id)
                    .map((el) => (
                      <>
                        <Rect
                          x={el.left / 10}
                          y={el.top / 10}
                          width={(el.right - el.left) / 10}
                          height={(el.bottom - el.top) / 10}
                          stroke={el.color}
                          strokeWidth={2}
                          onPointerdown={() =>
                            setCropDetails({
                              photoID: el.photoID,
                              id: el.id,
                            })
                          }
                        />
                      </>
                    ))}
              </Layer>
            </Stage>
            <div>
              <img src={img.scaled_img} height={"100%"}></img>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ReactKonva;
