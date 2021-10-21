import "./App.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
// import ReactDOM from "react-dom";
// import "arch-editor/dist/arch-editor.css";
// import { ArchEditor, BlockToolbar, ArchEditorProvider } from "arch-editor";

import finnLogo from "./assets/finn.png";
import navLogo from "./assets/nav-logo-red.svg";

function App() {
  const [input, setInput] = useState("");
  const [platform, setPlatform] = useState();
  const [output, setOutput] = useState("");
  const textEl = useRef(null);

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

  const listPersonalia = useCallback(() => {
    if (platform === "Finn") {
      // finn arbeidsgiver
      const empMeta = input.indexOf("Arbeidsgiver");
      const adMeta = input.indexOf("Stillingstittel");
      let difference = adMeta - empMeta - 17;
      const employer = input.substr(empMeta + 17, difference);
      // const advertisement = input.substr(adMeta+20)
      // ...
      setOutput(<><b>Arbeidsgiver:</b> {employer}</>);
    }
  }, [input, platform]);

  // const eeeeeeeeeeeeee = useCallback(() => {
  //   if (input.includes()) {

  //   }
  // }, [input]);

  const extractValuesFromInput = useCallback(() => {
    determinePlatform();
    listPersonalia();
  }, [determinePlatform, listPersonalia]);

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

  return (
    <>
      <div className="bar">
        <img src={logo} alt="" />
      </div>
      <div className="flex">
        <div>
          <textarea
            name="textarea"
            id=""
            value={input}
            onChange={changehandler}
            ref={textEl}
          ></textarea>
        </div>
        <div>{output}</div>
      </div>
    </>
  );
}

export default App;
