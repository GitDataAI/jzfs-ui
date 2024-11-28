import React, {useRef, useState} from "react";
import {media} from "@/hooks/useMedia.tsx";
import {InputTextarea} from "primereact/inputtextarea";
import { GroupApi } from "@/apis/apis/group_api"
import {useNavigate} from "react-router-dom";
import {Toast} from "primereact/toast";
import {MdOutlineCameraAlt} from "react-icons/md";

const Organization:React.FC= () => {

    const [isChecked, setIsChecked] = useState(false);
    const [Organization,SetOrganization] = useState({
        name:"",
        bio:"",
        avatar:"",
    })
    const n =new GroupApi
    const isButtonDisabled = Organization.name.trim() === '' || !isChecked;

    const width = media.width>768? media.width/2 : media.width
    const width2 = media.width>768? media.width/3 : media.width
    const nav = useNavigate();
    const toast = useRef<Toast>(null)

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    // const [avatarFile, setAvatarFile] = useState<File | null>(null); // 存储选择的头像文件
    // const [avatarUrl, setAvatarUrl] = useState<string>(""); // 存储头像预览 URL

    // const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files ? e.target.files[0] : null;
    //     if (file) {
    //         setAvatarFile(file);
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setAvatarUrl(reader.result as string);
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };

    // const handleUploadAvatar = async () => {
    //     if (avatarFile) {
    //         // 在这里添加上传头像的逻辑，例如使用 FormData 发送到服务器
    //         const formData = new FormData();
    //         formData.append("avatar", avatarFile);
    //         // 使用 fetch 或其他 HTTP 客户端上传文件
    //         // ...
    //     }
    // };
    const CreateOrganization = () => {
        if (!isButtonDisabled) {
            toast.current?.show({severity:'error',summary:"FormCommit",detail:"Please accept the Terms of Service before submitting."})
        } else {
            if (Organization.name !=''){
                n.Create({
                    name:Organization.name,
                    bio:Organization.bio,
                    avatar:Organization.avatar
                })
                    .then(res=>{
                        if (res.data.code === 200){
                            console.log(Organization.name)
                            console.log(Organization.bio)
                            console.log(Organization.avatar)
                            toast.current?.show({severity:'success',summary:"CreateSuccess",detail:'Success'})
                            // nav("./auth/login")
                        }else {
                            toast.current?.show({severity:'error',summary:"CreateFailed",detail:res.data.msg})
                        }
                    })
            }else{
                toast.current?.show({severity:'error',summary:"CreateFailed",detail:"Organization Name is null"})
            }
        }
    }

    return(
        <>
            <Toast ref={toast}/>
            <div className="h-full w-full justify-center flex items-center flex-col">
                <div className="h-14 w-full md-12 mb-8 mt-12 -8 justify-center items-center flex flex-col"
                     style={{width: width}}>
                    <div className="w-1/2">
                        <div className="text-center text-sm text-[#59636e] mb-1">Tell us about your organization</div>
                    </div>
                    <div className="w-1/2">
                        <div className="text-center mt-0 mb-3 text-[32px]">Set up your organization</div>
                    </div>
                </div>
                <div className="w-1/2 h-full flex flex-col items-center" style={{width: width2}}>
                    <div className="mt-10 text-md font-bold">Add avatar</div>
                    <div className="w-1/10 h-1/5 aspect-square bg-gray-500 flex items-center justify-center cursor-pointer mt-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full rounded-full object-cover">
                            <rect width="100%" height="100%" fill="#f34d01e6"/>
                            <MdOutlineCameraAlt  x="20%" y="22%" fill="white" className="text-9xl"/>
                        </svg>
                    </div>
                    <div className="h-24 mt-4 mb-10 w-full">
                        <div className="text-md my-4 font-bold">Organization name</div>
                        <input type={"text"} onChange={(e) => {
                            SetOrganization({...Organization, name: e.target.value})
                        }}
                               className="border bg-[#f6f8fa] rounded-lg w-full pl-3 h-10 focus:bg-[#ffffff]  focus:outline-gray-300"/>
                        <div className="my-1">
                            <div className="text-[12px] text-[#59636e]">This will be the name of your account on
                                GitData.AI.
                            </div>
                            <div className="text-[12px] text-[#59636e]">Your URL will be:
                                https://gitdata.AI.com/{(Organization.name)}</div>
                        </div>
                    </div>

                    <div className="w-full h-fit my-10 font-bold">
                        <div className="text-md mb-4">Add-bio</div>
                        <InputTextarea onChange={(e) => {
                            SetOrganization({...Organization, bio: e.target.value})
                        }} rows={5} cols={30} placeholder="Add a bio"
                                       className="w-full border text-lg pl-3 h-64 focus:border-0 focus:outline-gray-300"
                                       unstyled={true}/>
                    </div>
                    <div className="w-full h-10 mt-10 mb-4 flex items-center justify-start">
                        <div className="text-sm">
                            <input type={"checkbox"} checked={isChecked} onChange={handleCheckboxChange}
                                   className="mr-2"/>I hereby accept the<a>Terms of Service. </a>For
                            more information about GitData.AI's<a>privacy practices</a>, see the GitData.AI Privacy
                            Statement.
                        </div>
                    </div>
                    <button type={"button"} className={`bg-[#f34d01e6] text-[#ffffff] rounded-lg w-full h-11 ${isButtonDisabled ? 'cursor-not-allowed bg-[#cccccc]' : ''}`} onClick={CreateOrganization} disabled={isButtonDisabled}>
                        Next
                    </button>
                </div>
            </div>
        </>

    )
}
export default Organization