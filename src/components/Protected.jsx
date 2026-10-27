import { useAuth } from "../stores/authStore";
import { Navigate } from "react-router";

export const NeedLogin = ({ children }) => {
  const { user } = useAuth((state) => state);

  if (user) return <Navigate to="/" replace />;

  return children;
};

export const HaveToLogin = ({ children }) => {
  const { user } = useAuth((state) => state);

  if (!user) return <Navigate to="/login" replace />;

  return children;
};
