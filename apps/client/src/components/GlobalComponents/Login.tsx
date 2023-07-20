import React, { useState } from "react";
import { BsAt, BsKey } from "react-icons/bs";
import { Link } from "react-router-dom";
import { setSuccess } from "../../store/gsms/successSlice";
import { useDispatch } from "react-redux";
import { emptyLoginFormData } from "../../Entities/defaults/login.empty";
import { loginUser } from "../../APIs/Users";
import { isEmailValid, isInputEmpty, isPasswordValid } from "../../utils/InputValidations";
import { setError } from "../../store/gsms/errorSlice";

interface Props {}

const Login: React.FC<Props> = () => {
  const dispatch:Function = useDispatch();
  const [formData, setformData] = useState(emptyLoginFormData)
  const forgottenPassword:Function = ():void =>{
    dispatch(setSuccess({
      message:"Pokud jste zapomněli heslo, je potřeba kvůli zabezpečení kontaktovat správce aplikace - huss@richtergedeon.cz",
      rawData:"Bohužel si kvůli zabezpečení heslo změnit nelze...",
    }))
  }

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const passValid:boolean = isPasswordValid(formData.password);
    if(!passValid){
      dispatch(setError({
        message:"Heslo musí obsahovat alespoň 8 znaků, písmeno a číslo!",
        rawData:"Dobrým příkladem může být heslo 'ed992ske'"
      }))
      return;
    }

    const emailValid:boolean = isEmailValid(formData.email);

    if(!emailValid){
      dispatch(setError({
        message:"Email není validní",
        rawData:"email nesmí obsahovat diakritiku a musí být ve formátu například:huss@richtergedeon.cz"
      }))
      return;
    }

    const response = await loginUser(formData);
    console.log(response)
  }
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="flex flex-col w-full max-w-sm px-4 py-8  rounded-lg shadow-lg sm:px-6 md:px-8 lg:px-10 bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800">
        <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
          Přihlášení do svého účtu
        </div>
        <div className="mt-8">
          <form action="#" autoComplete="off" className="relative" onSubmit={handleLoginSubmit}>
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
                  value={formData?.email}
                  onChange={(e) => {
                    setformData({
                      ...formData,
                      email: e.target.value,
                    });
                  }
                  }
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
                  value={formData?.password}
                  onChange={(e) => {
                    setformData({
                      ...formData,
                      password: e.target.value,
                    });
                  }
                  }
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

/**
 * 
 login prompt

Now the hardest part... So registration and login works the way, that my react app communicates without any problem with my Nestjs app. When I hit "register" button and send email and password to nestjs, the BE returns this object: ```{
    "user": {
        "_id": "64b9389a8baf1cd394e61251",
        "email": "huss@richtergedeon.cz",
        "password": null,
        "name": "Bc. Jaroslav Huss, MBA",
        "country": "others",
        "authLevel": "medical-representative",
        "isUserApproved": false,
        "lastLoggedIn": "2023-07-20T13:48:56.737Z",
        "createdAt": "2023-07-20T13:15:41.319Z",
        "updatedAt": "2023-07-20T13:15:41.319Z",
        "startDateOfEmployment": "2023-07-20T13:15:41.319Z",
        "currentPositionHeldSince": "2023-07-20T13:15:41.319Z",
        "gdprConsent": false,
        "gdprConsentDate": "2023-07-20T13:15:41.319Z",
        "__v": 0,
        "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NGI5Mzg5YThiYWYxY2QzOTRlNjEyNTEiLCJlbWFpbCI6Imh1c3NAcmljaHRlcmdlZGVvbi5jeiIsImF1dGhMZXZlbCI6Im1lZGljYWwtcmVwcmVzZW50YXRpdmUiLCJpYXQiOjE2ODk4NjA5MzYsImV4cCI6MTY5MDQ2NTczNn0.X-fxwKxx8jnXfpy0NLVIgjtxrgrHcGBadXfTP3mszIs"
    },
    "tokens": {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NGI5Mzg5YThiYWYxY2QzOTRlNjEyNTEiLCJlbWFpbCI6Imh1c3NAcmljaHRlcmdlZGVvbi5jeiIsImF1dGhMZXZlbCI6Im1lZGljYWwtcmVwcmVzZW50YXRpdmUiLCJpYXQiOjE2ODk4NjEwODEsImV4cCI6MTY4OTg2ODI4MX0.6BrRA5dKi7mgMypDtEXW0nEWoZxWuGKq-thPLtB5Iq8",
        "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NGI5Mzg5YThiYWYxY2QzOTRlNjEyNTEiLCJlbWFpbCI6Imh1c3NAcmljaHRlcmdlZGVvbi5jeiIsImF1dGhMZXZlbCI6Im1lZGljYWwtcmVwcmVzZW50YXRpdmUiLCJpYXQiOjE2ODk4NjEwODEsImV4cCI6MTY5MDQ2NTg4MX0.pv46FXaoOKux0t0GEbECj9LS_5bCUkaA4SEc92OBlgo"
    }
}``` Now - are you able to help me securing the frontend using JWT? What I want is quite tricky - if user is not logged in, he will be always redirected to "/" base route where login component is. If user is successfuly logged in, he will be redirected to /dashboard route where a user can find his private data and other possibilities. I heard the JWT should be stored as a secure cookie. All I want is really good mechanism that will not allow unauthorized user accessing private routes and if user is logged in, he will not be able to access login and register (/login, /register) routes. As I already said, I am using react toolkit which could be helpful. So, are you able to help me?

 */