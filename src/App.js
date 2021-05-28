import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import CurrenciesRates from './components/CurrenciesRates';
import Sidebar from './components/Sidebar';



function App() {
  return (
    <>
      <Router>

        <div style={{display: "flex"}}>
        <Sidebar />

        {/* EL SWITCH RECIBE LA URL Y SUS PARÁMETROS. Y ES UNA FUNCIÓN QUE SE ENCARGA DE EVALUAR CASES (ROUTES) */}
        <Switch> 
          <Route  
            path="/:currency"
            component={CurrenciesRates}
            exact
          />
        </Switch>
        </div>
      </Router>     
    </>
  );
}

export default App;
