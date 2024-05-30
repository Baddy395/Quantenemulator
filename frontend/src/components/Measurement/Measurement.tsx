import { useEffect, useState } from "react";
import "./Measurement.css";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";

interface Quantenbit {
  id: number;
  widgets: string[];
}

interface MeasurementProp {
  elemente: Quantenbit[];
  radius: number;
  wiederholungen: string;
}

const Measurement = ({ elemente, radius, wiederholungen }: MeasurementProp) => {
  const [data, setData] = useState<any>(null);

  const test = [elemente, wiederholungen];

  //HTTP POST Request, um Daten an das Backend zu übermitteln und dadurch Messergebnisse zu erhalten
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: Response = await fetch("http://127.0.0.1:8000/api/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(test),
        });

        if (!response.ok) {
          throw new Error("Fehler beim POST Request");
        }

        const resultData = await response.json();
        setData(resultData);
      } catch (error) {
        console.error("Fehler beim Fetchen der Daten:", error);
      }
    };

    fetchData();
  }, []);

  //automatisierte Definition der Zustände
  function zustandDefinieren(length: number) {
    let temp = [];
    let zustaende = "";
    let elemente = [];
    for (let j = 0; j < length; j++) {
      zustaende += "0";
    }
    let position = zustaende.length - 1;
    for (let i = 0; i < Math.pow(2, length); i++) {
      elemente.push(zustaende);
      if (zustaende.charAt(position) === "0") {
        temp = zustaende.split("");
        temp.splice(position, 1, "1");
        zustaende = temp.join("");
      } else {
        let count = 0;
        while (zustaende.charAt(position) === "1") {
          count++;
          position--;
        }

        temp = zustaende.split("");
        for (let k = 0; k <= count; k++) {
          if (temp[position] == "0") {
            temp.splice(position, 1, "1");
          } else {
            temp.splice(position, 1, "0");
          }
          position++;
        }
        position--;
        zustaende = temp.join("");
      }
    }
    return elemente;
  }

  let dataCollenction = [];
  let percentages: any[] = [];
  let countTemp = 0;
  let tempValues = [];

  if (data !== null) {
    for (
      let index = 0;
      index < Object.keys(data.probabilities).length;
      index++
    ) {
      if (data.probabilities[index] !== 0) {
        tempValues.push((data.probabilities[index] * 100).toFixed(2));
      }
    }
  }

  for (let index = 0; index < Math.pow(2, elemente.length); index++) {
    dataCollenction[index] =
      data !== null
        ? data.result[index] !== null && data.result[index] !== undefined
          ? data.result[index]
          : 0
        : 0;
  }

  for (let index = 0; index < Math.pow(2, elemente.length); index++) {
    percentages[index] =
      dataCollenction[index] === 0 ? 0 : tempValues[countTemp];
    if (dataCollenction[index] !== 0) {
      countTemp += 1;
    }
  }
  percentages =
    tempValues.length === Math.pow(2, elemente.length)
      ? tempValues
      : percentages;
  let dataXAxis: string[] = zustandDefinieren(elemente.length);
  const diameter = radius * 2;
  const circumference = Math.PI * diameter;

  return (
    <div className="messungContainer">
      <div className="wahrscheinlichkeiten">
        <p>
          Diese Kreise repräsentieren, wie wahrscheinlich es ist, den
          entsprechenden Zustand bei einer Messung der Quantenbits zu erhalten.
        </p>

        <br></br>
        {dataXAxis.map((element, index) => (
          <svg
            width={diameter}
            height={diameter}
            key={index}
            className="circle"
          >
            <circle
              cx={radius}
              cy={radius}
              r={radius - 5}
              fill="transparent"
              stroke="black"
              strokeWidth={10}
            />
            <circle
              cx={radius}
              cy={radius}
              r={radius - 5}
              fill="transparent"
              stroke="#113946"
              strokeWidth={10}
              strokeDasharray={circumference}
              strokeDashoffset={
                circumference - circumference * (percentages[index] / 100)
              }
              strokeLinecap="round"
            />

            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fontSize="15"
              fill="white"
            >
              {element}: {`${percentages[index]}%`}
            </text>
          </svg>
        ))}
      </div>
      <br></br>
      <hr></hr>
      <br></br>
      <div className="messung">
        <p>
          Eine Messung der Quantenbits des oben erzeugten Quantenschaltkreises erfolgt
          duch einen Quantencomputer, der auf einer von-Neumann-Architektur simuliert wird.
          <br></br>
          Wenn man mit der Maus über die Balken fährt, erhält man Informationen
          darüber, wie oft der Zustand bei der Messung eingetroffen wurde.
        </p>

        <BarChart
          sx={(theme) => ({
            [`.${axisClasses.root}`]: {
              [`.${axisClasses.tick}, .${axisClasses.line}`]: {
                stroke: "#FEFBF6",
                strokeWidth: 3,
              },
              [`.${axisClasses.tickLabel}`]: {
                fill: "#FEFBF6",
              },
            },

            border: `1px solid rgba(${
              theme.palette.mode === "dark" ? "255,255,255" : "0, 0, 0"
            }, 0.1)`,
            backgroundImage: `linear-gradient(rgba(${
              theme.palette.mode === "dark" ? "255,255,255" : "0, 0, 0"
            }, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(${
              theme.palette.mode === "dark" ? "255,255,255" : "0, 0, 0"
            }, 0.1) 1px, transparent 1px)`,
            backgroundSize: "35px 35px",
            backgroundPosition: "20px 20px, 20px 20px",
          })}
          xAxis={[
            {
              id: "barCategories",
              data: dataXAxis,
              scaleType: "band",
            },
          ]}
          series={[
            {
              data: dataCollenction,
              color: "#135D66",
            },
          ]}
          width={1300}
          height={300}
        />
      </div>
    </div>
  );
};

export default Measurement;
