import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import CustomerBase from "./pages/CustomerBase/CustomerBase";
import ServicesPage from "./pages/ServicesPage/ServicesPage";
import SchedulePage from "./pages/SchedulePage/SchedulePage";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/customerbase" /> : <HomePage />}
        />
        <Route
          path="/customerbase"
          element={!user ? <Navigate to="/" /> : <CustomerBase />}
        />
        <Route
          path="/calendar"
          element={!user ? <Navigate to="/" /> : <SchedulePage />}
        />
        <Route
          path="/servicelist"
          element={!user ? <Navigate to="/" /> : <ServicesPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
