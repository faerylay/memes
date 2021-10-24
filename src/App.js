import React from 'react';
import { MemeEditor } from './Page'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <MemeEditor />} />
        <Route render={() => <Redirect to={{ pathname: "/" }} />} />
      </Switch>
    </Router>
  );
}

export default App;
