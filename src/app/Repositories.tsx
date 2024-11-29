import React, {useEffect, useState} from "react";
import {media} from "@/hooks/useMedia.tsx";
import {MenuItem} from "primereact/menuitem";
import {AiOutlineUser} from "react-icons/ai";
import {MegaMenu} from "primereact/megamenu";
import {ImFire} from "react-icons/im";
import {BsClipboardData} from "react-icons/bs";
import {LuStar} from "react-icons/lu";
import {MdHistory} from "react-icons/md";
import Carousel from "@/components/Common/Carousel.tsx";
import Card from "@/components/Common/Card.tsx";
import {FaGripfire} from "react-icons/fa";
import {Dropdown, DropdownChangeEvent} from "primereact/dropdown";

interface Date {
  name: string;
  code: string;
}

const Repositories: React.FC = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [isVisible, setIsVisible] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const cities: Date[] = [
    { name: 'Day', code: 'D' },
    { name: 'Month', code: 'M' },
    { name: 'Year', code: 'Y' }
  ];

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const handleResize = () => {
    setWidth(window.innerWidth);
  };
  const handleClose = () => {
    setIsVisible(false); // 更新状态，使盒子不可见
  };

  const width1=width>768?media.width/8 :'100%'
  const width2=width>768?media.width-media.width/8 :'100%'
  const width3=(width<1400 && width>768)?width-media.width/8 : '87.5%'

  const items1: MenuItem[] = [
    {
      label: 'Username',
      items: [
          {
            label: 'switch dashboard context',
            items: [
                {
                  label: 'Username'
                },
                { label: 'Organization'
                },
                {
                  label: 'Manage Organization'
                },
                {
                  label: 'Create Organization',
                },
            ]
          }
      ]
    },
  ];

  return (
    <div className="w-full flex h-full p-3 pt-0 flex-col md:flex-row">
      <div className="w-full min-w-64 border-r h-fit md:h-full md:w-1/4" style={{width:width1}}>
        <div className="flex items-center ml-8 bg-[#f9fafb]">
          <AiOutlineUser className="text-3xl"/>
          <MegaMenu model={items1} breakpoint="960px"/>
        </div>
        <div className="w-full bg-[#f9fafb] px-4">
          <button className="flex items-center space-x-2 w-full h-10 rounded-lg hover:bg-[#e5e7eb]">
            <ImFire className="text-2xl ml-4"/>
            <div className="text-sm">探索</div>
          </button>
          <button className="flex items-center space-x-2 w-full h-10 rounded-lg hover:bg-[#e5e7eb]">
            <BsClipboardData className="text-2xl ml-4"/>
            <div className="text-sm">概览</div>
          </button>
          <button className="flex items-center space-x-2 w-full h-10 rounded-lg hover:bg-[#e5e7eb]">
            <LuStar className="text-2xl ml-4"/>
            <div className="text-sm">收藏</div>
          </button>
          <button className="flex items-center space-x-2 w-full h-10 rounded-lg hover:bg-[#e5e7eb]">
            <MdHistory className="text-2xl ml-4"/>
            <div className="text-sm">最近使用</div>
          </button>

          <div className="flex items-center w-full h-10 rounded-lg">
            <div className="text-md">仓库</div>
          </div>
          <button className="flex items-center space-x-2 w-full h-10 rounded-lg hover:bg-[#e5e7eb]">
            <MdHistory className="text-2xl ml-4"/>
            <div className="text-sm">学习资料</div>
          </button>
          <button className="flex items-center space-x-2 w-full h-10 rounded-lg hover:bg-[#e5e7eb]">
            <MdHistory className="text-2xl ml-4"/>
            <div className="text-sm">博客文档</div>
          </button>
          <button className="flex items-center space-x-2 w-full h-10 rounded-lg hover:bg-[#e5e7eb]">
            <MdHistory className="text-2xl ml-4"/>
            <div className="text-sm">关于存储开发...</div>
          </button>
          <button className="flex items-center justify-center space-x-2 w-full h-10 rounded-lg hover:bg-[#e5e7eb]">
            <div className="text-2xl">...</div>
          </button>
          <button
              className="flex items-center justify-center space-x-2 w-full h-10 border-2 border-dashed hover:bg-[#e5e7eb]">
            <div className="text-md">创建仓库</div>
          </button>

          <div className="flex items-center w-full h-10 mt-4 rounded-lg">
            <div className="text-md">标签</div>
          </div>
          <button className="flex items-center space-x-2 w-full h-10 rounded-lg hover:bg-[#e5e7eb]">
            <MdHistory className="text-2xl ml-4"/>
            <div className="text-sm">竞赛</div>
          </button>
          <button className="flex items-center space-x-2 w-full h-10 rounded-lg hover:bg-[#e5e7eb]">
            <MdHistory className="text-2xl ml-4"/>
            <div className="text-sm">房产数据</div>
          </button>
          <button className="flex items-center space-x-2 w-full h-10 rounded-lg hover:bg-[#e5e7eb]">
            <MdHistory className="text-2xl ml-4"/>
            <div className="text-sm">交易数据</div>
          </button>
          <button className="flex items-center justify-center space-x-2 w-full h-10 rounded-lg hover:bg-[#e5e7eb]">
            <div className="text-2xl">...</div>
          </button>
          <button
              className="flex items-center justify-center space-x-2 w-full h-10 border-2 border-dashed hover:bg-[#e5e7eb]">
            <div className="text-md">新增标签</div>
          </button>

          <div className="flex items-center w-full h-10 mt-4 rounded-lg">
            <div className="text-md">存储空间</div>
          </div>
          <button className="flex items-center space-x-2 w-full h-10 rounded-lg hover:bg-[#e5e7eb]">
            <MdHistory className="text-2xl ml-4"/>
            <div className="text-sm">官方存储</div>
          </button>
          <button className="flex items-center space-x-2 w-full h-10 rounded-lg hover:bg-[#e5e7eb]">
            <MdHistory className="text-2xl ml-4"/>
            <div className="text-sm">阿里云存储</div>
          </button>
          <button className="flex items-center space-x-2 w-full h-10 rounded-lg hover:bg-[#e5e7eb]">
            <MdHistory className="text-2xl ml-4"/>
            <div className="text-sm">IPFS</div>
          </button>
          <button className="flex items-center justify-center space-x-2 w-full h-10 rounded-lg hover:bg-[#e5e7eb]">
            <div className="text-2xl">...</div>
          </button>
          <button
              className="flex items-center justify-center space-x-2 w-full h-10 border-2 border-dashed hover:bg-[#e5e7eb]">
            <div className="text-md">新增存储空间</div>
          </button>
        </div>
      </div>

      <div className="justify-center items-center w-full flex h-full cursor-pointer" style={{width: width3}}>
        <div className="flex flex-col w-full h-full " style={{width: width2}}>
          {
              isVisible && (
                  <div className="h-16 text-lg text-center flex justify-between border rounded-lg md:ml-3">
                    <div className="mt-4 ml-4">JzFs 0.1 版本即将上线，敬请期待</div>
                    <button className="w-6 self-center mr-4 text-lg hover:bg-[#e5e7eb]" onClick={handleClose}>X</button>
                  </div>
              )
          }
          <div className="w-full h-full flex ">
            <div className="w-full pr-4">
              <div className="w-full pl-3 h-10 flex items-center">
                <FaGripfire className="text-2xl mr-1"/>
                <div className="text-lg">最受欢迎的仓库</div>
                <Dropdown value={selectedDate} onChange={(e: DropdownChangeEvent) => setSelectedDate(e.value)} options={cities} optionLabel="name"
                          placeholder="DAY" className="w-24 h-10 md:w-14rem dropdown-focused mt-3" />
             </div>
             <div className="w-full h-1/4 flex my-2 flex-col sm:space-x-4 md:pl-3  sm:flex-row ">
               <div className="flex-1 bg-white border rounded-sm p-4">
                 <Card src="/gitdata.ai-redpanda.png" name="GitDataAI/JZFS" description="A Git-like Version Control File System for Datasets Management in the Era of AI." stars={100000}/>
               </div>
               <div className="flex-1 bg-white border rounded-sm p-4">
                 <Card src="/gitdata.ai-redpanda.png" name="GitDataAI/JZlab" description="A Git-like Version Control File System for Datasets Management in the Era of AI." stars={10000000}/>
               </div>
             </div>
              <div className="w-full pl-3 h-5 flex items-center ">
                <div className="text-gray-400 hover:text-[#f34d01e6]">点击查看更多</div>
              </div>
             <div className="flex-grow bg-gray-100 p-3 ml-3 mt-2 h-3/4">
               <h2 className="text-2xl font-bold">竞赛</h2>
             </div>
           </div>
           <div className="w-1/4 h-full flex flex-col border-l md:pl-3 md:hidden 2xl:block">
             <div className="w-full h-1/4 my-2  md:bg-white md:rounded-sm md:p-4 ">
               <h2 className="text-lg font-bold">Card 3</h2>
               <div className="w-full h-3/4 justify-center items-center flex">
                 <Carousel>
                   <img src="/gitdata.ai-redpanda.png" alt="JZFS" className="w-full h-full"/>
                   <img src="/gitdata.ai-black-redpanda.png" alt="JZFS" className="w-full h-full"/>
                 </Carousel>
               </div>
             </div>
             <div className="w-full h-3/4 mt-20 min-w-40 bg-gray-300 flex p-4 2xl:block">
               <h2 className="text-lg font-bold">Right Box</h2>
             </div>
           </div>
         </div>
       </div>
     </div>
    </div>
  );
};

export default Repositories;
