const fetchCustomerList = async (user) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/customers`,
    {
      headers: { Authorization: `Bearer ${user.token}` },
    }
  );
  return await response.json();
};

const fetchCustomerEvents = async (id, user) => {
  if (id?.length > 0) {
    const idString = id.join(",");
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/events/filtered/${idString}`,
      { headers: { Authorization: `Bearer ${user.token}` } }
    );
    if (response.ok) {
      return await response.json();
    }
  }
};

const fetchEventList = async (user) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events`, {
    headers: { Authorization: `Bearer ${user.token}` },
  });
  const eventListJson = await response.json();
  if (response.ok) {
    return eventListJson;
  }
};

const fetchCustomer = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/customers/${id}`
  );
  const customerJson = await response.json();
  if (response.ok) {
    return customerJson;
  }
};

const deleteCustomer = async (id, user) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/customers/${id}`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.token}` },
    }
  );
  const json = await response.json();
  if (!response.ok) {
    console.log(json.error);
    return null;
  }
  return json;
};

export {
  fetchCustomerList,
  fetchCustomerEvents,
  fetchCustomer,
  deleteCustomer,
  fetchEventList,
};
