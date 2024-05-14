import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';

function App() {
  return (
  <Router>
    <Navbar />
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
