import CalendarModule from "../../components/CalendarModule";
import Sidebar from "../../components/Sidebar";
import { useState, useEffect } from "react";
import "./SchedulePage.css";

export default function SchedulePage() {
  const [availableServices, setAvailableServices] = useState([]);

  useEffect(() => {
    const storedServices = localStorage.getItem("services");

    if (storedServices) {
      const servicesArray = JSON.parse(storedServices);
      setAvailableServices(servicesArray);
    } else {
      console.log("No services data found in localStorage");
    }
  }, []);

  return (
    <div className="main-container">
      <Sidebar />
      <CalendarModule availableServices={availableServices} />
    </div>
  );
}
