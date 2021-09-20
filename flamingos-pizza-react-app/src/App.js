import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  const [isMenuOpen, SetIsMenuOpen] = useState(false)

  const handleClickMenu = () => {
    SetIsMenuOpen(prev => !prev)
  }

  return (
    <>
      <Router>
        <Header 
          isMenuOpen={isMenuOpen}
          handleClickMenu={handleClickMenu}
        />
        <Switch>
          <Route exact path="/">

          </Route>
        </Switch>
        <Footer /> 
      </Router>
    </>
  );
}

export default App;
