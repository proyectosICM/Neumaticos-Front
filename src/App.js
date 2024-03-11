import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { routes } from './routes';
import './GeneralStyles/menus-items.css';
import { LogoutToken } from './hooks/logoutToken';
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
