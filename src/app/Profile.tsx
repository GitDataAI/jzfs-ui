import react, {useState} from "react";
import {LuSave} from "react-icons/lu";
import {IoMdBook} from "react-icons/io";
import {VscGithubProject} from "react-icons/vsc";
import {GoLink, GoPackage} from "react-icons/go";
import {FaRegStar} from "react-icons/fa";
import {media} from "@/hooks/useMedia.tsx";
import React from "react";
import {InputTextarea} from "primereact/inputtextarea";

const Profile:react.FC = () => {
    const [isOpen, setisOpen] = useState(false);
    const [value, setValue] = useState('');
    const width = media.width>768? media.width/4*3 : media.width
    const height= media.height
    return(
        <div className="flex-col w-full h-full">
            <div className="w-full h-12 px-3 border-b">
                <div className="w-full h-full">
                    <nav>
                        <ul className="w-full flex space-x-4 py-3 cursor-pointer overflow-hidden md:w-1/2">
                            <li className="flex space-x-2 rounded-md hover:bg-gray-100">
                                <IoMdBook className="text-lg"/>
                               <a className="text-sm">Overview</a>
                            </li>
                            <li  className="flex space-x-2 rounded-md hover:bg-gray-100">
                                <LuSave className="text-lg"/>
                                <a className="text-sm">Repositories</a>
                            </li>
                            <li  className="flex space-x-2 rounded-md hover:bg-gray-100">
                                <VscGithubProject className="text-lg"/>
                                <a className="text-sm">Projects</a>
                            </li>
                            <li  className="flex space-x-2 rounded-md hover:bg-gray-100">
                                <GoPackage className="text-lg"/>
                                <a className="text-sm">Packages</a>
                            </li>
                            <li  className="flex space-x-2 rounded-md hover:bg-gray-100">
                                <FaRegStar className="text-lg"/>
                                <a className="text-sm">Stars</a>
                            </li>
                        </ul>
                   </nav>
                </div>
            </div>
            <div className="w-full h-full justify-center items-center flex">
                <div className="px-3 px-md-4 px-lg-5 mt-2 h-full w-full md:flex"  style={{width:width}}>
                    <div className="h-fit w-full md:w-1/4 md:h-full">
                        <div className="flex-row flex items-center md:flex-col">
                            <div className="w-1/4 h-1/4 aspect-square bg-gray-500 rounded-full flex items-center justify-center cursor-pointer mt-10 md:w-full ">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full rounded-full object-cover">
                                    <rect width="100%" height="100%" fill="#39a" />
                                    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="40" fontFamily="Arial">
                                        U
                                    </text>
                                </svg>
                            </div>
                            <div className="mt-8 text-[#59636e] text-xl md:py-4 md:mt-0" style={{ display: isOpen ? 'none' : 'block' }}>
                                UserName
                            </div>
                        </div>
                        <button
                            className="w-full h-8 bg-[#f6f8fa] border-[#d1d9e0] font-medium py-1.5 px-4 mt-4 rounded-md hover:bg-gray-100} md:mt-0"
                            onClick={() => setisOpen(true)}
                            style={{ display: isOpen ? 'none' : 'block' }}
                        >
                            Edit profile
                        </button>
                        {isOpen && (
                            <div className="user-profile">
                                <div className="font-medium">Name</div>
                                <input type="text" className="border w-full rounded-md h-8 text-xs" placeholder="Name"/>
                                <div className="font-medium">Bio</div>
                                <InputTextarea value={value} onChange={(e) => setValue(e.target.value)} rows={5} cols={30} placeholder="Add a bio" className="w-full border text-xs"/>
                                <div className="font-medium">Pronouns</div>
                                <input type="text" className="border w-full rounded-md text-xs h-8" placeholder="Dont specify"/>
                                <div className="font-medium">Social accounts</div>
                                <div className="flex mt-2 h-7">
                                    <GoLink className="text-sm mt-2 mr-2"/>
                                    <input type="text" className="border w-full rounded-md px-4 text-xs" placeholder="Link to social accounts"/>
                                </div>
                                <div className="flex mt-2 h-7">
                                    <GoLink className="text-sm mt-2 mr-2"/>
                                    <input type="text" className="border w-full rounded-md px-4 text-xs" placeholder="Link to social accounts"/>
                                </div>
                                <div className="flex mt-2 h-7">
                                    <GoLink className="text-sm mt-2 mr-2"/>
                                    <input type="text" className="border w-full rounded-md px-4 text-xs" placeholder="Link to social accounts"/>
                                </div>
                                <div className="space-x-4 mt-4">
                                    <button className="bg-[#f34d01e6] border rounded-md text-white hover:bg-orange-600" onClick={() => setisOpen(false)}>Save</button>
                                    <button className="rounded-md border bg-[#f6f8fa] hover:bg-gray-100" onClick={() => setisOpen(false)}>Cancel</button>
                                </div>
                            </div>
                        )}
                        <div className="py-4 border-b">
                            Joined 3 days ago
                        </div>
                        <div className="my-4 md:mt-4">
                            Organizations
                        </div>
                    </div>
                    <div className="w-full h-full md:ml-6">
                        <div className="w-full h-1/6 border">
                            Popular repositories
                        </div>
                        <div className="w-full h-1/6 border">
                            contributions
                        </div>
                        <div className="w-full h-2/3 border">
                            contributions activity
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile