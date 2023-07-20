import React from "react";
import { BsAt, BsKey } from "react-icons/bs";
import { Link } from "react-router-dom";
import { setSuccess } from "../../store/gsms/successSlice";
import { useDispatch } from "react-redux";

interface Props {}

const Login: React.FC<Props> = () => {
  const dispatch:Function = useDispatch();

  const forgottenPassword:Function = ():void =>{
    console.log("Clicked")
    dispatch(setSuccess({
      message:"Pokud jste zapomněli heslo, je potřeba kvůli zabezpečení kontaktovat správce aplikace - huss@richtergedeon.cz",
      rawData:"Bohužel si kvůli zabezpečení heslo změnit nelze...",
    }))
  }
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="flex flex-col w-full max-w-sm px-4 py-8  rounded-lg shadow-lg sm:px-6 md:px-8 lg:px-10 bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800">
        <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
          Přihlášení do svého účtu
        </div>
        <div className="mt-8">
          <form action="#" autoComplete="off" className="relative">
            <div className="flex flex-col mb-2">
              <div className="flex relative ">
                <span className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                  <BsAt />
                </span>
                <input
                  type="text"
                  
                  className="rounded-r-md flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400

                  shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Your email"
                />
              </div>
            </div>
            <div className="flex flex-col mb-6">
              <div className="flex relative ">
                <span className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                  <BsKey />
                </span>
                <input
                  type="password"
                  
                  className="rounded-r-md flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400

                  shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Your password"
                />
              </div>
            </div>
            <div className="flex items-center mb-6 -mt-4">
              <div className="flex ml-auto">
                <div 
                  onClick={()=>{
                    forgottenPassword()
                  }}
                  className="inline-flex text-xs font-thin text-gray-500 sm:text-sm dark:text-gray-100 hover:text-gray-700 dark:hover:text-white"
                >
                  Zapomněli jste heslo?
                </div>
              </div>
            </div>
            <div className="flex w-full mt-8">
            <button
              type="submit"
              className="py-2 px-4 focus:ring-offset-purple-200
              text-white transition ease-in duration-200 text-center text-base font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg bg-slate-800 shadow-lg hover:bg-slate-400"
            >
              Přihlásit se do aplikace
            </button>
          </div>
            <div className="flex items-center mt-4">
              <div className="flex mr-auto">
                <Link
                  to="/register"
                  className="inline-flex text-xs font-thin text-gray-500 sm:text-sm dark:text-gray-100 hover:text-gray-700 dark:hover:text-white"
                >
                  Nemáte účet? Zaregistrujte se
                </Link>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
