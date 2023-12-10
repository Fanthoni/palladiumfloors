import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Catalog from "./pages/Catalog";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/contact" Component={Contact} />
          <Route exact path="/catalog" Component={Catalog} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
