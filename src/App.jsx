import {
  Link,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Favorites from "./components/Favorites";
import Pokemon from "./components/Pokemon";

import { SpeedInsights } from "@vercel/speed-insights/next";

function App() {
  return (
    <Router>
      <SpeedInsights />
      <div>
        <h1 className="text-3xl font-bold text-center mt-5 mb-5">Pika Pika</h1>
        <Navigation />
        <Routes>
          <Route path="/" element={<Pokemon />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}

const Navigation = () => {
  const location = useLocation();
  return (
    <div className="flex justify-center mb-4">
      {location.pathname === "/favorites" ? (
        <Link
          to="/"
          className="text-lg font-bold text-blue-500 hover:text-blue-700 transition-colors"
        >
          Go to Home
        </Link>
      ) : (
        <Link
          to="/favorites"
          className="text-lg font-bold text-blue-500 hover:text-blue-700 transition-colors"
        >
          Go to Favorites
        </Link>
      )}
    </div>
  );
};

export default App;
