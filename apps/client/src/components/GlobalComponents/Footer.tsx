import React, { useEffect, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import { getTokensExpiration } from "../../APIs/Users";
import { useJwt } from "react-jwt";

interface Props {
  timer: (time: number) => void;
}

const Footer: React.FC<Props> = ({ timer }) => {
  const header = useAuthHeader();
  const token = header();
  const [expirace, setExpirace] = useState<string>("");
  const { decodedToken } = useJwt(token);
  let timerId: NodeJS.Timeout;

  useEffect(() => {
    const checkTokenExpiration = async () => {
      clearTimeout(timerId);
      if (token) {
        const data = await getTokensExpiration(`/auth/expiration/`, token);

        setExpirace(data);
        timer(data);
        // Schedule the next check after a fixed interval (e.g., 10 minutes)
        timerId = setTimeout(checkTokenExpiration, 10000);
      }
    };

    checkTokenExpiration();

    return () => {
      // Clear the timeout when the component unmounts
      clearTimeout(timerId);
    };
  }, [token]);

  useEffect(() => {
    // Remove previous interval and token when a new token is generated
    clearTimeout(timerId);
    setExpirace("");
    timer(0);
  }, [decodedToken]);

  return (
    <footer className="w-full text-white bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 sticky bottom-0">
      <div className="flex flex-col items-center px-4 py-6 mx-auto lg:items-stretch lg:justify-between lg:flex-row max-w-7xl">
        <div className="grid grid-cols-2 text-center">
          <div className="col-span-1">
            {" "}
            {new Date().getFullYear()} © HealthTracker
          </div>
          {expirace && (
            <div className="col-span-1">
              {" "}
              Přihlášení vyprší za:{" "}
              <span className="text-blue-300 font-bold underline">
                {expirace} (minuty)
              </span>
              {" | "}
              <span
                onClick={() => {
                  const status = window.confirm(
                    "Opravdu chcete obnovit přihlášení?"
                  );
                  if (status) {
                    timer(0);
                  }
                }}
                className="text-green-300 font-bold underline"
              >
                Obnovit přihlášení
              </span>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
