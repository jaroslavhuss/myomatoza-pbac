import React, { useState } from "react";
import { IErrorGlobalState } from "../../store/store";
import { BsFillTrashFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { removeError, clearAllErrors } from "../../store/gsms/errorSlice";
import { BsTrash } from "react-icons/bs";
const GlobalErrorComponent: React.FC<IErrorGlobalState> = ({ error }) => {
  const dispatch = useDispatch();
  const [showRawData, setShowRawData] = useState<boolean>(false);
  return (
    <>
      <div className="absolute top-0 max-w-7xl bg-slate-50 p-4 overflow-auto mt-20 grid grid-cols-4 gap-3 h-1/2 shadow-2xl rounded-2xl z-30">
        {error.errorMessages.map((e, i: number) => {
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
                  {e.date} | {e.message.toString()}{" "}
                  <span
                    className="absolute top-0 right-0 p-2 bg-[#dbd1ca] rounded-full"
                    onClick={() => {
                      dispatch(removeError(i));
                    }}
                  >
                    <BsFillTrashFill />
                  </span>
                  {(e.cumulation && e.cumulation > 0 && e.cumulation < 10) && (
                    <span
                      className="absolute bottom-0 right-0 p-2 rounded-full bg-[#dbd1ca] w-[30px] h-[30px]"
                      onClick={() => {
                        dispatch(removeError(i));
                      }}
                    >
                      {" "}
                      {e.cumulation}
                    </span>
                  )}
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
        <div
          className="py-2 px-4 focus:ring-offset-purple-200
              text-white transition ease-in duration-200 text-center text-base font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg bg-slate-800 shadow-lg hover:bg-slate-400 absolute bottom-0 right-0 m-2"
        >
          <button
            className="flex justify-center align-middle"
            onClick={() => {
              dispatch(clearAllErrors());
            }}
          >
            <BsTrash style={{ marginTop: 4, marginRight: 6 }} />
            Vymazat všechna upozornění
          </button>
        </div>
      </div>
    </>
  );
};

export default GlobalErrorComponent;
