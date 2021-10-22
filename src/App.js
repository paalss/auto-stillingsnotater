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
  const [output, setOutput] = useState({ originalinfo: ["array", "barray"] });
  const textEl = useRef(null);

  // console.log(output);

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
      const breakLineBreaks = input.split("\n");

      const metadata = [
        "Arbeidsgiver",
        "Stillingstittel",
        "Frist",
        "Ansettelsesform",
      ];

      const metadataIndexes = metadata.map((item) => {
        return breakLineBreaks.findIndex((element) => element === item);
      });

      const data = metadataIndexes.map((index) => {
        return (
          <>
            <b>**{breakLineBreaks[index]}:**</b> {breakLineBreaks[index + 1]}
          </>
        );
      });

      setOutput((prev) => {
        return { ...prev, generalInfo: data };
      });
    }
  }, [input, platform]);

  const printInstancesOfPhrase = useCallback(
    (phrase, dataGroup) => {
      if (input.includes(phrase)) {
        const phraseIndex = input.indexOf(phrase);
        let phraseIndexArray = [phraseIndex];
        let newPhraseIsFound = true;
        let count = 0;
        while (newPhraseIsFound) {
          const phraseIndex = input.indexOf(
            phrase,
            phraseIndexArray[count] + 1
          );
          if (phraseIndex === -1) {
            newPhraseIsFound = false;
          } else {
            phraseIndexArray = [...phraseIndexArray, phraseIndex];
            count++;
          }
        }
        const data = phraseIndexArray.map((index) => {
          const lenght = 90;
          const textWhereItsUsed = input.substr(index - lenght, lenght * 2);
          const textWhereItsUsedBeforeAndAfter = textWhereItsUsed.split(phrase);
          return [
            textWhereItsUsedBeforeAndAfter[0],
            <>
              <b>{phrase}</b>
            </>,
            textWhereItsUsedBeforeAndAfter[1],
          ];
        });
        setOutput((prev) => {
          const result = { ...prev, [dataGroup]: data };
          return result;
        });
      }
    },
    [input]
  );

  // This code is contributed by avanitrachhadiya2155

  // const eeeeeeeeeeeeee = useCallback(() => {
  //   if (input.includes()) {

  //   }
  // }, [input]);

  const extractValuesFromInput = useCallback(() => {
    determinePlatform();
    listGeneralInfo();
    printInstancesOfPhrase("års erfaring", "yearsExperience");
    printInstancesOfPhrase("erfaring", "experience");
    printInstancesOfPhrase("karakter", "gradeDoc");
    printInstancesOfPhrase("vitnemål", "diploma");
  }, [determinePlatform, listGeneralInfo, printInstancesOfPhrase]);

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
      <div className="flex row-desktop">
        <div className="half-width-desktop">
          <textarea
            name="textarea"
            id=""
            value={input}
            onChange={changehandler}
            ref={textEl}
          ></textarea>
        </div>
        <div className="flex column half-width-desktop">
          <div>
            <h2>Erfaring</h2>
            {output.yearsExperience && <h3>Års erfaring</h3>}
            {output.yearsExperience &&
              output.yearsExperience.map((e, index) => {
                return (
                  <span key={index}>
                    {index > 0 && <hr />}
                    <p>
                      {e.map((line, index) => {
                        return <span key={index}>{line}</span>;
                      })}
                    </p>
                  </span>
                );
              })}
            {output.experience && <h3>Erfaring</h3>}
            {output.experience &&
              output.experience.map((e, index) => {
                return (
                  <span key={index}>
                    {index > 0 && <hr />}
                    <p>
                      {e.map((line, index) => {
                        return <span key={index}>{line}</span>;
                      })}
                    </p>
                  </span>
                );
              })}
          </div>
          <div>
            <h2>Generell info</h2>
            <div>
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
              <br />
            </div>
          </div>
          <div>
            <h2>Kontaktperson</h2>
          </div>
          <div>
            <h2>Vedlegg</h2>
            {output.gradeDoc && <h3>Karakter</h3>}
            {output.gradeDoc &&
              output.gradeDoc.map((e, index) => {
                return (
                  <span key={index}>
                    {index > 0 && <hr />}
                    <p>
                      {e.map((line, index) => {
                        return <span key={index}>{line}</span>;
                      })}
                    </p>
                  </span>
                );
              })}
            {output.diploma && <h3>Vitnemål</h3>}
            {output.diploma &&
              output.diploma.map((e, index) => {
                return (
                  <span key={index}>
                    {index > 0 && <hr />}
                    <p>
                      {e.map((line, index) => {
                        return <span key={index}>{line}</span>;
                      })}
                    </p>
                  </span>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
