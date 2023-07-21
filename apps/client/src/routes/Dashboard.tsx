import React from 'react';
import HCPDetail from '../components/GlobalComponents/HCPDetail';
interface Props {

}

const Dashboard: React.FC<Props> = ({ }) => {
  return (
    <div className='grid col-span-1 items-center gap-2'>
      <HCPDetail />
    </div>
  );
};

export default Dashboard;