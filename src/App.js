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
  const textEl = useRef(null);

  const changehandler = () => {
    setInput(textEl.current.value);
  };

  const determinePlatform = useCallback(() => {
    if (input.includes("Min FINN")) {
      setPlatform("Finn");
    } else if (input.includes("NAV og samfunn")) {
      setPlatform("Nav")
    }
  }, [input]);

  const setOutput = useCallback(() => {
    determinePlatform();
    // ...
  }, [determinePlatform]);

  useEffect(() => {
    setOutput();
  }, [input, setOutput]);

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
        <div></div>
      </div>
    </>
  );
}

export default App;
