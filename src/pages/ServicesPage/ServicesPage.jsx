import SideBar from "../../components/Sidebar";
import AddNewServiceButton from "../../components/AddNewServiceButton";

import "./ServicesPage.css";

import { useState, useEffect } from "react";
import AddNewServiceForm from "../../components/AddNewServiceForm";

import ServiceCard from "../../components/ServiceCardList.jsx";

export default function ServicesPage() {
  const [showModalForm, setShowModalForm] = useState(false);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const storedServices = localStorage.getItem("services");
    if (storedServices) {
      setServices(JSON.parse(storedServices));
    }
  }, []);

  return (
    <div id="service-page">
      <SideBar />
      {!showModalForm && (
        <ServiceCard services={services} setServices={setServices} />
      )}
      {!showModalForm && (
        <AddNewServiceButton setShowModalForm={setShowModalForm} />
      )}
      {showModalForm && (
        <AddNewServiceForm
          setShowModalForm={setShowModalForm}
          services={services}
          setServices={setServices}
        />
      )}
    </div>
  );
}
