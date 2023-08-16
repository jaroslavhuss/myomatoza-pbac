import React, { useState } from "react";
import {
  BsPersonFillCheck,
  BsTrash2Fill,
} from "react-icons/bs";

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
  deleteUser: (id: string) => void;
  allData: IUser[];
}

const EndoUserDetailBetter: React.FC<Props> = ({ deleteUser, allData }) => {
  const [doYouWantToDelete, setDoYouWantToDelete] = useState<boolean>(false);
  return (
    <>
      {allData.length > 0 && (
        <div className="w-full m-1">
            <div className="card w-full bg-base-100 shadow-xl relative mx-auto">
              
              <figure className="px-10 pt-10">
                <BsPersonFillCheck
                  style={{
                    fontSize: "3rem",
                    color: "grey",
                  }}
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{allData[0].pacientName}</h2>
                <div className="border w-full p-5 rounded-md">
                  {allData.map((user: IUser, index) => {
                    return (
                      <div
                        className="grid grid-cols-12 gap-3 w-full"
                        key={index}
                      >
                        <div className="col-span-2 text-left">
                          {user.questionnaireDate}
                        </div>
                        <div className="col-span-8 text-left">
                          <progress
                            className="progress w-full"
                            value={user.sumValue}
                            max="150"
                          ></progress>
                        </div>
                        <div className="col-span-2 text-right">
                          {user.sumValue}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {allData.map((userData: IUser, index: number) => {
                  return (
                    <div
                      tabIndex={index}
                      className="collapse collapse-arrow border border-base-300 bg-base-200"
                    >
                      <div className="collapse-title text-2xl font-medium">
                        Záznam z {userData.questionnaireDate}
                      </div>
                     
                      <div className="collapse-content">
                        <div className="overflow-x-auto">
                          <div className="grid grid-cols-12 gap-3 p-1 border-b-2">
                         { !doYouWantToDelete ? <BsTrash2Fill color="red" style={{
                          fontSize:30
                         }} className="text-center col-span-12 mx-auto" onClick={()=>{
                            setDoYouWantToDelete(true)
                          }}/>:<div className="w-full grid grid-cols-12 col-span-12"><div className="btn col-span-6 bg-red-400" onClick={()=>{
                            deleteUser(userData._id)
                          }}>Nenávratně smazat tento záznam</div> <div className="btn col-span-6 bg-green-400" onClick={()=>{
                            setDoYouWantToDelete(false)
                          }}>Zpět</div></div>}
                            <div className="col-span-12 text-center px-2 py-5 font-bold text-xl">
                              Celkový součet {userData.sumValue}
                            </div>
                          </div>
                <div className="w-full bg-white p-2 my-2 rounded-lg text-left">
                1. Bolestivá menstruace: <span className="bg-green-700 text-white font-bold w-40 h-40 p-2 rounded-full">{userData.__01Question}</span>      
                </div>

                <div className="w-full bg-white p-2 my-2 rounded-lg text-left">
                2. Bolestivý pohlavní styk: <span className="bg-green-700 text-white font-bold w-40 h-40 p-2 rounded-full">{userData.__02Question}</span>
                </div>

                <div className="w-full bg-white p-2 my-2 rounded-lg text-left">
                3. Cyklické bolesti s vazbou na menstruaci: <span className="bg-green-700 text-white font-bold w-40 h-40 p-2 rounded-full">{userData.__03Question}</span>
                </div>

                <div className="w-full bg-white p-2 my-2 rounded-lg text-left">
                4. Průjmovitá stolice: <span className="bg-green-700 text-white font-bold w-40 h-40 p-2 rounded-full">{userData.__04Question}</span>
                </div>

                <div className="w-full bg-white p-2 my-2 rounded-lg text-left">
                5. Zácpa: <span className="bg-green-700 text-white font-bold w-40 h-40 p-2 rounded-full">{userData.__05Question}</span>
                </div>

                <div className="w-full bg-white p-2 my-2 rounded-lg text-left">
                6. Krvácení z konečníku: <span className="bg-green-700 text-white font-bold w-40 h-40 p-2 rounded-full">{userData.__06Question}</span>
                </div>

                <div className="w-full bg-white p-2 my-2 rounded-lg text-left">
                7. Křeče v břiše: <span className="bg-green-700 text-white font-bold w-40 h-40 p-2 rounded-full">{userData.__07Question}</span>
                </div>

                <div className="w-full bg-white p-2 my-2 rounded-lg text-left">
                8. Bolesti při stolici: <span className="bg-green-700 text-white font-bold w-40 h-40 p-2 rounded-full">{userData.__08Question}</span>
                </div>

                <div className="w-full bg-white p-2 my-2 rounded-lg text-left">
                9. Pálení, řezání při močení: <span className="bg-green-700 text-white font-bold w-40 h-40 p-2 rounded-full">{userData.__09Question}</span>
                </div>

                <div className="w-full bg-white p-2 my-2 rounded-lg text-left">
                10. Nucení na močení: <span className="bg-green-700 text-white font-bold w-40 h-40 p-2 rounded-full">{userData.__10Question}</span>
                </div>

                <div className="w-full bg-white p-2 my-2 rounded-lg text-left">
                11. Únik moči spontánní: <span className="bg-green-700 text-white font-bold w-40 h-40 p-2 rounded-full">{userData.__11Question}</span>
                </div>

                <div className="w-full bg-white p-2 my-2 rounded-lg text-left">
                12. Únik moči při zátěži: <span className="bg-green-700 text-white font-bold w-40 h-40 p-2 rounded-full">{userData.__12Question}</span>
                </div>

                <div className="w-full bg-white p-2 my-2 rounded-lg text-left">
                13. Neúplné vyprázdnění močového měchýře po vymočení: <span className="bg-green-700 text-white font-bold w-40 h-40 p-2 rounded-full">{userData.__13Question}</span>
                </div>

                <div className="w-full bg-white p-2 my-2 rounded-lg text-left">
                14. Celková únava: <span className="bg-green-700 text-white font-bold w-40 h-40 p-2 rounded-full">{userData.__14Question}</span>
                </div>

                <div className="w-full bg-white p-2 my-2 rounded-lg text-left">
                15. Bolesti v zádech: <span className="bg-green-700 text-white font-bold w-40 h-40 p-2 rounded-full">{userData.__15Question}</span>
                </div>
                        
                        </div>
                      </div>
                    </div>
                  );
                })}

                <h1 className="text-2xl mt-10">Porovnání dat v čase u jednotlivých metrik</h1>

                <div className="h2">1. Bolestivá menstruace</div>
                {
                  allData.map((userData: IUser, index: number) => {
                    return(
                      <div key={index} className="w-full">

                        <div className="grid grid-cols-12 gap-3 w-full">
                        <div className="col-span-3">
                          {userData.questionnaireDate}
                        </div>
                        <progress
                            className="progress col-span-6"
                            value={userData.__01Question}
                            max="10"
                          ></progress>
                          <div className="col-span-3">
                          {userData.__01Question}
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
                <div className="h2">2. Bolestivý pohlavní styk</div>
                {
                  allData.map((userData: IUser, index: number) => {
                    return(
                      <div key={index} className="w-full">

                        <div className="grid grid-cols-12 gap-3 w-full">
                        <div className="col-span-3">
                          {userData.questionnaireDate}
                        </div>
                        <progress
                            className="progress col-span-6"
                            value={userData.__02Question}
                            max="10"
                          ></progress>
                          <div className="col-span-3">
                          {userData.__02Question}
                          </div>
                        </div>
                      </div>
                    )
                  })
                }


<div className="h2">3. Cyklické bolesti s vazbou na menstruaci</div>
                {
                  allData.map((userData: IUser, index: number) => {
                    return(
                      <div key={index} className="w-full">

                        <div className="grid grid-cols-12 gap-3 w-full">
                        <div className="col-span-3">
                          {userData.questionnaireDate}
                        </div>
                        <progress
                            className="progress col-span-6"
                            value={userData.__03Question}
                            max="10"
                          ></progress>
                          <div className="col-span-3">
                          {userData.__03Question}
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
<div className="h2">4. Průjmovitá stolice</div>
                {
                  allData.map((userData: IUser, index: number) => {
                    return(
                      <div key={index} className="w-full">

                        <div className="grid grid-cols-12 gap-3 w-full">
                        <div className="col-span-3">
                          {userData.questionnaireDate}
                        </div>
                        <progress
                            className="progress col-span-6"
                            value={userData.__04Question}
                            max="10"
                          ></progress>
                          <div className="col-span-3">
                          {userData.__04Question}
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
<div className="h2">5. Zácpa</div>
                {
                  allData.map((userData: IUser, index: number) => {
                    return(
                      <div key={index} className="w-full">

                        <div className="grid grid-cols-12 gap-3 w-full">
                        <div className="col-span-3">
                          {userData.questionnaireDate}
                        </div>
                        <progress
                            className="progress col-span-6"
                            value={userData.__05Question}
                            max="10"
                          ></progress>
                          <div className="col-span-3">
                          {userData.__05Question}
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
<div className="h2">6. Krvácení z konečníku</div>
                {
                  allData.map((userData: IUser, index: number) => {
                    return(
                      <div key={index} className="w-full">

                        <div className="grid grid-cols-12 gap-3 w-full">
                        <div className="col-span-3">
                          {userData.questionnaireDate}
                        </div>
                        <progress
                            className="progress col-span-6"
                            value={userData.__06Question}
                            max="10"
                          ></progress>
                          <div className="col-span-3">
                          {userData.__06Question}
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
<div className="h2">7. Křeče v břiše</div>
                {
                  allData.map((userData: IUser, index: number) => {
                    return(
                      <div key={index} className="w-full">

                        <div className="grid grid-cols-12 gap-3 w-full">
                        <div className="col-span-3">
                          {userData.questionnaireDate}
                        </div>
                        <progress
                            className="progress col-span-6"
                            value={userData.__07Question}
                            max="10"
                          ></progress>
                          <div className="col-span-3">
                          {userData.__07Question}
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
<div className="h2">8. Bolesti při stolici</div>
                {
                  allData.map((userData: IUser, index: number) => {
                    return(
                      <div key={index} className="w-full">

                        <div className="grid grid-cols-12 gap-3 w-full">
                        <div className="col-span-3">
                          {userData.questionnaireDate}
                        </div>
                        <progress
                            className="progress col-span-6"
                            value={userData.__08Question}
                            max="10"
                          ></progress>
                          <div className="col-span-3">
                          {userData.__08Question}
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
<div className="h2">9. Pálení, řezání při močení</div>
                {
                  allData.map((userData: IUser, index: number) => {
                    return(
                      <div key={index} className="w-full">

                        <div className="grid grid-cols-12 gap-3 w-full">
                        <div className="col-span-3">
                          {userData.questionnaireDate}
                        </div>
                        <progress
                            className="progress col-span-6"
                            value={userData.__09Question}
                            max="10"
                          ></progress>
                          <div className="col-span-3">
                          {userData.__09Question}
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
<div className="h2">10. Nucení na močení</div>
                {
                  allData.map((userData: IUser, index: number) => {
                    return(
                      <div key={index} className="w-full">

                        <div className="grid grid-cols-12 gap-3 w-full">
                        <div className="col-span-3">
                          {userData.questionnaireDate}
                        </div>
                        <progress
                            className="progress col-span-6"
                            value={userData.__10Question}
                            max="10"
                          ></progress>
                          <div className="col-span-3">
                          {userData.__10Question}
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
<div className="h2">11. Únik moči spontánní</div>
                {
                  allData.map((userData: IUser, index: number) => {
                    return(
                      <div key={index} className="w-full">

                        <div className="grid grid-cols-12 gap-3 w-full">
                        <div className="col-span-3">
                          {userData.questionnaireDate}
                        </div>
                        <progress
                            className="progress col-span-6"
                            value={userData.__11Question}
                            max="10"
                          ></progress>
                          <div className="col-span-3">
                          {userData.__11Question}
                          </div>
                        </div>
                      </div>
                    )
                  })
                }

<div className="h2">12. Únik moči při zátěži</div>
                {
                  allData.map((userData: IUser, index: number) => {
                    return(
                      <div key={index} className="w-full">

                        <div className="grid grid-cols-12 gap-3 w-full">
                        <div className="col-span-3">
                          {userData.questionnaireDate}
                        </div>
                        <progress
                            className="progress col-span-6"
                            value={userData.__12Question}
                            max="10"
                          ></progress>
                          <div className="col-span-3">
                          {userData.__12Question}
                          </div>
                        </div>
                      </div>
                    )
                  })
                }

<div className="h2">13. Neúplné vyprázdnění močového měchýře po vymočení</div>
                {
                  allData.map((userData: IUser, index: number) => {
                    return(
                      <div key={index} className="w-full">

                        <div className="grid grid-cols-12 gap-3 w-full">
                        <div className="col-span-3">
                          {userData.questionnaireDate}
                        </div>
                        <progress
                            className="progress col-span-6"
                            value={userData.__13Question}
                            max="10"
                          ></progress>
                          <div className="col-span-3">
                          {userData.__13Question}
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
<div className="h2">14. Celková únava</div>
                {
                  allData.map((userData: IUser, index: number) => {
                    return(
                      <div key={index} className="w-full">

                        <div className="grid grid-cols-12 gap-3 w-full">
                        <div className="col-span-3">
                          {userData.questionnaireDate}
                        </div>
                        <progress
                            className="progress col-span-6"
                            value={userData.__14Question}
                            max="10"
                          ></progress>
                          <div className="col-span-3">
                          {userData.__14Question}
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
<div className="h2">15. Bolesti v zádech</div>
                {
                  allData.map((userData: IUser, index: number) => {
                    return(
                      <div key={index} className="w-full">

                        <div className="grid grid-cols-12 gap-3 w-full">
                        <div className="col-span-3">
                          {userData.questionnaireDate}
                        </div>
                        <progress
                            className="progress col-span-6"
                            value={userData.__15Question}
                            max="10"
                          ></progress>
                          <div className="col-span-3">
                          {userData.__15Question}
                          </div>
                        </div>
                      </div>
                    )
                  })
                }

                {
                  //NOPE
                }
              </div>
            </div>
        </div>
      )}
    </>
  );
};

export default EndoUserDetailBetter;
