import React, { useState } from "react";
import { IErrorGlobalState } from "../../store/store";
import {BsFillTrashFill} from 'react-icons/bs';
import { useDispatch } from "react-redux";
import { removeError, clearAllErrors } from "../../store/gsms/errorSlice";
const GlobalErrorComponent: React.FC<IErrorGlobalState> = ({ error }) => {
  const dispatch = useDispatch();
  const [showRawData, setShowRawData] = useState<boolean>(false);
  return (
    <>

      <div className="absolute top-0 max-w-7xl bg-slate-50 p-4 overflow-auto mt-20 grid grid-cols-4 gap-3 h-1/2 shadow-2xl rounded-2xl">
        {error.errorMessages.map((e,i:number) => {
          return (
            <div className="relative col-span-1" key={i}>
              <p
                onClick={() => {
                  setShowRawData(!showRawData);
                }}
              ></p>
              {showRawData && (
                <p
                  style={{
                    fontSize: 10,
                    lineHeight: 1.4,
                  }}
                ></p>
              )}

              <div className="dropdown dropdown-end relative">
                <label tabIndex={0} className="btn m-1">
                {e.date} | {e.message.toString()}  <span className="absolute top-0 right-0 p-2 bg-[#dbd1ca] rounded-full" onClick={()=>{
                    dispatch(removeError(i))
                }}><BsFillTrashFill /></span> 
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>{e.rawData.toString()}</li>
                </ul>
              </div>
            </div>
          );
        })}
        <div className="btn absolute bottom-0 left-1/2 bg-green-500 -ml-10">
          <button onClick={()=>{
              dispatch(clearAllErrors())
          }
          }>Clear all errors</button>
        </div>
      </div>
    </>
  );
};

export default GlobalErrorComponent;
