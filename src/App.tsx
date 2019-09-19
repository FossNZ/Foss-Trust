import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import './style/App.css';
import GrantorHomePage from './pages/grantorHome';
import store from './redux/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Route exact path="/" component={GrantorHomePage} />
          <Route exact path="/grantorhome" component={GrantorHomePage} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
