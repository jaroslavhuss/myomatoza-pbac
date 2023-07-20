import React, { useState } from "react";
import { BsAt, BsKey, BsPerson } from "react-icons/bs";
import { Link } from "react-router-dom";
import {  IFormData, emptyFormData} from "./interface_empty/register.interface";
import {validatePasswords, isPasswordValid} from "../../utils/InputValidations"
import { useDispatch } from "react-redux";
import { setError } from "../../store/gsms/errorSlice";
interface Props {}
const Register: React.FC<Props> = ({}) => {
  const dispatch = useDispatch()
  const [allowEmail, setAllowEmail] = useState<boolean>(true);
  const [formData, setFormData] = useState<IFormData>(emptyFormData);

  const handleRegistrationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /**
     * Password validation
     */
    const passValid:boolean = isPasswordValid(formData.password);
    if(!passValid){
      dispatch(setError({
        message:"Heslo musí obsahovat alespoň 8 znaků, písmeno a číslo!",
        rawData:""
      }))
      return;
    }
    const passMatch:boolean = validatePasswords(formData.password, formData.confirmedPassword);
    if(!passMatch){
      dispatch(setError({
        message:"Hesla se neshodují",
        rawData:""
      }))
      return;
    }
  };
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="flex flex-col w-full max-w-sm px-4 py-8  rounded-lg shadow-lg sm:px-6 md:px-8 lg:px-10 bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800">
        <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
          Registrace
        </div>
        <div className="mt-8">
          <form action="#" autoComplete="off" className="relative" onSubmit={handleRegistrationSubmit}>
            <div className="flex flex-col mb-2">
              <div className="flex relative ">
                <span className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                  <BsAt />
                </span>
                <input
                  name="hcp-email"
                  type="text"
                  className="rounded-r-md flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400
                shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Váš email"
                  autoComplete="off"
                  disabled={allowEmail}
                  onMouseOver={() => {
                    setAllowEmail(false);
                  }}
                  onFocus={() => {
                    setAllowEmail(false);
                  }}
                  onMouseLeave={() => {
                    setAllowEmail(true);
                  }}
                  value={formData?.email}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    });
                  }
                  }
                />
              </div>
            </div>

            <div className="flex flex-col mb-2">
              <div className="flex relative ">
                <span className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                  <BsKey />
                </span>
                <input
                  autoComplete="off"
                  type="password"
                  className="rounded-r-md flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400
                shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Heslo"
                />
              </div>
            </div>
            <div className="flex flex-col mb-2">
              <div className="flex relative ">
                <span className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                  <BsKey />
                </span>
                <input
                  autoComplete="off"
                  type="password"
                  className="rounded-r-md flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400
                shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Zopakujte své heslo znovu"
                />
              </div>
            </div>
            <div className="flex flex-col mb-2">
              <div className="flex relative ">
                <span className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                  <BsPerson />
                </span>
                <input
                  autoComplete="off"
                  type="text"
                  className="rounded-r-md flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400
                shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Vaše celé jméno včetně titulů"
                />
              </div>
            </div>
            <div className="flex w-full mt-8">
              <button
                type="submit"
                className="py-2 px-4 focus:ring-offset-purple-200
              text-white transition ease-in duration-200 text-center text-base font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg bg-slate-800 shadow-lg hover:bg-slate-400"
              >
                Zaregistrovat se
              </button>
            </div>
            <div className="flex items-center mt-4">
              <div className="flex mr-auto">
                <Link
                  to="/"
                  className="inline-flex text-xs font-thin text-gray-500 sm:text-sm dark:text-gray-100 hover:text-gray-700 dark:hover:text-white"
                >
                  Už máte účet? Přihlaste se!
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
