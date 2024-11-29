import React from 'react';
import {LuStar} from "react-icons/lu";
import {FaDownload} from "react-icons/fa";

interface CardProps {
    src: string;
    name: string;
    description: string;
    stars: number;
}

const Card: React.FC<CardProps> = ({ src, name, description, stars }) => {
    const formatStars = () => {
        if (stars >= 1000000) {
            return `${(stars / 1000000).toFixed(1)}m`; // 超过一百万显示为 1m
        } else if (stars >= 1000) {
            return `${(stars / 1000).toFixed(1)}k`; // 超过一千显示为 1k
        } else {
            return stars.toString(); // 否则显示为数字
        }
    };
    return (
        <div className="w-full h-full pb-3 cursor-pointer">
            <div className="w-full flex items-center justify-between">
                <div className="flex justify-center items-center gap-2">
                    <img src={src} className="w-10" alt={name}/>
                    <h3 className="hover:text-[#f34d01e6]">{name}</h3>
                </div>
                <div className="flex justify-center items-center">
                    <span>{formatStars()}</span>
                    <LuStar className="text-2xl"/>
                </div>
            </div>
            <div className="card-info h-2/3 flex flex-col pt-4 justify-between">
                <p className="text-start">{description}</p>
                <div className="text-end">一小时前</div>
            </div>
            <div className="flex justify-between items-center gap-2 mt-2">
                <div className="flex space-x-2">
                    <FaDownload className="text-lg"/>
                    <div className="text-[#f34d01e6]">JZFS</div>
                    <div className="text-sm">5.9G</div>
                </div>
                <div className="flex">
                    <div className="border w-28 h-10 rounded-3xl hover:bg-[#e5e7eb]">文件系统</div>
                    <div className="border w-28 h-10 rounded-3xl hover:bg-[#e5e7eb]">版本控制</div>
                    <div className="border w-28 h-10 rounded-3xl hover:bg-[#e5e7eb]">大数据生态</div>
                </div>
            </div>
        </div>
    );
};

export default Card;