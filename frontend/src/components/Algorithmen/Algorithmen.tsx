import "./Algorithmen.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Measurement from "../Measurement/Measurement";
import CodeList from "../CodeList/CodeList";
import Grover2Qubits from "../Grover2Qubits/Grover2Qubits";
import Grover3Qubits from "../Grover3Qubits/Grover3Qubits";

interface Quantenbit {
  id: number;
  widgets: string[];
}

const Algorithmen = () => {
  const [quantenbits, setQuantenbits] = useState<Quantenbit[]>([
    {
      id: 1,
      widgets: ["×", "×", "×"],
    },
  ]);


  const [seed, setSeed] = useState(1);
  const [selectedOption, setSelectedOption] = useState("1000");

  const [isGrover2, setGrover2] = useState(false);
  const [isGrover3, setGrover3] = useState(false);


  //Methode, für die Auswahl, wie oft die Messung durchgeführt wird
  const handleDropdownChange = (event: any) => {
    setSelectedOption(event.target.value);
    setSeed(Math.random());
  };

  //Methode, um die Elemente auf der Seite neu zu laden
  const reset = () => {
    setSeed(Math.random());
  };

  //liefert den Quantenschaltkreis des EPR-Paars
  const onClickEPR = () => {
    let temp = [
      { id: 1, widgets: ["×", "×"] },
      { id: 2, widgets: ["×", "×"] },
    ];
    temp[0].widgets[0] = "H";
    temp[1].widgets[0] = "Ident";
    temp[0].widgets[1] = "C-CX";
    temp[1].widgets[1] = "CX";
    setQuantenbits(temp);
    setGrover2(false);
    setGrover3(false);
    reset();
  };

  //liefert default Quantenschaltkreis des Grover-Algorithmus mit zwei Quantenbits
  const onClickGrover2 = (konfiguration: number) => {
    setQuantenbits(Grover2Qubits(konfiguration));
    setGrover2(true);
    setGrover3(false);
    reset();
  };

  //liefert default Quantenschaltkreis des Grover-Algorithmus mit drei Quantenbits
  const onClickGrover3 = (konfiguration: number) => {
    setGrover2(false);
    setGrover3(true);
    setQuantenbits(Grover3Qubits(konfiguration));
    reset();
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
          <div className="normalLink">
            <Link to="/Emulator" className="labelHeader">
              Quantenemulator
            </Link>
          </div>
          <div className="currentLink">
            <Link to="/Algorithmen" className="labelHeader">
              Algorithmen
            </Link>
          </div>
        </div>
      </div>
      <hr></hr>
      <div className="content">
        <div className="left">
          <div className="elemente">
            <div>
              Hier werden beispielhaft Algorithmen vorgestellt. Durch die
              Betätigung der Buttons passt sich das Schaubild automatisch an.
              <br></br>
              <br></br>H = Hadamard Gatter<br></br>X = Pauli - X - Gatter
              <br></br>CNOT bzw. CX = Controlled Not Gatter (C-CX = Steuerqubit)
              <br></br>CCNOT bzw. CCX = Controlled Controlled Not Gatter (C-CCX
              = Steuerqubits)<br></br>Z = Pauli - Z - Gatter<br></br>CZ =
              Controlled Z Gatter (C-CZ = Steuerqubit)<br></br>
              CCZ = Controlled Controlled Z Gatter (C-CCZ = Steuerqubits)
              <br></br>
              Ident = Identitätsmatrix
            </div>
            <br></br>
            <hr></hr>
            <br></br>
            <div className="quantenbitContainer">
              <div className="quantengatter">
                Algorithmen
                <div>
                  <div>
                    <button onClick={() => onClickEPR()}>EPR - Paar</button>
                  </div>
                  <div>
                    <button onClick={() => onClickGrover2(-1)}>
                      Grover - 2 Qubits
                    </button>
                  </div>
                  <div>
                    <button onClick={() => onClickGrover3(-1)}>
                      Grover - 3 Qubits
                    </button>
                  </div>
                </div>
              </div>
              <div className="quantenbits">
                {quantenbits.map((quantenbit, index) => (
                  <div key={quantenbit.id}>
                    <div className="algorithmenZone">
                      Quantenbit {index}
                      {quantenbit.widgets.map((widget, index) => (
                        <div className="algorithmen" key={index} draggable>
                          {widget}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                {!isGrover2 && !isGrover3 && (
                    <div>
                        Der Algorithmus des EPR-Paars liefert ein Beispiel, wie man einen verschränkten Zustand zwischen zwei Quantenbits erzeugen kann.
                        <br></br>
                        Dies kann auch den Wahrscheinlichkeiten der Zustandskombinationen oder dem Balkendiagramm entnommen werden.
                    </div>



                )}
                {isGrover3 && (
                  <div>
                    <div>
                                        <button onClick={() => onClickGrover3(0)}>
                                          Suchzustand: 000
                                        </button>
                                        <button onClick={() => onClickGrover3(1)}>
                                          Suchzustand: 001
                                        </button>
                                        <button onClick={() => onClickGrover3(2)}>
                                          Suchzustand: 010
                                        </button>
                                        <button onClick={() => onClickGrover3(3)}>
                                          Suchzustand: 011
                                        </button>
                                        <button onClick={() => onClickGrover3(4)}>
                                          Suchzustand: 100
                                        </button>
                                        <button onClick={() => onClickGrover3(5)}>
                                          Suchzustand: 101
                                        </button>
                                        <button onClick={() => onClickGrover3(6)}>
                                          Suchzustand: 110
                                        </button>
                                        <button onClick={() => onClickGrover3(-1)}>
                                          Suchzustand: 111
                                        </button>
                                      </div>
                                      <div>
                                        Dies ist ein Quantenschaltkreis für den Grover-Algorithmus, der drei Quantenbits enthält. Der Grover-Algorithmus
                                        sucht ein Element innerhalb einer unsortierten Datenbank. Dieses gesuchte Element kann durch die Buttonauswahl
                                        verändert werden. Der Grover-Algorithmus besteht aus drei Teilen. Der erste Teil versetzt alle Quantenbits in
                                        eine Superposition. Der zweite Teil ist das Quantenorakel. Die Aufgabe eines solchen Orakels ist es, das gesuchte Element
                                        zu kennzeichnen. Der dritte Teil verstärkt die Wahrscheinlichkeit des gesuchten Elements. Das Quantenorakel und der Verstärker
                                        ergeben kombiniert eine sog. Grover-Iteration. Diese muss je nach Anzahl der Quantenbits für eine bestimmte Anzahl wiederholt
                                        werden. Für mehr Informationen, <a href="https://learning.quantum.ibm.com/course/fundamentals-of-quantum-algorithms/grovers-algorithm" target="_blank">einfach hier klicken</a>.
                                      </div>
                  </div>
                )}
                {isGrover2 && (
                  <div>
                    <div>
                                        <button onClick={() => onClickGrover2(0)}>
                                          Suchzustand: 00
                                        </button>
                                        <button onClick={() => onClickGrover2(1)}>
                                          Suchzustand: 01
                                        </button>
                                        <button onClick={() => onClickGrover2(2)}>
                                          Suchzustand: 10
                                        </button>
                                        <button onClick={() => onClickGrover2(-1)}>
                                          Suchzustand: 11
                                        </button>
                                      </div>
                                      <div>
                                                                              Dies ist ein Quantenschaltkreis für den Grover-Algorithmus, der zwei Quantenbits enthält. Der Grover-Algorithmus
                                                                              sucht ein Element innerhalb einer unsortierten Datenbank. Dieses gesuchte Element kann durch die Buttonauswahl
                                                                              verändert werden. Der Grover-Algorithmus besteht aus drei Teilen. Der erste Teil versetzt alle Quantenbits in
                                                                              eine Superposition. Der zweite Teil ist das Quantenorakel. Die Aufgabe eines solchen Orakels ist es, das gesuchte Element
                                                                              zu kennzeichnen. Der dritte Teil verstärkt die Wahrscheinlichkeit des gesuchten Elements. Das Quantenorakel und der Verstärker
                                                                              ergeben kombiniert eine sog. Grover-Iteration. Diese muss je nach Anzahl der Quantenbits für eine bestimmte Anzahl wiederholt
                                                                              werden. Für mehr Informationen, <a href="https://learning.quantum.ibm.com/course/fundamentals-of-quantum-algorithms/grovers-algorithm" target="_blank">einfach hier klicken</a>.
                                                                            </div>
                  </div>
                )}
              </div>
            </div>
          </div>
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

export default Algorithmen;
