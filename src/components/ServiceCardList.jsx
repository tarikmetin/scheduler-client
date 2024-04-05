import settingIcon from "../ui/icons/ServiceSettingsIcon.jsx";

import { useState } from "react";
import EditServiceForm from "./EditServiceForm.jsx";

export default function ServiceCardList({ services, setServices }) {
  const [editModalForm, setEditModalForm] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState(null);

  function handleClickSettings(service) {
    setServiceToEdit(service);
    setEditModalForm(true);
  }

  return (
    <>
      {!editModalForm && (
        <div className="service-list-container">
          {services?.map((service) => (
            <div
              className="service-card"
              key={`${service.treatmentName}${service.price}`}
            >
              <p>
                <strong>{service.treatmentName}</strong>
              </p>
              <p>Cost: ${service.price}</p>
              <p>Duration: {service.duration} mins</p>
              <span onClick={() => handleClickSettings(service)}>
                {settingIcon()}
              </span>
            </div>
          ))}
        </div>
      )}
      {editModalForm && (
        <EditServiceForm
          serviceToEdit={serviceToEdit}
          setEditModalForm={setEditModalForm}
          services={services}
          setServices={setServices}
        />
      )}
    </>
  );
}
