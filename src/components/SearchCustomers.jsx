import { fetchCustomerList } from "../utils/fetchFunctions";
import { useAuthContext } from "../hooks/useAuthContext";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function SearchCustomers({
  customerTotalList,
  setCustomerTotalList,
  setShowSearchIcon,
}) {
  const { user } = useAuthContext();

  const { isLoading, error, data, isSuccess } = useQuery({
    queryKey: ["customerList"],
    queryFn: () => fetchCustomerList(user),
    staleTime: 5000,
  });

  async function handleSearchSubmit(e) {
    const inputValue = e.target.value.trim().toUpperCase();
    if (!isNaN(inputValue)) {
      //If person uses numbers it searches based on the dni
      setCustomerTotalList(
        customerTotalList.filter((person) => {
          return person.dni.toString().includes(inputValue);
        })
      );
    } else {
      //If person uses string search them based on the name
      setCustomerTotalList(
        customerTotalList.filter((person) =>
          person.patientName.includes(inputValue)
        )
      );
    }
  }

  useEffect(() => {
    setCustomerTotalList(data);
  }, []);

  async function handleCancel(e) {
    setShowSearchIcon(true);
  }

  return (
    <>
      <input
        type="text"
        placeholder="Search a customer"
        onChange={handleSearchSubmit}
        onBlur={(e) => handleCancel(e)}
        autoFocus
      />
    </>
  );
}
