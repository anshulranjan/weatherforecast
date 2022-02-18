import './App.css';
import Weather from './pages/Weather';
import {Switch, Route} from "react-router-dom";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Weather}></Route>
    </Switch>
    </div>
  );
}

export default App;
