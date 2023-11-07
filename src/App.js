import Home from "./pages/Home";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App">
          <Routes>
            <Route exact path="/" Component={Home} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;
