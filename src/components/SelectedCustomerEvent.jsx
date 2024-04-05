import { dateFormatter } from "../utils/dateFunctions";

export default function SelectedCustomerEvents({ event }) {
  return (
    <div className="customer-event-card">
      <h4>{event.treatmentName}</h4>
      <p>
        {dateFormatter(event.start, "hour")} -{" "}
        {dateFormatter(event.end, "hour")}
      </p>
    </div>
  );
}
