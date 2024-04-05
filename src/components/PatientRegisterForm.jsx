import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

import ProgressBarForCustomers from "./ProgressBarForCustomers";

export default function PatientRegisterForm({
  setShowModal,
  customerTotalList,
}) {
  const { user } = useAuthContext();
  const [clickCount, setClickCount] = useState(1);
  const form = useForm();
  const { register, control, handleSubmit, formState, trigger, getValues } =
    form;

  const onSubmit = async (data) => {
    const customer = {
      patientName: data.patientName.toUpperCase(),
      cellphoneNumber: data.cellNumber,
      dni: data.dni,
    };

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/customers`,
      {
        method: "POST",
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
    }

    setShowModal(false);
  };

  const theIdList = customerTotalList.map((customer) => customer.dni);

  return (
    <div>
      <form className="modal-content" onSubmit={handleSubmit(onSubmit)}>
        <div className={clickCount >= 1 ? "active" : ""}>
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
        </div>
        <div className={clickCount >= 2 ? "active" : ""}>
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
        </div>
        <div className={clickCount >= 3 ? "active" : ""}>
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
        </div>

        <ProgressBarForCustomers
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
