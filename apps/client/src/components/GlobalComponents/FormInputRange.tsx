import React,{useEffect} from 'react';
import { BsEmojiDizzy, BsEmojiExpressionless, BsEmojiFrown, BsEmojiSmile } from 'react-icons/bs';
interface Props {
min:number;
max:number;
value:number;
returnFunction:Function;
}

const FormInputRange: React.FC<Props> = ({min, max, value, returnFunction }) => {
    useEffect(() => {
      console.log(value)
    }, [value])
    
  return (
    <div className="grid grid-cols-12 gap-4 py-2 my-2 place-content-center content-center">
        <div className="col-span-10">
        <input type="range" min={min} max={max} value={value} className={`range ${value <= 3 && "range-success"} ${(value>3 && value<6) && "range-warning"} ${(value>5 && value<=8) && "range-secondary"} ${(value>8 && value<=10) && "range-error"}`} onChange={({target})=>{
        returnFunction(parseInt(target.value))
    }}/>
        </div>
<div className="col-span-2 text-center font-bold rounded-full shadow-xl p-1 flex justify-evenly items-center">
    {value} 
    {value <= 3 && <BsEmojiSmile />}
    {(value>3 && value<6) && <BsEmojiExpressionless />}
    {(value>5 && value<=8) && <BsEmojiFrown />}
    {(value>8 && value<=10) && <BsEmojiDizzy />}

</div>
    </div>
  
  );
};

export default FormInputRange;