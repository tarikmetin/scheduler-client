import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { useAuthContext } from "../hooks/useAuthContext";
import { deleteCustomer } from "../utils/fetchFunctions";

export default function EditCustomerForm({
  setShowModal,
  selectedCustomer,
  setSelectedCustomer,
  customerTotalList,
  setCustomerTotalList,
}) {
  const form = useForm();
  const { register, handleSubmit, formState, setValue, watch } = form;
  const changedPatientName = watch("patientName");
  const changedCellNumber = watch("cellNumber");
  const { user } = useAuthContext();

  const onSubmit = async (data) => {
    const id = selectedCustomer?._id;

    const customer = {
      patientName: data.patientName.toUpperCase(),
      cellphoneNumber: data.cellNumber,
      dni: data.dni,
    };

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/customers/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(customer),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer: ${user.token}`,
        },
      }
    );
    const json = await response.json();
    if (!response.ok) {
      console.log(json.error);
      return;
    }

    setSelectedCustomer({ ...selectedCustomer, ...customer });

    const updatedCustomerList = customerTotalList.map((cust) =>
      cust._id === id ? { ...cust, ...customer } : cust
    );
    setCustomerTotalList(updatedCustomerList);

    setShowModal(false);
  };

  const handleRemove = async () => {
    const id = selectedCustomer._id;
    const json = await deleteCustomer(id, user);
    if (json) {
      setSelectedCustomer(null);
      setCustomerTotalList(
        customerTotalList.filter((customer) => customer._id !== id)
      );
    }
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  useEffect(() => {
    setValue("patientName", `${selectedCustomer.patientName}`);
    setValue("dni", `${selectedCustomer.dni}`);
    setValue("cellNumber", `${selectedCustomer.cellphoneNumber}`);
  }, []);

  const theIdList = customerTotalList
    .filter((cust) => cust._id !== selectedCustomer._id)
    .map((cust) => cust.dni);

  return (
    <div className="modal">
      <div className="overlay" onClick={() => setShowModal(false)}></div>
      <form className="modal-content" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="custom-input"
          type="text"
          id="patient-name"
          placeholder={
            formState.errors.patientName
              ? formState.errors.patientName.message
              : "Patient name"
          }
          {...register("patientName", {
            required: {
              value: true,
              message: "Patient name is required",
            },
          })}
        />
        <input
          className="custom-input"
          type="number"
          id="dni"
          placeholder={"DNI"}
          {...register("dni", {
            required: { value: true, message: "dni is required" },
            validate: {
              isExist: (fieldValue) => {
                if (theIdList.includes(+fieldValue)) {
                  // if (
                  //   changedPatientName !== selectedCustomer.patientName ||
                  //   changedCellNumber !== selectedCustomer.cellNumber
                  // ) {
                  //   return true;
                  // }
                  return "DNI is already taken check the customer list";
                }
                return true;
              },
              isValid: (fieldValue) => {
                if (fieldValue.length < 8) {
                  return "DNI number should at least be 8 digits";
                }
                return true;
              },
            },
          })}
        />
        {formState.errors.dni && (
          <p className="error">{formState.errors.dni.message}</p>
        )}
        <input
          className="custom-input"
          type="number"
          id="cell-number"
          placeholder={
            formState.errors.cellNumber
              ? formState.errors.cellNumber.message
              : "Phone number"
          }
          {...register("cellNumber", {
            required: { value: true, message: "Phone number is required" },
          })}
        />

        <div className="button-holder active">
          <button onClick={handleCancel}>Cancel</button>
          <button className="red-button" onClick={handleRemove}>
            Remove
          </button>
          <button type="submit">Change</button>
        </div>
      </form>
    </div>
  );
}
