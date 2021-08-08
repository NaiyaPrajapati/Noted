import "./App.css";
import Login from "./Component/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import add from "./Component/Add";
import Register from "./Component/Register";
import home from "./Component/Home";
import Edit from "./Component/Edit";
import Profile from "./Component/Profile";
import Table from "./Component/Table";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route exact path="/add" component={add}></Route>
        <Route exact path="/home" component={home}></Route>
        <Route exact path="/edit/:id" component={Edit}></Route>
        <Route exact path="/profile" component={Profile}></Route>
        <Route exact path="/tag-count" component={Table}></Route>
        <Route exact path="/register" component={Register}></Route>
      </Switch>
    </Router>
  );
}

export default App;
