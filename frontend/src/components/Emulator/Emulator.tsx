import "./Emulator.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Measurement from "../Measurement/Measurement";
import CodeList from "../CodeList/CodeList";

interface Quantenbit {
  id: number;
  widgets: string[];
}

const Emulator = () => {
  const [quantenbits, setQuantenbits] = useState<Quantenbit[]>([
    {
      id: 1,
      widgets: [
        "×",
        "×",
        "×",
        "×",
        "×",
        "×",
        "×",
        "×",
        "×",
        "×",
        "×",
        "×",
        "×",


      ],
    },
  ]);

  const [count, setCount] = useState<number>(quantenbits.length);

  const [seed, setSeed] = useState(1);

  const [position, setPosition] = useState(-1);

  const [positionControllWidget, setPositionControllWidget] = useState(-1);

  const [selectedOption, setSelectedOption] = useState("1000");

  const reset = () => {
    setSeed(Math.random());
  };

  const handleDropdownChange = (event: any) => {
    setSelectedOption(event.target.value);
    setSeed(Math.random());
  };

  function widgetPosition(widgetType: string, index: number) {
    if (widgetType === "CX") {
      if (quantenbits.length > 1) {
        console.log("Geht hier rein");
        if (position >= 0) {
          for (let i = 0; i < quantenbits.length; i++) {
            if (quantenbits[i].widgets[position] === "×" && i !== index) {
              quantenbits[index].widgets[position] = widgetType;
              quantenbits[i].widgets[position] = "C-CX";
              break;
            }
          }
        }
      }
    } else if (widgetType === "CCX") {
      if (quantenbits.length > 2) {
        if (position >= 0) {
          let counter = 0;
          for (let i = 0; i < quantenbits.length; i++) {
            if (quantenbits[i].widgets[position] === "×" && i !== index) {
              counter++;
            }
          }
          if (counter >= 2) {
            counter = 0;
            for (let i = 0; i < quantenbits.length; i++) {
              if (quantenbits[i].widgets[position] === "×" && i !== index) {
                counter++;
                quantenbits[index].widgets[position] = widgetType;
                quantenbits[i].widgets[position] = "C-CCX";
                if (counter === 2) {
                  break;
                }
              }
            }
          }
        }
      }
    } else if (widgetType === "CZ") {
      if (quantenbits.length > 1) {
        if (position >= 0) {
          for (let i = 0; i < quantenbits.length; i++) {
            if (quantenbits[i].widgets[position] === "×" && i !== index) {
              quantenbits[index].widgets[position] = widgetType;
              quantenbits[i].widgets[position] = "C-CZ";
              break;
            }
          }
        }
      }
    } else if (widgetType === "CCZ") {
      if (quantenbits.length > 2) {
        if (position >= 0) {
          let counter = 0;
          for (let i = 0; i < quantenbits.length; i++) {
            if (quantenbits[i].widgets[position] === "×" && i !== index) {
              counter++;
            }
          }
          if (counter >= 2) {
            counter = 0;
            for (let i = 0; i < quantenbits.length; i++) {
              if (quantenbits[i].widgets[position] === "×" && i !== index) {
                counter++;
                quantenbits[index].widgets[position] = widgetType;
                quantenbits[i].widgets[position] = "C-CCZ";
                if (counter === 2) {
                  break;
                }
              }
            }
          }
        }
      }
    } else {
      quantenbits[index].widgets[position] = widgetType;
    }
  }

  function handleOnDrag(e: React.DragEvent, widgetType: string) {
    e.dataTransfer.setData("widgetType", widgetType);
  }

  function handleOnDragWidgetD(e: React.DragEvent, widgetType: string) {
    e.dataTransfer.setData("widgetType", widgetType);
  }

  function handleOnDrop(e: React.DragEvent, index: number) {
    const widgetType = e.dataTransfer.getData("widgetType") as string;
    if (
      widgetType !== "C-CX" &&
      widgetType !== "C-CCX" &&
      widgetType !== "C-CZ" &&
      widgetType !== "C-CCZ"
    ) {
      widgetPosition(widgetType, index);
      setPosition(-1);
      reset();
    } else {
      quantenbits[positionControllWidget - 1].widgets[position] = "×";
      widgetPosition(widgetType, index);
      setPosition(-1);
      reset();
    }
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  const handleHoverOver = (element: any) => {
    setPosition(element);
  };

  const handleDeleteWidget = (
    widgetId: number,
    quantenbitId: number,
    widget: string
  ) => {
    if (widget === "CX") {
      for (let i = 0; i < quantenbits.length; i++) {
        if (quantenbits[i].widgets[widgetId] === "C-CX") {
          quantenbits[i].widgets[widgetId] = "×";
          break;
        }
      }
    }
    if (widget === "CCX") {
      let counter = 0;
      for (let i = 0; i < quantenbits.length; i++) {
        if (quantenbits[i].widgets[widgetId] === "C-CCX") {
          counter++;
          quantenbits[i].widgets[widgetId] = "×";
          if (counter === 2) {
            break;
          }
        }
      }
    }
    if (widget === "CZ") {
      for (let i = 0; i < quantenbits.length; i++) {
        if (quantenbits[i].widgets[widgetId] === "C-CZ") {
          quantenbits[i].widgets[widgetId] = "×";
          break;
        }
      }
    }
    if (widget === "CCZ") {
      let counter = 0;
      for (let i = 0; i < quantenbits.length; i++) {
        if (quantenbits[i].widgets[widgetId] === "C-CCZ") {
          counter++;
          quantenbits[i].widgets[widgetId] = "×";
          if (counter === 2) {
            break;
          }
        }
      }
    }
    for (let i = 0; i < quantenbits.length; i++) {
      if (quantenbits[i].id === quantenbitId) {
        quantenbits[i].widgets[widgetId] = "×";
        break;
      }
    }
  };

  const handleDeleteQuantenbit = (quantenbitId: number) => {
    setQuantenbits(
      quantenbits.filter((quantenbit) => quantenbit.id !== quantenbitId)
    );
  };

  return (
    <div className="fullPage">
      <div className="header">
        <div className="headerName">
          <h3>
            <b>QUANTENEMULATOR</b>
          </h3>
        </div>
        <div className="linkName">
          <div className="normalLink">
            <Link to="/" className="labelHeader">
              Home
            </Link>
          </div>
          <div className="currentLink">
            <Link to="/Emulator" className="labelHeader">
              Quantenemulator
            </Link>
          </div>
          <div className="normalLink">
            <Link to="/Algorithmen" className="labelHeader">
              Algorithmen
            </Link>
          </div>
        </div>
      </div>
      <hr></hr>
      <div>
      <div className="elementeTop">
                  <div>
                    Hier befinden sich die Quantengatter. Diese können per drag and
                    drop in die Markierungen gezogen werden.<br></br>H = Hadamard
                    Gatter<br></br>X = Pauli - X - Gatter<br></br>CNOT bzw. CX =
                    Controlled Not Gatter (C-CX = Steuerqubit)
                    <br></br>CCNOT bzw. CCX = Controlled Controlled Not Gatter (C-CCX
                    = Steuerqubits)<br></br>Z = Pauli - Z - Gatter<br></br>CZ =
                    Controlled Z Gatter (C-CZ = Steuerqubit)<br></br>
                    CCZ = Controlled Controlled Z Gatter (C-CCZ = Steuerqubits)
                  </div>
                  <br></br>
                  <hr></hr>
                  <br></br>
                  <div className="quantenbitContainer">
                    <div className="quantengatter">
                      Quantengatter
                      <div>
                        <div
                          className="widget"
                          draggable
                          onDragStart={(e) => handleOnDrag(e, "H")}
                        >
                          H
                        </div>
                        <div
                          className="widget"
                          draggable
                          onDragStart={(e) => handleOnDrag(e, "X")}
                        >
                          X
                        </div>
                        <div
                          className="widget"
                          draggable
                          onDragStart={(e) => handleOnDrag(e, "CX")}
                        >
                          CX
                        </div>
                        <div
                          className="widget"
                          draggable
                          onDragStart={(e) => handleOnDrag(e, "CCX")}
                        >
                          CCX
                        </div>
                        <div
                          className="widget"
                          draggable
                          onDragStart={(e) => handleOnDrag(e, "Z")}
                        >
                          Z
                        </div>
                        <div
                          className="widget"
                          draggable
                          onDragStart={(e) => handleOnDrag(e, "CZ")}
                        >
                          CZ
                        </div>
                        <div
                          className="widget"
                          draggable
                          onDragStart={(e) => handleOnDrag(e, "CCZ")}
                        >
                          CCZ
                        </div>
                      </div>
                    </div>
                    <div className="quantenbits">
                      {quantenbits.map((quantenbit, index) => (
                        <div key={quantenbit.id}>
                          <div
                            className="dropZoneForGatter"
                            onDrop={(event) => handleOnDrop(event, index)}
                            onDragOver={handleDragOver}
                          >
                            {quantenbit.id !== 1 && (
                              <button
                                className="buttonQuantenbit"
                                onClick={() => {
                                  handleDeleteQuantenbit(quantenbit.id);
                                  reset();
                                }}
                              >
                                X
                              </button>
                            )}
                            Quantenbit {index}
                            {quantenbit.widgets.map((widget, index) => (
                              <div
                                className="dropped-widget"
                                key={index}
                                draggable
                                onDragOver={() => handleHoverOver(index)}
                                onDragStart={(e) => {
                                  if (widget === "C-CX") {
                                    handleOnDragWidgetD(e, "C-CX");
                                    setPositionControllWidget(quantenbit.id);
                                  }
                                  if (widget === "C-CCX") {
                                    handleOnDragWidgetD(e, "C-CCX");
                                    setPositionControllWidget(quantenbit.id);
                                  }
                                  if (widget === "C-CZ") {
                                    handleOnDragWidgetD(e, "C-CZ");
                                    setPositionControllWidget(quantenbit.id);
                                  }
                                  if (widget === "C-CCZ") {
                                    handleOnDragWidgetD(e, "C-CCZ");
                                    setPositionControllWidget(quantenbit.id);
                                  }
                                }}
                              >
                                {widget !== "×" &&
                                  widget !== "C-CX" &&
                                  widget !== "C-CCX" &&
                                  widget !== "C-CZ" &&
                                  widget !== "C-CCZ" && (
                                    <button
                                      className="buttonWidgets"
                                      onClick={() => {
                                        handleDeleteWidget(
                                          index,
                                          quantenbit.id,
                                          widget
                                        );
                                        reset();
                                      }}
                                    >
                                      X
                                    </button>
                                  )}
                                {widget}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      <div>
                        <button
                          onClick={() => {
                            setQuantenbits([
                              ...quantenbits,
                              {
                                id: count + 1,
                                widgets: [
                                   "×",
                                          "×",
                                          "×",
                                          "×",
                                          "×",
                                          "×",
                                          "×",
                                          "×",
                                          "×",
                                          "×",
                                          "×",
                                          "×",
                                          "×",


                                ],
                              },
                            ]);
                            setCount(count + 1);
                            reset();
                          }}
                        >
                          neues Quantenbit hinzufügen
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

      </div>
      <div className="content">
        <div className="left">

          <div className="elemente">
            <Measurement
              elemente={quantenbits}
              key={seed}
              radius={60}
              wiederholungen={selectedOption}
            ></Measurement>
            <p className="anzahlTests">
              Anzahl der Testdurchführung
              <select value={selectedOption} onChange={handleDropdownChange}>
                <option value="1000">1000</option>
                <option value="10">10</option>
                <option value="100">100</option>
              </select>
              <button onClick={() => reset()}>
                Messungen erneut durchfühen
              </button>
            </p>
          </div>
        </div>

        <div className="codeText">
          <div className="">
            <CodeList quantenbits={quantenbits}></CodeList>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emulator;
