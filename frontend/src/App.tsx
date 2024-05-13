import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./components/Home/Home";
import Emulator from "./components/Emulator/Emulator";
import Algorithmen from "./components/Algorithmen/Algorithmen";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home></Home>
        </Route>
        <Route path="/Emulator">
          <Emulator></Emulator>
        </Route>
        <Route path="/Algorithmen">
          <Algorithmen></Algorithmen>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
