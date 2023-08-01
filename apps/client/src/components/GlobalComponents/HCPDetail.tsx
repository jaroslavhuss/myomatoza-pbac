import React, { useState, useEffect } from "react";
import { useAuthUser } from "react-auth-kit";
import MainLayout from "../Layouts/MainLayout";
import { IUser } from "../../Entities/interfaces/user.interface";
import { emptyUser } from "../../Entities/defaults/user.empty";
import ProfilePicture from "../../assets/rg-doc-profile.png"
import { Link } from "react-router-dom";
const HCPDetail: React.FC = () => {
  const [user, setUser] = useState<IUser>(emptyUser);
  const auth = useAuthUser();
  const authState = auth();
  useEffect(() => {
    if (authState) {
      setUser(authState.user);
    }
  }, [authState]);
  return (
    <MainLayout>
      <div className="card w-96 bg-base-100 shadow-xl relative">
      <div className="card-body items-center text-center">
            <p>Zdravíme Vás,</p>
            <h2 className="card-title">{user.name}</h2>
        </div>
        <figure className="px-10">
          <img
            src={ProfilePicture}
            alt="Shoes"
            className="rounded-full"
          />
        </figure>
      <Link to="/questionnaire-myoms" className="absolute bottom-0 px-2 py-2 mx-auto bg-gradient-to-br from-blue-600 to-blue-900 text-white font-bold rounded-md shadow-lg w-full  text-center -mb-4 -mr-4 floating cursor-pointer">Dotazník Myomatóza</Link>
      </div>
    </MainLayout>
  );
};

export default HCPDetail;
