import React, { useEffect, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import { getTokensExpiration } from "../../APIs/Users";
import { useJwt } from "react-jwt";
import { useSignOut } from "react-auth-kit";
interface Props {}

const Footer: React.FC<Props> = () => {
  const signOut = useSignOut();
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

        // Schedule the next check after a fixed interval (e.g., 10 minutes)
        timerId = setTimeout(checkTokenExpiration, 10000);
      } else {
        signOut();
        clearTimeout(timerId);
        return;
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
  }, [decodedToken]);

  return (
    <footer className="w-full text-white bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 sticky bottom-0">
      <div className="flex flex-col items-center px-4 py-6 mx-auto lg:items-stretch lg:justify-between lg:flex-row max-w-7xl">
        <div className="grid grid-cols-2 text-center">
          <div className="col-span-1">
            {" "}
            {new Date().getFullYear()} © HealthTracker
          </div>
          {expirace && parseInt(expirace) > 0 && (
            <div className="col-span-1">
              {" "}
              Přihlášení vyprší za:{" "}
              <span className="text-blue-300 font-bold underline">
                {expirace} (minuty)
              </span>
            </div>
          )}

          {!expirace && (
            <div className="col-span-1">
              {" "}
              Přihlášení vypršelo -{" "}
              <span
                onClick={() => {
                  signOut();
                }}
                className="text-blue-300 font-bold underline cursor-pointer"
              >
                přihlašte se prosím
              </span>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
