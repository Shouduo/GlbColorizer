import React, { useReducer, createContext } from "react";
import "./App.css";
import Clown from "./Clown";
import { Canvas } from "@react-three/fiber";
import Colorizer from "./Colorizer";
import { OrbitControls } from "@react-three/drei";
import { DEFAULT_COLORS } from "./utils/constant";

const colorsReducer = (colors, action) => {
  let newColors = colors;
  switch (action.type) {
    case "change": {
      newColors = colors.map((part) => {
        if (part.id === action.id) {
          return { ...part, color: action.color };
        } else {
          return part;
        }
      });
      break;
    }
    case "random": {
      newColors = colors.map((part) => {
        return {
          ...part,
          color:
            "#" +
            Math.floor(Math.random() * 16 ** 6)
              .toString(16)
              .padStart(6, "0"),
        };
      });
      break;
    }
    default:
      throw Error("Unknown action: " + action.type);
  }
  localStorage.setItem("COLORS", JSON.stringify(newColors));
  return newColors;
};

export const AppContext = createContext(null);

const App = () => {
  const [colors, dispatch] = useReducer(
    colorsReducer,
    JSON.parse(localStorage.getItem("COLORS")) ?? DEFAULT_COLORS
  );

  return (
    <div className="App">
      <div className="Background"></div>
      <AppContext.Provider value={{ colors: colors, dispatch: dispatch }}>
        <Canvas className="Canvas">
          <Clown />
        </Canvas>
        <Colorizer />
      </AppContext.Provider>
    </div>
  );
};

export default App;
