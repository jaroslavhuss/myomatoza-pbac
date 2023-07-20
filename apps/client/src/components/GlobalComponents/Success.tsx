import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideSuccess } from "../../store/gsms/successSlice";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ISuccessGlobalState } from "../../store/store";

const Success: React.FC = ({}) => {
  const success = useSelector((state: ISuccessGlobalState) => {
    return state.success;
  });
  const dispatch = useDispatch();
  return (
    <div className="w-[300px] h-[200px] bg-gradient-to-br from-green-50 via-white to-green-50 overflow-scroll absolute bottom-0 right-0 m-8 rounded-lg shadow-2xl z-20">
      <div className="relative w-auto h-auto overflow-scroll">
        <div className="grid grid-cols-3 border-b-2">
          <div className="col-span-1">{success.date}</div>
          <div
            className="col-span-1 justify-center align-middle self-center font-bold"
            style={{ fontSize: 20 }}
          >
            Úspěch
          </div>
          <div className="col-span-1 justify-self-end">
            <AiOutlineCloseCircle
              style={{ fontSize: 40, color: "grey", margin: 1 }}
              onClick={() => {
                dispatch(hideSuccess());
              }}
            />
          </div>
        </div>
        <div
          className="tooltip tooltip-closed tooltip-bottom"
          data-tip={success.rawData.toString()||"Ahoj"}
        >
          <button className="btn">{success.message}</button>
        </div>
      </div>
    </div>
  );
};

export default Success;
