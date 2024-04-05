const dateFormatter = (input, option) => {
  const dateString = input;
  const dateObject = new Date(dateString);
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  if (option === "day") {
    const formattedDay = dateObject.toLocaleString("es", {
      timeZone, // Adjust this to your desired time zone
      day: "2-digit",
      month: "2-digit",
    });

    return formattedDay;
  }

  if (option === "dayText") {
    const formattedDay = dateObject.toLocaleString("en-US", {
      timeZone, // Adjust this to your desired time zone
      weekday: "long", // Display the full weekday name
      day: "2-digit",
      month: "long", // Display the full month name
    });

    return formattedDay;
  }

  if (option === "hour") {
    const formattedHour = dateObject.toLocaleString("es", {
      timeZone, // Adjust this to your desired time zone
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return formattedHour;
  }

  if (option === "year") {
    const formattedYear = dateObject.toLocaleString("es", {
      timeZone, // Adjust this to your desired time zone
      year: "numeric",
    });

    return formattedYear;
  }

  const formattedDateTime = dateObject.toLocaleString("es", {
    timeZone, // Adjust this to your desired time zone
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return formattedDateTime;
};

export { dateFormatter };
