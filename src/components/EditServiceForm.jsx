import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

export default function EditServiceForm({
  setEditModalForm,
  serviceToEdit,
  services,
  setServices,
}) {
  const form = useForm();
  const { register, control, handleSubmit, formState } = form;

  const onSubmit = (data) => {
    const { treatmentName, price, duration } = data;

    const index = services.findIndex(
      (item) => item.treatmentName === serviceToEdit.treatmentName
    );

    const updatedServices = [...services];
    updatedServices[index] = { treatmentName, price, duration };

    setServices(updatedServices);
    localStorage.setItem("services", JSON.stringify(updatedServices));
    setEditModalForm(false);
  };

  const handleDeleteService = (serviceName) => {
    const updatedServices = services.filter(
      (service) => service.treatmentName !== serviceName.treatmentName
    );

    setServices(updatedServices);
    localStorage.setItem("services", JSON.stringify(updatedServices));
    setEditModalForm(false);
  };

  return (
    <div className="edit-service">
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            className="custom-input"
            type="text"
            id="treatment-name"
            defaultValue={serviceToEdit.treatmentName}
            placeholder={
              formState.errors.treatmentName
                ? formState.errors.treatmentName.message
                : "Treatment Name"
            }
            style={{ "::placeholder": { color: "crimson" } }}
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
                        color: ${
                          formState.errors.treatmentName ? "crimson" : "#505673"
                        }; 
                    }`}
          </style>
        </div>

        <div>
          {" "}
          <input
            className="custom-input"
            type="number"
            id="price"
            defaultValue={serviceToEdit.price}
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
                        color: ${
                          formState.errors.price ? "crimson" : "#505673"
                        }; 
                    }`}
          </style>
        </div>

        <div>
          <select
            className="custom-input"
            id="duration"
            defaultValue={serviceToEdit.duration}
            {...register("duration", {
              required: { value: true, message: "Duration is required" },
            })}
            style={{
              color: `${formState.errors.duration ? "crimson" : ""}`,
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
          <div className="button-holder">
            <button onClick={() => setEditModalForm(false)}>Cancel</button>
            <button
              type="button"
              id="delete"
              onClick={() => handleDeleteService(serviceToEdit)}
            >
              Delete
            </button>
            <button type="submit">Change</button>
          </div>

          {/* {formState.errors.duration && (
            <p className="error">{formState.errors.duration.message}</p>
          )} */}
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
}
