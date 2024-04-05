import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import ProgressBarForEventMaking from "./ProgressBarForEventMaking";
import { useState } from "react";

import { useAuthContext } from "../hooks/useAuthContext";

export default function AppointmentForm({
  setShowModal,
  selectInfoTemp,
  availableServices,
}) {
  const [clickCount, setClickCount] = useState(1);

  const { user } = useAuthContext();

  const form = useForm();
  const {
    register,
    control,
    handleSubmit,
    formState,
    setValue,
    trigger,
    getValues,
  } = form;

  //On submit we tap into calendar api and add the event and finally close the modal display
  const onSubmit = async (data) => {
    //Guard clause
    const patientCheck =
      (await getValues("patientName")) === "This person does not exist";
    if (patientCheck) {
      return;
    }

    //To calculate the end time
    const indexChosenTreatment = availableServices.findIndex(
      (item) => item.treatmentName === data.treatmentName
    );
    const addedTime = availableServices[indexChosenTreatment].duration;
    const datetimeString = selectInfoTemp.startStr;
    const datetime = new Date(datetimeString);
    datetime.setMinutes(datetime.getMinutes() + +addedTime);
    const updatedDatetimeString = datetime.toISOString();

    const event = {
      title: `${data.patientName.toUpperCase()} - ${data.treatmentName.toUpperCase()}`,
      start: selectInfoTemp.startStr,
      end: updatedDatetimeString,
      patientName: data.patientName.toUpperCase(),
      dni: data.dni,
      cellphoneNumber: data.cellPhone,
      treatmentName: data.treatmentName.toUpperCase(),
    };

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events`, {
      method: "POST",
      body: JSON.stringify(event),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (!response.ok) {
      console.log(json.error);
    }

    setShowModal(false);
  };

  async function fetchPerson(e) {
    const dni = e.target.value;

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/customers/dni/${dni}`,
      { headers: { Authorization: `Bearer ${user.token}` } }
    );
    const customer = await response.json();
    if (response.ok) {
      setValue("patientName", customer.patientName);
      setValue("cellPhone", customer.cellphoneNumber);
    }
    if (!response.ok) {
      setValue("patientName", "This person does not exist");
      setValue("cellPhone", "This person does not exist");
    }
  }

  return (
    <div className="modal">
      <div className="overlay" onClick={() => setShowModal(false)}></div>
      <form
        className="modal-content"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className={clickCount >= 1 ? "active" : ""}>
          <input
            className="custom-input"
            type="number"
            id="dni"
            placeholder={
              formState.errors.dni ? formState.errors.dni.message : "DNI"
            }
            {...register("dni", {
              required: {
                value: true,
                message: "DNI is required",
              },
            })}
            onBlur={(e) => fetchPerson(e)}
          />
          <style>
            {` 
                    ::placeholder { 
                        color: "#505673"; 
                    }`}
          </style>
        </div>

        <div className={clickCount >= 2 ? "active" : ""}>
          <input
            className="custom-input"
            disabled={true}
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
          <style>
            {` 
                    ::placeholder { 
                        color: 
                          "#505673"
                        ; 
                    }`}
          </style>
        </div>

        <div className="no-display">
          <input
            className="custom-input"
            type="number"
            id="cellPhone"
            disabled
            placeholder={
              formState.errors.cellPhone
                ? formState.errors.cellPhone.message
                : "Cellphone"
            }
            {...register("cellPhone", {
              required: {
                value: true,
                message: "This person does not exist",
              },
            })}
          />
          <style>
            {` 
                    ::placeholder { 
                        color: "#505673"; 
                    }`}
          </style>
        </div>

        <div className={clickCount >= 3 ? "active" : ""}>
          <select
            className="custom-input"
            type="text"
            id="treatment-name"
            {...register("treatmentName", {
              required: { value: true, message: "Please choose a service" },
            })}
            style={{
              color: "#505673",
            }}
          >
            <option value="">
              {formState.errors.treatmentName
                ? formState.errors.treatmentName.message
                : "Select a service"}
            </option>
            {availableServices?.map((service) => (
              <option
                value={service.treatmentName}
                key={`${service.treatmentName}${service.price}`}
              >
                {service.treatmentName}
              </option>
            ))}
          </select>
        </div>

        <ProgressBarForEventMaking
          circleCount={3}
          clickCount={clickCount}
          setClickCount={setClickCount}
          setShowModalForm={setShowModal}
          trigger={trigger}
          getValues={getValues}
        />
      </form>
      <DevTool control={control} />
    </div>
  );
}
