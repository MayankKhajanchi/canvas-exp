import React, { useState } from "react";
import { Stage, Layer, Rect } from "react-konva";
import "./App.css";
import { sessionData } from "./mockData";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
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
    </>
  );
};

export default ReactKonva;
