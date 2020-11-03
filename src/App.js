import logo from "./logo.svg";
import TopBar from "./TopBar";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sorting from "./Sorting/Sorting";
import Pathfinder from "./Pathfinding/Pathfinding";
import Sudoku from "./Sudoku/Sudoku";

var mode = "Sort";

function App() {
  return (
    <Router>
      <div id="myApp">
        <TopBar/>
        <Switch>
          <Route exact path="/" component={Sorting} />
          <Route path="/pathfinder" component={Pathfinder} />
          <Route path="/sudoku" component={Sudoku} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
