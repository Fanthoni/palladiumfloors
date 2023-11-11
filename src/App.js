import Home from "./pages/Home";
import Contact from "./pages/Contact";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App">
          <Routes>
            <Route exact path="/" Component={Home} />
            <Route exact path="/contact" Component={Contact} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;
