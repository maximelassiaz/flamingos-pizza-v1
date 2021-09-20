import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";

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
        <main className="main-content">
          <Switch>
              <Route exact path="/">
                <Home />
              </Route>
            
          </Switch>
        </main>
        <Footer /> 
      </Router>
    </>
  );
}

export default App;
