import React, { useEffect, useState } from "react";
import MainLayout from "../components/Layouts/MainLayout";
import { emptyMyomatosys } from "../Entities/defaults/myomatosys.empty";
import { IMyomatosys } from "../Entities/interfaces/myomatosys.interface";
import FormInputRange from "../components/GlobalComponents/FormInputRange";

interface Props {}

const MyomatosysQuestionnaire: React.FC<Props> = ({}) => {
  const [myomatosysAnswers, setMyomatosysAnswers] =
    useState<IMyomatosys>(emptyMyomatosys);

    useEffect(() => {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const dateString = `${day}.${month}.${year}`;
        setMyomatosysAnswers({...myomatosysAnswers, questionnaireDate:dateString})
    }, []);

    //UseEffect that sums all numbers from myomatosysAnswers questions and sets the value to the state

    useEffect(() => {
        const sum = myomatosysAnswers.__01Question + myomatosysAnswers.__02Question + myomatosysAnswers.__03Question + myomatosysAnswers.__04Question + myomatosysAnswers.__05Question + myomatosysAnswers.__06Question + myomatosysAnswers.__07Question + myomatosysAnswers.__08Question + myomatosysAnswers.__09Question + myomatosysAnswers.__10Question;
        setMyomatosysAnswers({...myomatosysAnswers, sumValue:sum})
    }
    , [myomatosysAnswers.__01Question, myomatosysAnswers.__02Question, myomatosysAnswers.__03Question, myomatosysAnswers.__04Question, myomatosysAnswers.__05Question, myomatosysAnswers.__06Question, myomatosysAnswers.__07Question, myomatosysAnswers.__08Question, myomatosysAnswers.__09Question, myomatosysAnswers.__10Question])
  return (
    <MainLayout>
        <div className="flex flex-col w-full">
      <h1 className="text-2xl my-2">Vážená slečno, Vážená paní,</h1>
      <p>
        za účelem zkvalitnění Vašeho vyšetření v naší ambulanci, vyplňte prosím
        tento formulář písemně nebo elektronicky přes QR kód.
      </p>


        Uvedená data budou využita k monitorování Vaší léčby. Hodnocené
        parametry specifikujte numericky od hodnoty 0 po hodnotu 10.
        <ul className="font-bold my-2">
          <li>0 = zcela bez příznaku</li>
          <li>10 = maximální míra příznaku</li>
        </ul>
        <p>Číselnou hodnotu odpovídající Vámi vnímané míře příznaku označte</p>

      <form className="relative self-center bg-white p-4 rounded-xl mt-10 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-100 shadow-2xl" >
      <div className={`sticky top-1/2 left-0 -ml-20 p-4 text-white inline-block rounded-lg floating ${
        myomatosysAnswers.sumValue <= 30 && "bg-green-500"
        } ${(myomatosysAnswers.sumValue > 30 && myomatosysAnswers.sumValue <= 50) && "bg-yellow-500"} ${(myomatosysAnswers.sumValue > 50 && myomatosysAnswers.sumValue <= 70) && "bg-orange-500"} ${(myomatosysAnswers.sumValue > 70) && "bg-red-500"}
transition-all ease-in-out duration-700
      `}>
    {myomatosysAnswers.sumValue}
</div>
        <div className="grid grid-cols-2 gap-2">
          <div className="col-span-2">
            <h2 className="text-xl my-2">Pacientka</h2>
            <div className="container grid max-w-3xl grid-cols-12 items-center">
            <label className="col-span-3 font-bold">Celé jméno a příjmení: </label>
            <input className="col-span-9 shadow-lg m-2 rounded border-t-2 py-3" type="text" value={myomatosysAnswers.pacientName} onChange={({target})=>{setMyomatosysAnswers({...myomatosysAnswers, pacientName:target.value})}}/>
            </div>
            <div className="container grid max-w-3xl grid-cols-12 items-center">
              <label className="col-span-3 font-bold">Rodné číslo: </label>
              <input className="col-span-9 shadow-lg m-2 rounded border-t-2 py-3" type="number" value={myomatosysAnswers.pacientSSN} onChange={({target})=>{setMyomatosysAnswers({...myomatosysAnswers, pacientSSN:target.value})}}/>
            </div>
            <div className="container grid max-w-3xl grid-cols-12 items-center">
                <label className="col-span-3 font-bold">Datum vyplnění </label>
                <input className="col-span-9 shadow-lg m-2 rounded border-t-2 py-3 text-center" type="string" value={myomatosysAnswers.questionnaireDate} 
                onChange={({target})=>{setMyomatosysAnswers({...myomatosysAnswers, questionnaireDate:target.value})}}
                />
            </div>
            <div className="container grid max-w-3xl grid-cols-12 items-center p-2 mt-5">
                <label className="col-span-12 font-bold">Silné menstruační krvácení</label>
                <div className="col-span-12">
                    <FormInputRange min={1} max={10} value={myomatosysAnswers.__01Question} returnFunction={(number:number)=>{
                        setMyomatosysAnswers({...myomatosysAnswers, __01Question:number})
                    }}/>
                </div>
            </div>
            <div className="container grid max-w-3xl grid-cols-12 items-center p-2 mt-0">
                <label className="col-span-12 font-bold">Nepravidelná menstruace</label>
                <div className="col-span-12">
                    <FormInputRange min={1} max={10} value={myomatosysAnswers.__02Question} returnFunction={(number:number)=>{
                        setMyomatosysAnswers({...myomatosysAnswers, __02Question:number})
                    }}/>
                </div>
            </div>
            <div className="container grid max-w-3xl grid-cols-12 items-center p-2 mt-0">
                <label className="col-span-12 font-bold">Bolestivá menstruace</label>
                <div className="col-span-12">
                    <FormInputRange min={1} max={10} value={myomatosysAnswers.__03Question} returnFunction={(number:number)=>{
                        setMyomatosysAnswers({...myomatosysAnswers, __03Question:number})
                    }}/>
                </div>
            </div>
            <div className="container grid max-w-3xl grid-cols-12 items-center p-2 mt-0">
                <label className="col-span-12 font-bold">Bolestivý pohlavní styk</label>
                <div className="col-span-12">
                    <FormInputRange min={1} max={10} value={myomatosysAnswers.__04Question} returnFunction={(number:number)=>{
                        setMyomatosysAnswers({...myomatosysAnswers, __04Question:number})
                    }}/>
                </div>
            </div>
            <div className="container grid max-w-3xl grid-cols-12 items-center p-2 mt-0">
                <label className="col-span-12 font-bold">Bolest v břiše / v pánvi</label>
                <div className="col-span-12">
                    <FormInputRange min={1} max={10} value={myomatosysAnswers.__05Question} returnFunction={(number:number)=>{
                        setMyomatosysAnswers({...myomatosysAnswers, __05Question:number})
                    }}/>
                </div>
            </div>
            <div className="container grid max-w-3xl grid-cols-12 items-center p-2 mt-0">
                <label className="col-span-12 font-bold">Celková únava</label>
                <div className="col-span-12">
                    <FormInputRange min={1} max={10} value={myomatosysAnswers.__06Question} returnFunction={(number:number)=>{
                        setMyomatosysAnswers({...myomatosysAnswers, __06Question:number})
                    }}/>
                </div>
            </div>
            <div className="container grid max-w-3xl grid-cols-12 items-center p-2 mt-0">
                <label className="col-span-12 font-bold">Nucení na močení</label>
                <div className="col-span-12">
                    <FormInputRange min={1} max={10} value={myomatosysAnswers.__07Question} returnFunction={(number:number)=>{
                        setMyomatosysAnswers({...myomatosysAnswers, __07Question:number})
                    }}/>
                </div>
            </div>
            <div className="container grid max-w-3xl grid-cols-12 items-center p-2 mt-0">
                <label className="col-span-12 font-bold">Únik moči spontánní</label>
                <div className="col-span-12">
                    <FormInputRange min={1} max={10} value={myomatosysAnswers.__08Question} returnFunction={(number:number)=>{
                        setMyomatosysAnswers({...myomatosysAnswers, __08Question:number})
                    }}/>
                </div>
            </div>
            <div className="container grid max-w-3xl grid-cols-12 items-center p-2 mt-0">
                <label className="col-span-12 font-bold">Únik moči při zátěži</label>
                <div className="col-span-12">
                    <FormInputRange min={1} max={10} value={myomatosysAnswers.__09Question} returnFunction={(number:number)=>{
                        setMyomatosysAnswers({...myomatosysAnswers, __09Question:number})
                    }}/>
                </div>
            </div>
            <div className="container grid max-w-3xl grid-cols-12 items-center p-2 mt-0">
                <label className="col-span-12 font-bold">Zácpa</label>
                <div className="col-span-12">
                    <FormInputRange min={1} max={10} value={myomatosysAnswers.__10Question} returnFunction={(number:number)=>{
                        setMyomatosysAnswers({...myomatosysAnswers, __10Question:number})
                    }}/>
                </div>
            </div>
            <div className="container grid max-w-3xl grid-cols-12 items-center p-2 mt-0">
              <input className="col-span-12 bg-blue-500 p-4 rounded shadow-md text-white font-bold hover:scale-105 transition-all ease-in-out duration-700" type="submit" value="Uložit své odpovědi!" />
            </div>
          
          </div>
        </div>
      </form>
      </div>
    </MainLayout>
  );
};

export default MyomatosysQuestionnaire;
