import React, { useState, useContext } from "react";
import Colorful from "@uiw/react-color-colorful";
import { AppContext } from "./App";
import { DEFAULT_COLORS } from "./utils/constant";

const Colorizer = () => {
  const [target, setTarget] = useState(0);
  const { colors, dispatch } = useContext(AppContext);

  const onItemClick = (e) => {
    setTarget(parseInt(e.target.id));
  };

  const onColorChange = (c) => {
    dispatch({ type: "change", id: target, color: c });
  };

  const onRandomColors = () => {
    dispatch({ type: "random" });
  };

  return (
    <>
      <div className="SelectorItem RandomButton" onClick={onRandomColors}>
        🎲 随机
      </div>
      <div className="Colorizer">
        <div className="TargetSelector">
          {DEFAULT_COLORS.map(({ id, key, name, color }) => (
            <div
              className={`SelectorItem ${id === target ? "ItemSelected" : ""}`}
              id={id}
              key={key}
              onClick={onItemClick}
            >
              <div
                style={{
                  backgroundColor: colors.find((p) => p.id === id).color,
                }}
                className="ItemPanel"
              ></div>
              {name}
            </div>
          ))}
        </div>
        <div className="ColorPicker">
          <Colorful
            className="Colorful"
            disableAlpha={true}
            color={colors.find((p) => p.id === target)?.color ?? "#ffffff"}
            onChange={(c) => onColorChange(c.hex)}
          />
          <div className="ColorCandidates">
            {[...new Set(colors.map((p) => p.color))].map((c, i) => (
              <div
                key={i}
                style={{ backgroundColor: c }}
                className="Candidate"
                onClick={() => onColorChange(c)}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Colorizer;
