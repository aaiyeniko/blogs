import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import BlogDetails from './BlogDetails';
import AddBlog from './AddBlog';
// import EditBlog from './EditBlog';

function App() {
  return (
  <Router>
    <Navbar />
    <div className='bg-cyan-100'>
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/blog/add">
          <AddBlog />
        </Route>
        <Route path="/blog/:slug">
          <BlogDetails />
        </Route>
      </Switch>
    </div>
    </div>
  </Router>
  );
}

export default App;
