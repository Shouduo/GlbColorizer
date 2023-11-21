import React, { useState, useContext } from "react";
import Colorful from "@uiw/react-color-colorful";
import { AppContext } from "./App";
import "./Colorizer.css";

const TargetSelector = ({ items, onItemClick }) => {
  const [top, setTop] = useState(0);
  const onClick = (e) => {
    setTop(e.target.offsetTop);
    onItemClick(e);
  };
  return (
    <div className="TargetSelector">
      <div className="SelectorContainer">
        <div
          className="SelectedBackground"
          style={{ transform: `translateY(${top}px)` }}
        />
        {items.map(({ id, key, name, color }) => (
          <div className="SelectorItem" id={id} key={key} onClick={onClick}>
            <div style={{ backgroundColor: color }} className="ItemDot"></div>
            {name}
          </div>
        ))}
      </div>
    </div>
  );
};

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
      <div className="RandomButton" onClick={onRandomColors}>
        🎲 随机
      </div>
      <div className="Colorizer">
        <TargetSelector items={colors} onItemClick={onItemClick} />
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
