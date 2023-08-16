import React, { useState } from "react";
import { BsPersonFillCheck, BsThreeDotsVertical, BsTrash2Fill } from "react-icons/bs";

interface IUser {
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
  __11Question: number;
  __12Question: number;
  __13Question: number;
  __14Question: number;
  __15Question: number;
  sumValue: number;
}

interface Props {
  user: IUser;
  tabIndex: number;
  deleteUser: (id:string)=>void;
}

const EndoUserDeatil: React.FC<Props> = ({ user, tabIndex, deleteUser }) => {
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
    <label tabIndex={tabIndex} className="m-1"><BsThreeDotsVertical style={{
                fontSize: "1.5rem",
    }} /></label>
    <ul tabIndex={tabIndex} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
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
                          <div className="col-span-10 text-left">1. Bolestivá menstruace:</div>
                          <div className="col-span-2 text-center">{user.__01Question}</div>
                      </div>
                      <div className="grid grid-cols-12 gap-3 p-1 border-b-2 hover:scale-105 easy-in transition-all duration-700">
                          <div className="col-span-10 text-left">2. Bolestivý pohlavní styk:</div>
                          <div className="col-span-2 text-center">{user.__02Question}</div>
                      </div>
                      <div className="grid grid-cols-12 gap-3 p-1 border-b-2 hover:scale-105 easy-in transition-all duration-700">
                          <div className="col-span-10 text-left">3. Cyklické bolesti s vazbou na menstruaci:</div>
                          <div className="col-span-2 text-center">{user.__03Question}</div>
                      </div>
                      <div className="grid grid-cols-12 gap-3 p-1 border-b-2 hover:scale-105 easy-in transition-all duration-700">
                          <div className="col-span-10 text-left">4. Průjmovitá stolice:</div>
                          <div className="col-span-2 text-center">{user.__04Question}</div>
                      </div>
                      <div className="grid grid-cols-12 gap-3 p-1 border-b-2 hover:scale-105 easy-in transition-all duration-700">
                          <div className="col-span-10 text-left">5. Zácpa:</div>
                          <div className="col-span-2 text-center">{user.__05Question}</div>
                      </div>
                      <div className="grid grid-cols-12 gap-3 p-1 border-b-2 hover:scale-105 easy-in transition-all duration-700">
                          <div className="col-span-10 text-left">6. Krvácení z konečníku:</div>
                          <div className="col-span-2 text-center">{user.__06Question}</div>
                      </div>
                      <div className="grid grid-cols-12 gap-3 p-1 border-b-2 hover:scale-105 easy-in transition-all duration-700">
                          <div className="col-span-10 text-left">7. Křeče v břiše:</div>
                          <div className="col-span-2 text-center">{user.__07Question}</div>
                      </div>
                      <div className="grid grid-cols-12 gap-3 p-1 border-b-2 hover:scale-105 easy-in transition-all duration-700">
                          <div className="col-span-10 text-left">8. Bolesti při stolici:</div>
                          <div className="col-span-2 text-center">{user.__08Question}</div>
                      </div>
                      <div className="grid grid-cols-12 gap-3 p-1 border-b-2 hover:scale-105 easy-in transition-all duration-700">
                          <div className="col-span-10 text-left">9. Pálení, řezání při močení:</div>
                          <div className="col-span-2 text-center">{user.__09Question}</div>
                      </div>
                      <div className="grid grid-cols-12 gap-3 p-1 border-b-2 hover:scale-105 easy-in transition-all duration-700">
                          <div className="col-span-10 text-left">10. Nucení na močení:</div>
                          <div className="col-span-2 text-center">{user.__10Question}</div>
                      </div>
                      <div className="grid grid-cols-12 gap-3 p-1 border-b-2 hover:scale-105 easy-in transition-all duration-700">
                          <div className="col-span-10 text-left">11. Únik moči spontánní:</div>
                          <div className="col-span-2 text-center">{user.__11Question}</div>
                      </div>
                      <div className="grid grid-cols-12 gap-3 p-1 border-b-2 hover:scale-105 easy-in transition-all duration-700">
                          <div className="col-span-10 text-left">12. Únik moči při zátěži:</div>
                          <div className="col-span-2 text-center">{user.__12Question}</div>
                      </div>
                      <div className="grid grid-cols-12 gap-3 p-1 border-b-2 hover:scale-105 easy-in transition-all duration-700">
                          <div className="col-span-10 text-left">13. Neúplné vyprázdnění močového měchýře po vymočení:</div>
                          <div className="col-span-2 text-center">{user.__13Question}</div>
                      </div>
                      <div className="grid grid-cols-12 gap-3 p-1 border-b-2 hover:scale-105 easy-in transition-all duration-700">
                          <div className="col-span-10 text-left">14. Celková únava:</div>
                          <div className="col-span-2 text-center">{user.__14Question}</div>
                      </div>
                      <div className="grid grid-cols-12 gap-3 p-1 border-b-2 hover:scale-105 easy-in transition-all duration-700">
                          <div className="col-span-10 text-left">15. Bolesti v zádech:</div>
                          <div className="col-span-2 text-center">{user.__15Question}</div>
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

export default EndoUserDeatil;
