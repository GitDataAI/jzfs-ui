import React, {useState} from "react";
import {media} from "@/hooks/useMedia.tsx";
import {InputTextarea} from "primereact/inputtextarea";
import { GroupApi } from "jzfs-ts-api/src/apis/group_api"

const Organization:React.FC= () => {

    const [Organization,SetOrganization] = useState({
        name:"",
        bio:"",
        avatar:"",
    })
    const [value, setValue] = useState('');
    const [inputValue, setInputValue] = useState('');
    const n =new GroupApi

    const width = media.width>768? media.width/2 : media.width
    const width2 = media.width>768? media.width/3 : media.width

    const HandleInputChange = (e:string)  => {
        Organization.bio = e
        console.log(Organization.bio);
        setInputValue(value); // 更新输入值状态
    }

    const HandleNameChange = (e:string)  => {
        Organization.name = e
        console.log(Organization.name);
        setInputValue(value); // 更新输入值状态
    }
    const [avatarFile, setAvatarFile] = useState<File | null>(null); // 存储选择的头像文件
    const [avatarUrl, setAvatarUrl] = useState<string>(""); // 存储头像预览 URL

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setAvatarFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadAvatar = async () => {
        if (avatarFile) {
            // 在这里添加上传头像的逻辑，例如使用 FormData 发送到服务器
            const formData = new FormData();
            formData.append("avatar", avatarFile);
            // 使用 fetch 或其他 HTTP 客户端上传文件
            // ...
        }
    };
    const CreateOrganization = () => {

    }

    return(
        <div className="h-full w-full justify-center flex items-center flex-col" >
            <div className="h-14 w-full md-12 mb-8 mt-12 -8 justify-center items-center flex flex-col" style={{width:width}}>
                <div className="w-1/2">
                    <div className="text-center text-sm text-[#59636e] mb-1">Tell us about your organization</div>
                </div>
                <div className="w-1/2">
                    <div className="text-center mt-0 mb-3 text-[32px]">Set up your organization</div>
                </div>
            </div>
            <div className="w-1/2 h-full flex flex-col items-center" style={{width:width2}}>
                <div className="h-24 mt-4 mb-10 w-full">
                    <div className="text-md my-4 font-bold">Organization name</div>
                    <input type={"text"} onChange={(e) => HandleNameChange(e.target.value)} className="border bg-[#f6f8fa] rounded-lg w-full pl-3 h-10 focus:bg-[#ffffff]  focus:outline-gray-300"/>
                    <div className="my-1">
                        <div className="text-[12px] text-[#59636e]">This will be the name of your account on
                            GitData.AI.
                        </div>
                        <div className="text-[12px] text-[#59636e]">Your URL will be: https://gitdata.AI.com/{(Organization.name)}</div>
                    </div>
                </div>

                <div className="w-full h-fit my-10 font-bold">
                    <div className="text-md mb-4">Add-bio</div>
                    <InputTextarea onChange={(e) => HandleInputChange(e.target.value)} rows={5} cols={30} placeholder="Add a bio" className="w-full border text-lg pl-3 h-64 focus:border-0 focus:outline-gray-300"  unstyled={true}/>
                </div>
                <div className="w-full h-10 mt-10 mb-4 flex items-center justify-start">
                    <div className="text-sm">
                        <input type={"checkbox"} className="mr-2"/>I hereby accept the<a>Terms of Service. </a>For more information about GitData.AI's<a>privacy practices</a>, see the GitHub Privacy Statement.
                    </div>
                </div>
                <button type={"submit"} className="w-full h-11 bg-[#f34d01e6] rounded-lg text-[#ffffff]">Next</button>
            </div>
        </div>
    )
}
{/*<div className="w-full h-14px my-4">*/}
{/*    <div className="text-sm mb-4 font-bold">Contact email</div>*/}
{/*    <input type={"text"} className="border rounded-lg w-full"/>*/}
{/*</div>*/}
{/*<div className="w-full h-28 my-4">*/}
{/*    <div className="text-sm mb-1.5 font-bold">This organization belongs to:</div>*/}
{/*    <div className="flex my-4">*/}
{/*        <input type={"radio"} name="group"/>*/}
{/*        <div>My personal account</div>*/}
{/*    </div>*/}
{/*    <div className="flex my-4">*/}
{/*        <input type={"radio"} name="group"/>*/}
{/*        <div>A business or institution</div>*/}
{/*    </div>*/}
{/*</div>*/}
{/*<div className="w-full h-28 my-4">*/}
{/*    <div className="text-sm mb-1.5">Verify your account</div>*/}
{/*    <div className="border rounded-lg h-96 bg-[#ffffff]">*/}

{/*    </div>*/}
{/*</div>*/}
export default Organization