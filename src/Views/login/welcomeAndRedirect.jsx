import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { InfoUserURL } from "../../api/apiurl";
import { ListItems2 } from "../../hooks/crudhooks";
import { LogoutToken } from "../../hooks/logoutToken";

export function WelcomeAndRedirect() {
  const navigate = useNavigate();
  const username = localStorage.getItem("Username");

  const [info, setInfo] = useState(null);

  useEffect(() => {
    ListItems2(`${InfoUserURL}${username}`, setInfo);
  }, [username]);

  LogoutToken();

  useEffect(() => {
    if (info) {
      localStorage.setItem("rol", info.role.id);
      localStorage.setItem("empresa", info.company.id);
      localStorage.setItem("usuario", info.id);

      let path;
      switch (info.role.id) {
        case "1":
          path = "/driver";
          break;
        case "2":
        case "3":
          path = "/menu";
          break;
        case "4":
          path = "/sa";
          break;
        default:
          path = "/";
          break;
      }
      navigate(path);
    }
  }, [info, navigate]);

  return null;
}
