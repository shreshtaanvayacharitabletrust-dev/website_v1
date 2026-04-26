import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function StaticRedirectHandler() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedPath = sessionStorage.getItem("spa-redirect-path");

    if (!storedPath || storedPath === location.pathname) {
      return;
    }

    sessionStorage.removeItem("spa-redirect-path");
    navigate(storedPath, { replace: true });
  }, [location.pathname, navigate]);

  return null;
}

