import phoneIcon from "../ui/icons/Cellphone";
import dni from "../ui/icons/Dni";

export default function CustomerCard({ customer, setSelectedCustomer }) {
  function handleSelectCustomer() {
    setSelectedCustomer(customer);
  }

  return (
    <div>
      <div className="customer-card-area">
        <div className="customer-card" onClick={handleSelectCustomer}>
          <h3>{customer.patientName}</h3>
          <div>
            {phoneIcon()}
            <p>{customer.cellphoneNumber}</p>
          </div>
          <div>
            {dni()}
            <p>{customer.dni}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
