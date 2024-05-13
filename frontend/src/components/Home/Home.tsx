import Lottie, { LottieRefCurrentProps } from "lottie-react";
import animationData1 from "../../assets/Animation.json";
import { useRef } from "react";
import { Link } from "react-router-dom";

import "./Home.css";

function Home() {
  const animation = useRef<LottieRefCurrentProps>(null);

  return (
    <div className="Container">
      <div className="textSide">
        <h1>Willkommen in der Quantenwelt!</h1>
        <p>
          Mit Hilfe dieser Applikation lässt sich ein Einblick in die
          Quantenwelt gewähren
        </p>

        <button>
          <Link to="/Emulator">Quantenemulator ausprobieren</Link>
        </button>
        <button>
          <Link to="/Algorithmen">Algorithmen anschauen</Link>
        </button>
      </div>
      <div className="animationSide">
        <div className="test">
          <Lottie lottieRef={animation} animationData={animationData1} />
        </div>
      </div>
    </div>
  );
}

export default Home;
