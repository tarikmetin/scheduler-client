import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import AppointmentForm from "./AppointmentForm";
import EditCalendarEvent from "./EditCalendarEvent";

import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useQuery } from "@tanstack/react-query";
import { fetchEventList } from "../utils/fetchFunctions";

export default function CalendarModule({ availableServices }) {
  //State of the form modal display
  const [showModalForm, setShowModalForm] = useState(false);
  //State of the edit modal display
  const [showModalEdit, setShowModalEdit] = useState(false);

  //State that is passed to both AppointmentForm and EditCalendarEvent
  const [selectInfoTemp, setSelectInfoTemp] = useState({});

  //EventListJson fetched from the database
  const [eventListJson, setEventListJson] = useState([]);

  const { user } = useAuthContext();

  //I am calling the modal display to be open and passing the info to the appointmentform. Info contains the start time of selected cell. Rest happens in the modal, so go check AppointmentForm
  function handleDateSelect(selectInfo) {
    setShowModalForm(true);
    setSelectInfoTemp(selectInfo);
    selectInfo.view.calendar.unselect();
  }

  //When there is a resize or position change below function is fired
  async function handleChange(change) {
    //graps the id from the change and stores in the variable
    const id = change.event._def.extendedProps._id;

    //time changes are stored in the variable
    const eventTimeChange = {
      start: change.event.startStr,
      end: change.event.endStr,
    };

    //variable is sent to the database through api
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/events/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(eventTimeChange),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();
    if (!response.ok) {
      console.log(json.error);
    }
  }

  //This calls another modal for editing or removing the event. Rest happens in the modal, so go check EditCalendarEvent
  function handleEventClick(clickInfo) {
    setSelectInfoTemp(clickInfo);
    setShowModalEdit(true);
  }

  //When the app first mounted, the data will be fetch from the api and be put in the eventListJson
  // useEffect(() => {
  //   const fetchCustomerList = async () => {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_URL}/api/events`,
  //       {
  //         headers: { Authorization: `Bearer ${user.token}` },
  //       }
  //     );
  //     const eventListJson = await response.json();
  //     if (response.ok) {
  //       setEventListJson(eventListJson);
  //     }
  //   };
  //   fetchCustomerList();
  // }, [showModalForm]);

  const { data, isLoading, isSuccess, error } = useQuery({
    queryKey: ["events"],
    queryFn: () => fetchEventList(user, setEventListJson),
    staleTime: 200,
  });

  useEffect(() => {
    setEventListJson(data);
  }, []);

  return (
    <div className="calendar-container">
      {isLoading && <h2>Events are loading</h2>}
      {error && <h2>Events could not be fetched</h2>}
      {isSuccess && (
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          locale="es" // Makes time DD/MM/YY
          dayHeaderFormat={{
            weekday: "long",
            day: "numeric",
          }}
          slotMinTime="08:00:00" // Set the minimum visible time to 8:00 AM
          slotMaxTime="20:00:00" // Set the maximum visible time to 8:00 PM
          slotDuration="00:15:00" // Makes cells appear every 15 mins
          slotLabelInterval="00:15:00" // Makes cell labels appear every 15 mins
          slotLabelFormat={{
            hour: "2-digit",
            minute: "2-digit",
            omitZeroMinute: false,
          }} //This makes hours from 8 => 08:00
          allDaySlot={false} //Removes the all day slot
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "timeGridWeek,timeGridDay",
          }}
          height={window.innerHeight - 100} //To set height
          initialView="timeGridWeek" //Initial screen when you open the app
          eventBackgroundColor="#F5F6FA"
          eventTextColor="#141a33"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          select={handleDateSelect} //This fires handleDateSelect function while passing info on where I clicked on the calendar // This function called when empty tile is clicked
          // eventsSet={() => {
          // }} //This function is called whenever an event registered/changed/deleted // It adds the all events to both react storage state and local storage

          eventResize={(change) => handleChange(change)}
          eventDrop={(change) => handleChange(change)}
          eventContent={renderEventContent} // Fires the function that renders the cards on the calendar // Similar to eventsSet it is called whenever there is a register/change/delete but only pass the event that is modified
          eventClick={handleEventClick} // This function is called whenever event cards are clicked
          events={eventListJson} // initial list
        />
      )}

      {showModalForm && (
        <AppointmentForm
          setShowModal={setShowModalForm}
          selectInfoTemp={selectInfoTemp}
          availableServices={availableServices}
        />
      )}
      {showModalEdit && (
        <EditCalendarEvent
          setShowModal={setShowModalEdit}
          selectInfoTemp={selectInfoTemp}
          availableServices={availableServices}
        />
      )}
    </div>
  );
}

function renderEventContent(eventInfo) {
  //when there is a change this function passes a new eventInfo about the modified event which is to be used for creating cards
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.extendedProps.patientName}</i>
      <i>{eventInfo.event.extendedProps.treatmentName}</i>
    </>
  );
}
