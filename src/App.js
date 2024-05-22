import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { routes } from './routes';
import './styles/menus-items.css';

function App() {

  return (
    <div className="App" style={{ width:"100%", height:"100%", backgroundColor:"black"}}>
      <Router>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} exact path={route.path} element={route.component}
            />
          ))}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
