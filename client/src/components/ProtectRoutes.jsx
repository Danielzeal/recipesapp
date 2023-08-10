import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoutes = () => {
  const userDetail = useSelector((state) => state.auth.userDetail);
  return userDetail ? <Outlet /> : <Navigate to={"/"} />;
};

export default ProtectRoutes;
