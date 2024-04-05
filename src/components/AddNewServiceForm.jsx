import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useState } from "react";

import ProgressBar from "./ProgressBar";

export default function AddNewServiceForm({
  setShowModalForm,
  services,
  setServices,
}) {
  const [clickCount, setClickCount] = useState(1);

  const form = useForm();
  const { register, control, handleSubmit, formState, trigger } = form;

  const onSubmit = (data) => {
    const { treatmentName, price, duration } = data;

    const newService = {
      treatmentName: treatmentName.toUpperCase(),
      price,
      duration,
    };

    const updatedServices = [...services, newService];
    setServices(updatedServices);
    localStorage.setItem("services", JSON.stringify(updatedServices));
    setShowModalForm(false);
  };

  return (
    <div className="add-new-service">
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className={clickCount >= 1 ? "active" : ""}>
          <input
            className="custom-input"
            type="text"
            id="treatment-name"
            placeholder={
              formState.errors.treatmentName
                ? formState.errors.treatmentName.message
                : "Treatment Name"
            }
            {...register("treatmentName", {
              required: {
                value: true,
                message: "Treatment name is required",
              },
            })}
          />
          <style>
            {` 
                    ::placeholder { 
                        color: ${"#505673"}; 
                    }`}
          </style>
        </div>

        <div className={clickCount >= 2 ? "active" : ""}>
          <input
            className="custom-input"
            type="number"
            id="price"
            placeholder={
              formState.errors.price ? formState.errors.price.message : "Price"
            }
            {...register("price", {
              required: { value: true, message: "Price is required" },
            })}
          />
          <style>
            {` 
                    ::placeholder { 
                        color: ${"#505673"}; 
                    }`}
          </style>
        </div>

        <div className={clickCount === 3 ? "active" : ""}>
          <select
            className="custom-input"
            id="duration"
            {...register("duration", {
              required: { value: true, message: "Duration is required" },
            })}
            style={{
              color: "#505673",
            }}
          >
            <option value="">
              {formState.errors.duration
                ? formState.errors.duration.message
                : "Select an option"}
            </option>
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="45">45 minutes</option>
            <option value="60">60 minutes</option>
            <option value="75">75 minutes</option>
            <option value="90">90 minutes</option>
            <option value="105">105 minutes</option>
            <option value="120">120 minutes</option>
          </select>

          {/* {formState.errors.duration && (
            <p className="error">{formState.errors.duration.message}</p>
          )} */}
        </div>
        <ProgressBar
          circleCount={3}
          clickCount={clickCount}
          setClickCount={setClickCount}
          setShowModalForm={setShowModalForm}
          trigger={trigger}
        />
      </form>
      <DevTool control={control} />
    </div>
  );
}
