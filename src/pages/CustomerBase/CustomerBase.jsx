import { useQuery } from "@tanstack/react-query";

import { useEffect, useState } from "react";
import {
  fetchCustomerList,
  fetchCustomerEvents,
} from "../../utils/fetchFunctions";
import { useAuthContext } from "../../hooks/useAuthContext";

import "./CustomerBase.css";

import PatientRegisterForm from "../../components/PatientRegisterForm";
import Sidebar from "../../components/Sidebar";
import CustomerCard from "../../components/CustomerCard";
import SelectedCustomer from "../../components/SelectedCustomer";
import SearchCustomers from "../../components/SearchCustomers";

import searchIcon from "../../ui/icons/SearcIcon";
import addNewCustomerIcon from "../../ui/icons/AddCustomerIcon";
import refreshCustomerList from "../../ui/icons/RefreshCustomerListIcon";

export default function CustomerBase() {
  //State of the form modal display
  const [showModalForm, setShowModalForm] = useState(false);
  //Customer list and history
  const [customerTotalList, setCustomerTotalList] = useState(null);
  //Selected customer
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  //Selected customer's fetched events
  const [selectedCustomerEvents, setSelectedCustomerEvents] = useState([]);

  //Search customer icon to input
  const [showSearchIcon, setShowSearchIcon] = useState(true);
  //Export the user from the context
  const { user } = useAuthContext();

  const { isLoading, error, data, isSuccess, isFetched } = useQuery({
    queryKey: ["customerList"],
    queryFn: () => fetchCustomerList(user),
    staleTime: 5000,
  });

  useEffect(() => {
    if (user) {
      setCustomerTotalList(data);
    }
    if (!user) {
      setCustomerTotalList(null);
    }
  }, [data]);

  // useEffect(() => {
  //   if (selectedCustomer) {
  //     fetchCustomerEvents(
  //       selectedCustomer.treatmentHistory,
  //       user
  //     );
  //   }
  //   return;
  // }, [selectedCustomer]);

  function handleSearchActivation() {
    setShowSearchIcon(false);
  }

  function handleRefresh() {
    if (user) {
      setCustomerTotalList(data);
    }

    if (!user) {
      setCustomerTotalList(null);
    }
  }

  return (
    <div id="customer-page">
      <Sidebar />
      <div className="customer-section-container">
        <ul className="customer-card-container">
          <button
            className={`${
              showSearchIcon ? "search-customer" : "search-customer active"
            }`}
            onClick={handleSearchActivation}
          >
            {showSearchIcon ? (
              searchIcon()
            ) : (
              <SearchCustomers
                customerTotalList={customerTotalList}
                setCustomerTotalList={setCustomerTotalList}
                setShowSearchIcon={setShowSearchIcon}
              />
            )}
          </button>
          <button className="refresh-customer-list" onClick={handleRefresh}>
            {refreshCustomerList()}
          </button>
          {error && <h2>Customer data could not be fetched</h2>}
          {isLoading && <h2>Loading the customer list</h2>}
          {user &&
            isSuccess &&
            customerTotalList?.map((customer) => {
              return (
                <CustomerCard
                  key={customer._id}
                  customer={customer}
                  setSelectedCustomer={setSelectedCustomer}
                />
              );
            })}
        </ul>
        {selectedCustomer && (
          <SelectedCustomer
            selectedCustomer={selectedCustomer}
            selectedCustomerEvents={selectedCustomerEvents}
            setSelectedCustomer={setSelectedCustomer}
            setCustomerTotalList={setCustomerTotalList}
            customerTotalList={customerTotalList}
          />
        )}

        <button
          className="register-customer"
          onClick={() => setShowModalForm(true)}
        >
          {addNewCustomerIcon()}
        </button>
      </div>

      {showModalForm ? (
        <div className="modal">
          <div
            className="overlay"
            onClick={() => setShowModalForm(false)}
          ></div>
          <PatientRegisterForm
            setShowModal={setShowModalForm}
            customerTotalList={customerTotalList}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
