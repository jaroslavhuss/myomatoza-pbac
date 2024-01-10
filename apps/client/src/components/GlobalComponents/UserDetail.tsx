import React, { useState } from "react";
import { BsPersonFillCheck, BsThreeDotsVertical, BsTrash2Fill } from "react-icons/bs";

interface Props {
  user: {
    _id: string;
    pacientName: string;
    pacientSSN: number;
    supervisorDoctor: string;
    questionnaireDate: string;
    __01Question: number;
    __02Question: 5;
    __03Question: number;
    __04Question: number;
    __05Question: number;
    __06Question: number;
    __07Question: number;
    __08Question: number;
    __09Question: number;
    __10Question: number;
    sumValue: number;
  };
  tabIndex: number;
  deleteUser: (id:string)=>void;
}

const UserDeatil: React.FC<Props> = ({ user, tabIndex, deleteUser }) => {
  const [doYouWantToDelete, setDoYouWantToDelete] = useState<boolean>(false)
  return (
    <div className="col-span-1 m-1">
      {
        doYouWantToDelete && (
          <div className="card w-96 bg-base-100 shadow-xl relative h-[200px] grid grid-cols-2 gap-3 items-center p-2">
        <div className="btn col-span-1"
        onClick={()=>{
          deleteUser(user._id)
          setDoYouWantToDelete(false);
        }}
        >Ano - chci nenávratně smazat dotazník</div>
        <div className="btn col-span-1" onClick={()=>{
          setDoYouWantToDelete(false)
        }}>Ne!</div>
      </div>
        )
      }
      
      {
        !doYouWantToDelete && (<div className="card w-96 bg-base-100 shadow-xl relative">
        <div className="dropdown absolute top-0 right-0">
    <label tabIndex={0} className="m-1"><BsThreeDotsVertical style={{
                fontSize: "1.5rem",
    }} /></label>
    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
      <li><span onClick={()=>{setDoYouWantToDelete(true)}}><BsTrash2Fill />Smazat dotazník</span></li>
    </ul>
  </div>
          <figure className="px-10 pt-10">
            <BsPersonFillCheck
              style={{
                fontSize: "3rem",
                color: "grey",
              }}
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{user.pacientName}</h2>
            <div
              tabIndex={tabIndex}
              className="collapse collapse-arrow border border-base-300 bg-base-200"
            >
              <div className="collapse-title text-xl font-medium">
                Data z dotazníku
              </div>
           
              <div className="collapse-content">
              <div className="small text-sx text-center">{user.pacientSSN}</div>
                <div className="overflow-x-auto">
                  <div className="grid grid-cols-12 gap-3 p-1 border-b-2">
                      <div className="col-span-6 text-center shadow-xl px-2 py-5 rounded-xl font-bold text-xl">
                          {user.questionnaireDate}
                      </div>
                      <div className="col-span-6 text-center shadow-xl px-2 py-5 rounded-xl font-bold text-xl">
                          {user.sumValue}
                          </div>
                  </div>
                  <div className=" w-full text-xs">
                      <div className="grid grid-cols-12 gap-3 p-1 border-b-2 hover:scale-105 easy-in transition-all duration-700">
                          <div className="col-span-10 text-left">1. Silné menstruační krvácení:</div>
                          <div className="col-span-2 text-center">{user.__01Question}</div>
                      </div>
                      <div className="grid grid-cols-12 gap-3 p-1 border-b-2 hover:scale-105 easy-in transition-all duration-700">
                          <div className="col-span-10 text-left">2. Nepravidelná menstruace:</div>
                          <div className="col-span-2 text-center">{user.__02Question}</div>
                      </div>
                      <div className="grid grid-cols-12 gap-3 p-1 border-b-2 hover:scale-105 easy-in transition-all duration-700">
                          <div className="col-span-10 text-left">3. Bolestivá menstruace:</div>
                          <div className="col-span-2 text-center">{user.__03Question}</div>
                      </div>
                      <div className="grid grid-cols-12 gap-3 p-1 border-b-2 hover:scale-105 easy-in transition-all duration-700">
                          <div className="col-span-10 text-left">4. Bolestivý pohlavní styk:</div>
                          <div className="col-span-2 text-center">{user.__04Question}</div>
                      </div>
                      <div className="grid grid-cols-12 gap-3 p-1 border-b-2 hover:scale-105 easy-in transition-all duration-700">
                          <div className="col-span-10 text-left">5. Bolest v břiše / v pánvi:</div>
                          <div className="col-span-2 text-center">{user.__05Question}</div>
                      </div>
                      <div className="grid grid-cols-12 gap-3 p-1 border-b-2 hover:scale-105 easy-in transition-all duration-700">
                          <div className="col-span-10 text-left">6. Celková únava:</div>
                          <div className="col-span-2 text-center">{user.__06Question}</div>
                      </div>
                      <div className="grid grid-cols-12 gap-3 p-1 border-b-2 hover:scale-105 easy-in transition-all duration-700">
                          <div className="col-span-10 text-left">7. Nucení na močení:</div>
                          <div className="col-span-2 text-center">{user.__07Question}</div>
                      </div>
                      <div className="grid grid-cols-12 gap-3 p-1 border-b-2 hover:scale-105 easy-in transition-all duration-700">
                          <div className="col-span-10 text-left">8. Únik moči spontánní:</div>
                          <div className="col-span-2 text-center">{user.__08Question}</div>
                      </div>
                      <div className="grid grid-cols-12 gap-3 p-1 border-b-2 hover:scale-105 easy-in transition-all duration-700">
                          <div className="col-span-10 text-left">9. Únik moči při zátěži:</div>
                          <div className="col-span-2 text-center">{user.__09Question}</div>
                      </div>
                      <div className="grid grid-cols-12 gap-3 p-1 border-b-2 hover:scale-105 easy-in transition-all duration-700">
                          <div className="col-span-10 text-left">10. Zácpa:</div>
                          <div className="col-span-2 text-center">{user.__10Question}</div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>)
      }
      
    </div>
  );
};

export default UserDeatil;
