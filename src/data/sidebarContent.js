import calendarIcon from "../ui/icons/ScheduleIcon";
import peopleIcon from "../ui/icons/PeopleIcon";
import serviceListIcon from "../ui/icons/ServiceListIcon";

const sidebarContent = [
  {
    text: "Customers",
    icon: peopleIcon(),
    url: "customerbase",
  },
  {
    text: "Schedule",
    icon: calendarIcon(),
    url: "calendar",
  },
  {
    text: "Service List",
    icon: serviceListIcon(),
    url: "servicelist",
  },
];

export default sidebarContent;
