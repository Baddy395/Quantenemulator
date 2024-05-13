const Grover2Qubits = (state: number) => {
  let temp = [];
  temp = [
    { id: 1, widgets: ["×", "×", "×", "×", "×", "×", "×"] },
    { id: 2, widgets: ["×", "×", "×", "×", "×", "×", "×"] },
  ];

  switch (state) {
    case 0:
      temp[0].widgets[0] = "H";
      temp[1].widgets[0] = "H";
      temp[0].widgets[1] = "X";
      temp[1].widgets[1] = "X";
      temp[0].widgets[2] = "C-CZ";
      temp[1].widgets[2] = "CZ";
      temp[0].widgets[3] = "X";
      temp[1].widgets[3] = "X";
      temp[0].widgets[4] = "H";
      temp[1].widgets[4] = "H";
      temp[0].widgets[5] = "X";
      temp[1].widgets[5] = "X";
      temp[0].widgets[6] = "C-CZ";
      temp[1].widgets[6] = "CZ";
      temp[0].widgets[7] = "X";
      temp[1].widgets[7] = "X";
      temp[0].widgets[8] = "H";
      temp[1].widgets[8] = "H";
      break;

    case 1:
      temp[0].widgets[0] = "H";
      temp[1].widgets[0] = "H";
      temp[0].widgets[1] = "X";
      temp[1].widgets[1] = "Ident";
      temp[0].widgets[2] = "C-CZ";
      temp[1].widgets[2] = "CZ";
      temp[0].widgets[3] = "X";
      temp[1].widgets[3] = "Ident";
      temp[0].widgets[4] = "H";
      temp[1].widgets[4] = "H";
      temp[0].widgets[5] = "X";
      temp[1].widgets[5] = "X";
      temp[0].widgets[6] = "C-CZ";
      temp[1].widgets[6] = "CZ";
      temp[0].widgets[7] = "X";
      temp[1].widgets[7] = "X";
      temp[0].widgets[8] = "H";
      temp[1].widgets[8] = "H";
      break;

    case 2:
      temp[0].widgets[0] = "H";
      temp[1].widgets[0] = "H";
      temp[0].widgets[1] = "Ident";
      temp[1].widgets[1] = "X";
      temp[0].widgets[2] = "C-CZ";
      temp[1].widgets[2] = "CZ";
      temp[0].widgets[3] = "Ident";
      temp[1].widgets[3] = "X";
      temp[0].widgets[4] = "H";
      temp[1].widgets[4] = "H";
      temp[0].widgets[5] = "X";
      temp[1].widgets[5] = "X";
      temp[0].widgets[6] = "C-CZ";
      temp[1].widgets[6] = "CZ";
      temp[0].widgets[7] = "X";
      temp[1].widgets[7] = "X";
      temp[0].widgets[8] = "H";
      temp[1].widgets[8] = "H";
      break;

    default:
      temp[0].widgets[0] = "H";
      temp[1].widgets[0] = "H";
      temp[0].widgets[1] = "C-CZ";
      temp[1].widgets[1] = "CZ";
      temp[0].widgets[2] = "H";
      temp[1].widgets[2] = "H";
      temp[0].widgets[3] = "X";
      temp[1].widgets[3] = "X";
      temp[0].widgets[4] = "C-CZ";
      temp[1].widgets[4] = "CZ";
      temp[0].widgets[5] = "X";
      temp[1].widgets[5] = "X";
      temp[0].widgets[6] = "H";
      temp[1].widgets[6] = "H";
      break;
  }

  return temp;
};

export default Grover2Qubits;
