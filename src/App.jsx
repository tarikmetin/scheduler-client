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
          element={user ? <CustomerBase /> : <Navigate to="/" />}
        />
        <Route
          path="/calendar"
          element={user ? <SchedulePage /> : <Navigate to="/" />}
        />
        <Route
          path="/servicelist"
          element={user ? <ServicesPage /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;
