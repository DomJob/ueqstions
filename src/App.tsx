import React from "react";
import MainPage from "./components/MainPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SingleQuestionPage from "./components/SingleQuestionPage";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <MainPage />} />
        <Route path="/question/:date" component={SingleQuestionPage} />
      </Switch>
    </Router>
  );
}
