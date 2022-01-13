import './App.css';
import { Welcome } from './Components/Welcome'
import { Signup } from './Components/Signup'
import { Signin } from './Components/Signin'
import { Blog } from './Components/Blog/Blog'
import { Dashboard } from './Components/Dashboard/Dashboard'
import Post  from './Components/Blog/Post'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Welcome} />
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <Route path="/blog/:userid" component={Blog} />
          <Route path="/post/:user/to/:postid" component={Post} />
          <Route path="/dashboard/:id" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
