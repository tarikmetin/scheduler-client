import phoneIcon from "../ui/icons/Cellphone";
import dniIcon from "../ui/icons/Dni";
import emailIcon from "../ui/icons/EmailIcon";
import settingsIcon from "../ui/icons/CustomerSettingsIcon";
import SelectedCustomerEvent from "./SelectedCustomerEvent";

import EditCustomerForm from "./EditCustomerForm";

import { fetchCustomerEvents } from "../utils/fetchFunctions";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../hooks/useAuthContext";

export default function SelectedCustomer({
  selectedCustomer,
  setSelectedCustomer,
  customerTotalList,
  setCustomerTotalList,
}) {
  const [showModalEdit, setShowModalEdit] = useState(false);

  const { user } = useAuthContext();

  const { data, isLoading, error } = useQuery({
    queryKey: ["events", { selectedCustomer }],
    queryFn: () => fetchCustomerEvents(selectedCustomer.treatmentHistory, user),
  });

  const handleClick = () => {
    setShowModalEdit(true);
  };

  return (
    <>
      {!showModalEdit ? (
        <div className="selected-customer-info">
          <div className="name-settings">
            <h1>{selectedCustomer.patientName}</h1>
            <div onClick={(e) => handleClick(e)}>{settingsIcon()}</div>
          </div>

          <div className="customer-info-area">
            <div className="info-boxes">
              {phoneIcon()}
              <p>{selectedCustomer.cellphoneNumber}</p>
            </div>
            <div className="info-boxes">
              {dniIcon()}
              <p>{selectedCustomer.dni}</p>
            </div>
            <div className="info-boxes">
              {selectedCustomer.email && emailIcon()}
              <p>{selectedCustomer.email}</p>
            </div>
          </div>
          <div className="customer-events-container">
            {isLoading && <h3>Events are loading</h3>}
            {error && <h3>Events could not be fetched</h3>}
            {data?.map((event) => {
              return (
                <div key={event._id} className="customer-event-area">
                  <SelectedCustomerEvent event={event} />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <EditCustomerForm
          setShowModal={setShowModalEdit}
          setSelectedCustomer={setSelectedCustomer}
          selectedCustomer={selectedCustomer}
          customerTotalList={customerTotalList}
          setCustomerTotalList={setCustomerTotalList}
        />
      )}
    </>
  );
}
