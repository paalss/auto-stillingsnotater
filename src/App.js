import "./App.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
// import ReactDOM from "react-dom";
// import "arch-editor/dist/arch-editor.css";
// import { ArchEditor, BlockToolbar, ArchEditorProvider } from "arch-editor";

import finnLogo from "./assets/finn.png";
import navLogo from "./assets/nav-logo-red.svg";

function App() {
  // const defaultState = ``;
  const [input, setInput] = useState("");
  const [platform, setPlatform] = useState();
  const [output, setOutput] = useState(["array", "barray"]);
  const textEl = useRef(null);

  console.log(output);

  const changehandler = () => {
    setInput(textEl.current.value);
  };

  const determinePlatform = useCallback(() => {
    if (input.includes("Min FINN")) {
      setPlatform("Finn");
    } else if (input.includes("NAV og samfunn")) {
      setPlatform("Nav");
    }
  }, [input]);

  const listGeneralInfo = useCallback(() => {
    if (platform === "Finn") {
      // console.log(input);
      const breakLineBreaks = input.split("\n");
      // console.log(breakLineBreaks);

      const metadata = [
        "Arbeidsgiver",
        "Stillingstittel",
        "Frist",
        "Ansettelsesform",
      ];

      const metadataIndexes = metadata.map((item) => {
        return breakLineBreaks.findIndex((element) => element === item);
      });

      // console.log(metadataIndexes);

      const data = metadataIndexes.map((index) => {
        return (
          <>
            <b>**{breakLineBreaks[index]}:**</b> {breakLineBreaks[index + 1]}
          </>
        );
      });

      // console.log(data);

      console.log("nå endrer vi denne");
      setOutput((prev) => {
        return { prev, generalInfo: data };
      });

      // const breakMultipleSpaces = input.split("    ");
      // console.log(breakMultipleSpaces);
    }
  }, [input, platform]);

  // const eeeeeeeeeeeeee = useCallback(() => {
  //   if (input.includes()) {

  //   }
  // }, [input]);

  const extractValuesFromInput = useCallback(() => {
    determinePlatform();
    listGeneralInfo();
  }, [determinePlatform, listGeneralInfo]);

  useEffect(() => {
    extractValuesFromInput();
  }, [input, extractValuesFromInput]);

  let logo;
  if (platform === "Finn") {
    logo = finnLogo;
  }
  if (platform === "Nav") {
    logo = navLogo;
  }

  // console.info(output);

  return (
    <>
      <div className="bar">
        <img src={logo} alt="" />
      </div>
      <div className="flex">
        <div className="half-width">
          <textarea
            name="textarea"
            id=""
            value={input}
            onChange={changehandler}
            ref={textEl}
          ></textarea>
        </div>
        <div className="flex column half-width">
          {/* General info */}
          <div>
            <h2>Generell info</h2>
            <ul>
              {output.generalInfo &&
                output.generalInfo.map((line, index) => {
                  return (
                    <li key={index}>
                      {/* Er anti-pattern å bruke index som key */}
                      {line}
                    </li>
                  );
                })}
            </ul>
          </div>
          <div>
            <h2>Erfaring</h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
