import "./CodeList.css";

interface Quantenbit {
  id: number;
  widgets: string[];
}

interface CodeListProps {
  quantenbits: Quantenbit[];
}


//liefert den Programmcode für die hinzugefügten Quantengatter
const CodeListe = ({ quantenbits }: CodeListProps) => {
  let temp: string[] = [];

  for (let i = 0; i < quantenbits[0].widgets.length; i++) {
    for (let j = 0; j < quantenbits.length; j++) {
      switch (quantenbits[j].widgets[i]) {
        case "H":
          temp.push("# Hadamard-Gatter");
          temp.push("circuit.append(cirq.H(" + j + "))");
          break;

        case "X":
          temp.push("# Pauli-X-Gatter");
          temp.push("circuit.append(cirq.X(" + j + "))");
          break;

        case "CX":
          for (let k = 0; k < quantenbits.length; k++) {
            if (quantenbits[k].widgets[i] === "C-CX") {
              temp.push("# Controlled-NOT-Gatter");
              temp.push("circuit.append(cirq.CNOT(" + k + ", " + j + "))");
            }
          }
          break;

        case "CCX":
          let positionCCX = 0;
          let counterCCX = 0;
          for (let k = 0; k < quantenbits.length; k++) {
            if (quantenbits[k].widgets[i] === "C-CCX" && counterCCX === 0) {
              positionCCX = k;
            }
            if (quantenbits[k].widgets[i] === "C-CCX") {
              counterCCX++;
            }
            if (quantenbits[k].widgets[i] === "C-CCX" && counterCCX == 2) {
              temp.push("# Controlled-Controlled-NOT-Gatter");
              temp.push(
                "circuit.append(cirq.CCNOT(" +
                  positionCCX +
                  ", " +
                  k +
                  ", " +
                  j +
                  "))"
              );
            }
          }
          break;

        case "Z":
          temp.push("# Pauli-Z-Gatter");
          temp.push("circuit.append(cirq.Z(" + j + "))");
          break;

        case "CZ":
          for (let k = 0; k < quantenbits.length; k++) {
            if (quantenbits[k].widgets[i] === "C-CZ") {
              temp.push("# Controlled-Z-Gatter");
              temp.push("circuit.append(cirq.CZ(" + k + ", " + j + "))");
            }
          }
          break;

        case "CCZ":
          let positionCCZ = 0;
          let counterCCZ = 0;
          for (let k = 0; k < quantenbits.length; k++) {
            if (quantenbits[k].widgets[i] === "C-CCZ" && counterCCZ === 0) {
              positionCCZ = k;
            }
            if (quantenbits[k].widgets[i] === "C-CCZ") {
              counterCCZ++;
            }
            if (quantenbits[k].widgets[i] === "C-CCZ" && counterCCZ == 2) {
              temp.push("# Controlled-Controlled-Z-Gatter");
              temp.push(
                "circuit.append(cirq.CCZ(" +
                  positionCCZ +
                  ", " +
                  k +
                  ", " +
                  j +
                  "))"
              );
            }
          }
          break;
      }
    }
  }

  return (
    <div>
      So sieht der Programmcode für das erzeugte Schaltbild aus:
      <br></br>
      <hr></hr>
      <br></br>
      <p>
        import cirq
        <br />
        <br />
        # Informationen über erzeugte Quantenbits seitens des Frontends
        <br />
        quantenbits = request.data
        <br />
        <br />
        # Create a new circuit
        <br />
        circuit = cirq.Circuit()
        <br />
        <br />
        # Dynamische Erzeugung von Quantenbits
        <br />
        qubits = []
        <br />
        for quantenbit in range(len(quantenbits)):
        <br />
        qubits.append(cirq.LineQubit(quantenbit))
        <br />
        <br />
        # Einsetzen der Gatter in Schaltkreis
        <br />
        {temp.map((element) => (
          <div>{element}</div>
        ))}
        <br />
        <br />
        # Initialisierung des lokalen Simulators
        <br />
        s = cirq.Simulator()
        <br />
        <br />
        # Einfügen der Messungen aller Quantenbits, werden durch einen key
        markiert
        <br />
        circuit.append(cirq.measure(qubits, key='result'))
        <br />
        <br />
        # Schaltbild 1000 mal durchlaufen lassen
        <br />
        result = s.run(circuit, repetitions=1000)
        <br />
        <br />
        # Ergebnisse, welcher Zustand erreicht wurde, herausfiltern
        <br />
        counts = result.histogram(key='result')
      </p>
    </div>
  );
};

export default CodeListe;
