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

  const handleDropdownChange = (event: any) => {
    setSelectedOption(event.target.value);
    setSeed(Math.random());
  };

  const reset = () => {
    setSeed(Math.random());
  };

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
    reset();
  };

  const onClickGrover2 = () => {
    setQuantenbits(Grover2Qubits(-1));
    setGrover2(true);
    setGrover3(false);
    reset();
  };

  const onClickGrover2Suchzustand0 = () => {
    setQuantenbits(Grover2Qubits(0));
    reset();
  };

  const onClickGrover2Suchzustand1 = () => {
    setQuantenbits(Grover2Qubits(1));
    reset();
  };

  const onClickGrover2Suchzustand2 = () => {
    setQuantenbits(Grover2Qubits(2));
    reset();
  };

  const onClickGrover3Suchzustand0 = () => {
    setQuantenbits(Grover3Qubits(0));
    reset();
  };
  const onClickGrover3Suchzustand1 = () => {
    setQuantenbits(Grover3Qubits(1));
    reset();
  };
  const onClickGrover3Suchzustand2 = () => {
    setQuantenbits(Grover3Qubits(2));
    reset();
  };
  const onClickGrover3Suchzustand3 = () => {
    setQuantenbits(Grover3Qubits(3));
    reset();
  };
  const onClickGrover3Suchzustand4 = () => {
    setQuantenbits(Grover3Qubits(4));
    reset();
  };
  const onClickGrover3Suchzustand5 = () => {
    setQuantenbits(Grover3Qubits(5));
    reset();
  };
  const onClickGrover3Suchzustand6 = () => {
    setQuantenbits(Grover3Qubits(6));
    reset();
  };

  const onClickGrover3 = () => {
    setGrover2(false);
    setGrover3(true);
    setQuantenbits(Grover3Qubits(-1));
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
                    <button onClick={() => onClickGrover2()}>
                      Grover - 2 Qubits
                    </button>
                  </div>
                  <div>
                    <button onClick={() => onClickGrover3()}>
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
                {isGrover3 && (
                  <div>
                    <button onClick={() => onClickGrover3Suchzustand0()}>
                      Suchzustand: 000
                    </button>
                    <button onClick={() => onClickGrover3Suchzustand1()}>
                      Suchzustand: 001
                    </button>
                    <button onClick={() => onClickGrover3Suchzustand2()}>
                      Suchzustand: 010
                    </button>
                    <button onClick={() => onClickGrover3Suchzustand3()}>
                      Suchzustand: 011
                    </button>
                    <button onClick={() => onClickGrover3Suchzustand4()}>
                      Suchzustand: 100
                    </button>
                    <button onClick={() => onClickGrover3Suchzustand5()}>
                      Suchzustand: 101
                    </button>
                    <button onClick={() => onClickGrover3Suchzustand6()}>
                      Suchzustand: 110
                    </button>
                    <button onClick={() => onClickGrover3()}>
                      Suchzustand: 111
                    </button>
                  </div>
                )}
                {isGrover2 && (
                  <div>
                    <button onClick={() => onClickGrover2Suchzustand0()}>
                      Suchzustand: 00
                    </button>
                    <button onClick={() => onClickGrover2Suchzustand1()}>
                      Suchzustand: 01
                    </button>
                    <button onClick={() => onClickGrover2Suchzustand2()}>
                      Suchzustand: 10
                    </button>
                    <button onClick={() => onClickGrover2()}>
                      Suchzustand: 11
                    </button>
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
