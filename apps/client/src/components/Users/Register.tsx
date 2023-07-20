import React, { useEffect, useState } from "react";
import { emptyFormData, FormData } from "./interface_empty/register.interface";
import { setError } from "../../store/gsms/errorSlice";
import { useDispatch } from "react-redux";
import { AxiosAPI } from "../../utils/AxiosApi";

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<FormData>(emptyFormData)
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorStatus, setErrorStatus] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage("");
      setErrorStatus(false);
    }, 5000);
  }, [errorMessage, errorStatus]);

  //Handle submit with axios:

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, surname, email, password, confirmedPassword } = formData;
    if (name === "") {
      dispatch(setError({
        message:"Name is required",
        rawData:"Name can not be empty! Please enter a name!",
      }))
      return;
    }

    if (surname === "") {
    dispatch(setError({
        message:"Surname is required",
        rawData:"Surname can not be empty! Please enter a surname!",
      }))
      return;
    }

    if (email === "") {
      dispatch(setError({
        message:"Email is required",
        rawData:"Email can not be empty! Please enter a email!",
      }))
      return;
    }

    const emailRegex = new RegExp(
      // eslint-disable-next-line no-useless-escape
      "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
    );
    if (!emailRegex.test(email)) {
      dispatch(setError({
        message:"Email is not valid",
        rawData:"Email is not valid! Please enter a valid email!",
      }))
      return;
    }

    if (password === "") {
     dispatch(setError({
        message:"Password is required",
        rawData:"Password can not be empty! Please enter a password!",
      }))

      return;
    }

    if (confirmedPassword === "") {
      dispatch(setError({
        message:"Confirmed password is required",
        rawData:"Confirmed password can not be empty! Please enter a confirmed password!",
      }))
      return;
    }

    if (password !== confirmedPassword) {
      dispatch(setError({
        message:"Password and confirmed password are not the same",
        rawData:"Password and confirmed password are not the same! Please enter a same password!",
      }))
      return;
    }

    try {
    const results = await AxiosAPI("/auth/register", "POST", formData)
    console.log(results)
    } catch (error:any) {
      dispatch(setError({
        message:error.message,
        rawData:JSON.stringify(error),
      }))
      
    }
  };



  return (
    <form className="max-w-2xl text-center mx-auto  m-2 rounded-md shadow-xl pt-2 pb-4 px-2" onSubmit={handleSubmit}>
      <h2 className="text-center text-2xl text-slate-900 font-bold border-b-2 my-2">
        Registration 


      </h2>

      <div className="grid grid-cols-2 gap-4 my-2" >
        <div className="col-span-1">
          <label className="label">
            <span className="label-text font-bold">Name</span>
          </label>
          <input
            type="text"
            placeholder="Your name"
            className="input input-bordered input-info w-full max-w-2xl hover:scale-[1.8px] transition-all duration-500 ease-in-out"
            value={formData?.name}
           onChange={(e) => setFormData({...formData, name:e.target.value})}
          />
        </div>
        <div className="col-span-1">
          <label className="label">
            <span className="label-text font-bold">Surname</span>
          </label>
          <input
            type="text"
            placeholder="Your Surname"
            className="input input-bordered input-info w-full max-w-2xl hover:scale-[1.8px] transition-all duration-500 ease-in-out"
            value={formData?.surname}
            onChange={(e) => setFormData({...formData, surname:e.target.value})}

          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 my-2">
        <div className="col-span-1">
          <label className="label">
            <span className="label-text font-bold">Email</span>
          </label>
          <input
            type="text"
            placeholder="Your email"
            className="input input-bordered input-info w-full max-w-2xl hover:scale-[1.8px] transition-all duration-500 ease-in-out"
            value={formData?.email}
            onChange={(e) => setFormData({...formData, email:e.target.value})}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 my-2">
        <div className="col-span-1">
          <label className="label">
            <span className="label-text font-bold">Password</span>
          </label>
          <input
            type="password"
            placeholder="Your password"
            className="input input-bordered input-info w-full max-w-2xl hover:scale-[1.8px] transition-all duration-500 ease-in-out"
            value={formData?.password}
            onChange={(e) => setFormData({...formData, password:e.target.value})}
          />
        </div>
        <div className="col-span-1">
          <label className="label">
            <span className="label-text font-bold">Confirm Password</span>
          </label>
          <input
            type="password"
            placeholder="Confirm password"
            className="input input-bordered input-info w-full max-w-2xl hover:scale-[1.8px] transition-all duration-500 ease-in-out"
            value={formData?.confirmedPassword}
            onChange={(e) => setFormData({...formData, confirmedPassword:e.target.value})}
          />
        </div>

        <div className="col-span-2">
         <input type="submit" value="Register"  className="btn btn-primary w-full max-w-2xl hover:scale-[1.8px] transition-all duration-500 ease-in-out"/>
        </div>
      </div>
      {
        errorMessage && (
          <div className="alert alert-error">
            <div className="flex-1">
         
              <p>{errorMessage}</p>
            </div>
          </div>
        ) 
      }
    </form>
  );
};

export default Register;
