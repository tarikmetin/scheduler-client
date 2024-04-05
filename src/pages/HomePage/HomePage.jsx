import LoginUser from "../../components/LoginUser";
import Sidebar from "../../components/Sidebar";
import { useAuthContext } from "../../hooks/useAuthContext";

import "./HomePage.css";

export default function HomePage() {
  const { user } = useAuthContext();

  return (
    <>
      <LoginUser />
      <div>
        <span>{user?.email}</span>
      </div>
    </>
  );
}
