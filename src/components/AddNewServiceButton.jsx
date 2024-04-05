import addServiceIcon from "../ui/icons/AddServiceIcon";

export default function AddNewServiceButton({ setShowModalForm }) {
  return (
    <>
      <button
        className="add-new-service-button"
        onClick={() => setShowModalForm(true)}
      >
        {addServiceIcon()}
      </button>
    </>
  );
}
