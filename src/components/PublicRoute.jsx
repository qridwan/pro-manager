import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PublicRoute({ children }) {
  const isLoggedIn = useAuth();
  // const isLoggedIn = false;
  return !isLoggedIn ? <>{children}</> : <Navigate to="/home/teams" />;
}
