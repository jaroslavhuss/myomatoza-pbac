import React, { useEffect, useState } from "react";
import {useAuthHeader } from "react-auth-kit";
import { getTokensExpiration } from "../../APIs/Users";

interface Props {}

const Footer: React.FC<Props> = () => {
  const header = useAuthHeader();
  const token = header();
  const [expirace, setExpirace] = useState<string>("")
  useEffect(()=>{
    (async()=>{
      if(token){
          const data = await getTokensExpiration(`/auth/expiration/`, token);
       setExpirace(data)
      }
    })()

    return ()=>{
      
    }
  },[token])
  return (
    <footer className="w-full text-white bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 sticky bottom-0">
    <div className="flex flex-col items-center px-4 py-6 mx-auto lg:items-stretch lg:justify-between lg:flex-row max-w-7xl">
      <div className="grid grid-cols-2 text-center">
        <div className="col-span-1"> {new Date().getFullYear()} © Myomatóza & Endometrióza</div>
        {
          expirace &&  <div className="col-span-1"> Přihlášení vyprší v <span className="text-blue-300 font-bold underline">{expirace}</span></div>

        }
            </div>
    </div>
  </footer>
  );
};

export default Footer;
