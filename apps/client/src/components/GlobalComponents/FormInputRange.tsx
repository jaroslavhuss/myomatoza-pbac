import React from "react";

interface Props {
  min: number;
  max: number;
  value: number;
  returnFunction: Function;
}

const FormInputRange: React.FC<Props> = ({
  min,
  max,
  value,
  returnFunction,
}) => {
  return (
    <div className="grid grid-cols-12 gap-4 py-2 my-2 place-content-center content-center">
      <div className="col-span-10">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          className={`range ${value <= max / 4 && "range-success"} ${
            value <= (max / 4) * 2 && "range-warning"
          } ${value <= (max / 4) * 3 && "range-secondary"} ${
            value <= max / 1 && "range-error"
          }`}
          onChange={({ target }) => {
            returnFunction(parseInt(target.value));
          }}
        />
      </div>
      <div className="col-span-2 text-center font-bold rounded-full shadow-xl p-1 flex justify-evenly items-center">
        {value}
      </div>
    </div>
  );
};

export default FormInputRange;
