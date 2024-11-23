import React, {useEffect, useState} from "react";
import {media} from "@/hooks/useMedia.tsx";

const Repositories: React.FC = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const handleResize = () => {
    setWidth(window.innerWidth);
  };
  const width1=width>768?media.width/5 :'100%'
  const width2=width>768?media.width-media.width/5 :'100%'
  const width3=(width<1400 && width>768)?width-media.width/5 : '100%'
  return (
    <div className="w-full flex h-full p-3 pt-0 flex-col md:flex-row">
      <div className="w-full min-w-64 bg-gray-200 p-4 h-fit md:h-full md:w-1/4" style={{width:width1}}>
        <h2 className="text-lg font-bold">Left Sidebar</h2>
      </div>

     <div className="justify-center items-center w-full flex h-full" style={{width:width3}}>
       <div className="flex flex-col w-full h-full " style={{width:width2}}>
         <div className="h-8 text-lg text-center  border rounded-sm md:ml-3">
           action
         </div>
         <div className="w-full h-1/4 flex my-2 flex-col sm:space-x-4 md:pl-3  sm:flex-row hidden">
           <div className="flex-1 bg-white border rounded-sm p-4">
             <h2 className="text-lg font-bold">Card 1</h2>
           </div>
           <div className="flex-1 bg-white border rounded-sm p-4">
             <h2 className="text-lg font-bold">Card 2</h2>
           </div>
           <div className="hidden md:flex-1 md:bg-white md:border md:rounded-sm md:p-4 md:block">
             <h2 className="text-lg font-bold">Card 3</h2>
           </div>
         </div>

         <div className="w-full h-full flex md:pl-3">
           <div className="flex-grow bg-gray-100 p-3">
             <h2 className="text-lg font-bold">Left Box</h2>
           </div>
           <div className="w-1/4 min-w-40 bg-white p-4 border-l hidden md:hidden lg:hidden 2xl:block">
             <h2 className="text-lg font-bold">Right Box</h2>
           </div>
         </div>
       </div>
     </div>
    </div>
  );
};

export default Repositories;
