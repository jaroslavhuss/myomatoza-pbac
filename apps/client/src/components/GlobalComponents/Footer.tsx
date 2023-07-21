import React from "react";

interface Props {}

const Footer: React.FC<Props> = ({}) => {
  return (
    <footer className="w-full text-white bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 sticky bottom-0">
    <div className="flex flex-col items-center px-4 py-6 mx-auto lg:items-stretch lg:justify-between lg:flex-row max-w-7xl">
      <div className="flex flex-col items-center justify-center w-full mx-auto lg:flex-row lg:justify-between">
       {new Date().getFullYear()} © Myomatóza & PBAC
      </div>
    </div>
  </footer>
  );
};

export default Footer;
