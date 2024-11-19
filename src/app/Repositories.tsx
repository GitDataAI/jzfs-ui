import React from "react";

const Repositories: React.FC = () => {
  return (
    <div className="w-full flex h-full p-3 pt-0">
      <div className="w-1/4 min-w-40 bg-gray-200 p-4 h-full">
        <h2 className="text-lg font-bold">Left Sidebar</h2>
      </div>

      <div className="flex flex-col w-full h-full">
        <div className="h-8 text-lg text-center  border rounded-sm ml-3">
          action
        </div>
        <div className="w-full h-1/4 flex space-x-4 my-2 pl-3">
          <div className="flex-1 bg-white border rounded-sm p-4">
            <h2 className="text-lg font-bold">Card 1</h2>
          </div>
          <div className="flex-1 bg-white border rounded-sm p-4">
            <h2 className="text-lg font-bold">Card 2</h2>
          </div>
          <div className="flex-1 bg-white border rounded-sm p-4">
            <h2 className="text-lg font-bold">Card 3</h2>
          </div>
        </div>

        <div className="w-full h-3/4 flex pl-3">
          <div className="flex-grow bg-gray-100 p-3">
            <h2 className="text-lg font-bold">Left Box</h2>
          </div>
          <div className="w-1/4 min-w-40 bg-white p-4 border-l hidden sm:hidden md:block lg:block">
            <h2 className="text-lg font-bold">Right Box</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Repositories;
