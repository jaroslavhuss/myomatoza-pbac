import { useState, useEffect } from "react";
import { IPatient } from "../Entities/interfaces/patient.interface";
import MainLayout from "../components/Layouts/MainLayout";
import { useAuthUser } from "react-auth-kit";
import { BsLockFill } from "react-icons/bs";
const Settings = () => {
  const user = useAuthUser();
  const hcp = user() as { user: IPatient };
  const [isFormUnlocked, setIsFormUnlocked] = useState(false);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    console.log(hcp.user._id);
  }, [hcp]);

  return (
    <MainLayout>
      <h1 className="text-center text-2xl mt-10">
        Nastavení pro {hcp.user.name} {hcp.user.surname}
      </h1>

      <form onSubmit={handleFormSubmit} className="relative">
        <BsLockFill
          className="absolute top-0 right-0 text-4xl cursor-pointer hover:text-red-500 border-2 rounded-full p-1"
          onClick={() => {
            setIsFormUnlocked(!isFormUnlocked);
          }}
        />
        <div className="flex flex-col items-center justify-center mt-10">
          <div className="w-full max-w-xs">
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  Jméno
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  disabled={!isFormUnlocked}
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
                  id="inline-full-name"
                  type="text"
                  value={hcp.user.name}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  Příjmení
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  disabled={!isFormUnlocked}
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
                  id="inline-full-name"
                  type="text"
                  value={hcp.user.surname}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  Email
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  disabled={!isFormUnlocked}
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray
                -700 leading-tight focus:outline-none focus:bg-white"
                  id="inline-full-name"
                  type="text"
                  value={hcp.user.email}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </MainLayout>
  );
};

export default Settings;
