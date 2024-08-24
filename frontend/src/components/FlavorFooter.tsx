import React from "react";

const FlavorFooter = () => {
  return (
    <div className="font-poppins cursor-default">
      <div className="align-middle content-center flex flex-row justify-center gap-44 bg-zinc-800 py-4">
        <p className="text-white tracking-wide py-3 text-sm">
          BECOME A SUPPLIER AND EXPAND YOUR REACH, JOIN US TODAY
        </p>
        <p className="bg-red-600 text-white px-24 py-3 rounded-lg text-sm hover:bg-white hover:text-black duration-500 cursor-pointer">
          REGISTER
        </p>
      </div>

      <div className="flex flex-col md:flex-row px-32 align-middle content-center justify-between py-12 bg-neutral-900 text-stone-300">
        <div className="flex flex-col mb-6 md:mb-0">
          <p className="text-3xl font-bold">FlavorFetch</p>
          <p className="text-sm">
            32 Old Butchers Street, 11 Colombo, Sri Lanka
          </p>
        </div>

        <div className="flex flex-col md:flex-row text-sm text-stone-400 gap-4 md:gap-6">
          <div className="flex flex-col">
            <p>CONNECT WITH US:</p>
          </div>
          <div>
            <div className="flex gap-6 justify-center cursor-pointer">
              <img className="w-[20px] h-[20px]" src="/facebook.png" alt="" />
              <img className="w-[20px] h-[20px]" src="/instagram.png" alt="" />
              <img className="w-[20px] h-[20px]" src="/twitter.png" alt="" />
            </div>
            <p className="text-xs text-center md:text-right mt-4">
              ©️2024 ITP PROJECT
            </p>
          </div>
        </div>
      </div>

      <div className="text-center text-xs py-4 bg-black text-stone-700">
        <p>ITP_PROJECT_2024</p>
      </div>
    </div>
  );
};

export default FlavorFooter;
