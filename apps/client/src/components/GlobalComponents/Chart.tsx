import React from 'react';

interface ChartData {
    sumValue: number;
    date: string;
}
interface Props {
    label:string,
    data: ChartData[]
}

const ComponentName: React.FC<Props> = ({ }) => {
  return (
    <div>
      <h1>ComponentName</h1>
    </div>
  );
};

export default ComponentName;