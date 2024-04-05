import { useForm } from "react-hook-form";
import { dateFormatter } from "../utils/dateFunctions";
import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

import cellphoneIcon from "../ui/icons/Cellphone";
import calendarIcon from "../ui/icons/ScheduleIcon";
import clockIcon from "../ui/icons/ClockIcon";

export default function EditCalendarEvent({
  selectInfoTemp,
  setShowModal,
  availableServices,
}) {
  const form = useForm();
  const { register, handleSubmit, formState, setValue } = form;
  const { user } = useAuthContext();

  //On submit we tap into calendar api and add the event and finally close the modal display
  const onSubmit = async (data) => {
    //Down below from here are to change the information in the backend
    const id = selectInfoTemp.event.extendedProps._id;
    const patientName = selectInfoTemp.event._def.extendedProps.patientName;
    const calendarApi = selectInfoTemp.view.calendar;

    const eventDataToUpdate = {
      title: `${patientName} - ${data.treatmentName.toUpperCase()}`,
      treatmentName: data.treatmentName.toUpperCase(),
    };

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/events/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(eventDataToUpdate),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();
    if (!response.ok) {
      console.log(json.error);
    } else {
      // Update the event object in frontend
      selectInfoTemp.event.setProp("title", eventDataToUpdate.title);
      selectInfoTemp.event.setExtendedProp(
        "treatmentName",
        eventDataToUpdate.treatmentName
      );

      // Rerender the event on the calendar
      calendarApi.refetchEvents();
    }

    //Closes the Modal
    setShowModal(false);
  };

  const handleRemove = async () => {
    const id = selectInfoTemp.event.extendedProps._id;

    //This removes the event from the FullCalendar - frontend
    selectInfoTemp.event.remove();

    //This removes the event from the backend
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/events/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    const json = await response.json();
    if (!response.ok) {
      console.log(json.error);
    }

    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const info = selectInfoTemp.event;
  const chosenTreatment = info.extendedProps.treatmentName;
  const cellphoneNumber = info.extendedProps.cellphoneNumber;

  const startTime = dateFormatter(selectInfoTemp.event.startStr, "hour");
  const endTime = dateFormatter(selectInfoTemp.event.endStr, "hour");
  const theDay = dateFormatter(selectInfoTemp.event.endStr, "dayText");

  useEffect(() => {
    setValue("treatmentName", `${chosenTreatment}`);
  }, []);

  return (
    <div className="modal">
      <div className="overlay" onClick={() => setShowModal(false)}></div>
      <form className="modal-content" onSubmit={handleSubmit(onSubmit)}>
        <div className="info-container active">
          <h2>{info.title}</h2>
          <div>
            {cellphoneIcon()}
            <h3>Cellphone: {cellphoneNumber}</h3>
          </div>

          <div>
            {calendarIcon()}
            <h3>Day: {theDay}</h3>
          </div>

          <div>
            {clockIcon()}
            <h3>
              Between: {startTime} - {endTime}
            </h3>
          </div>
        </div>
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

        <div className="button-holder active">
          <button onClick={handleCancel}>Cancel</button>
          <button className="red-button" onClick={handleRemove}>
            Remove
          </button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
