import RenderAppBar from './components/AppBar';
import RenderData from './components/RenderData';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Edit from './components/Edit'

function App() {
  return (
    <Router>
      <Switch>
      <div className='box'>
        <RenderAppBar/>
        <Route exact path="/" component={RenderData} />
        <Route path="/edit" component={Edit} />
      </div>
      </Switch>
    </Router>
  );
}

export default App;
