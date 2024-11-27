import React, {ReactElement, useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Auth_api} from "@/store/useUsers.tsx";
import Login from "@/app/auth/Login.tsx";
import {useTranslation} from "react-i18next";
import {Toast} from "primereact/toast";
import login from "@/app/auth/Login.tsx";

const SearchAccount = () => {
    const [t] = useTranslation("Auth")
    const [Oauth,setOauth] = useState<ReactElement<any, any>[]>([]);
    const [user,Setuser] = useState({
        email:"",
    })
    const nav = useNavigate();
    const toast = useRef<Toast>(null)
    const { token } = useParams<{ token: string }>();

    const checkEmailExist = async () => {
        try {
            // 假设 Auth_api.checkEmailExist 是一个检查邮箱是否存在的API
            // const res = await Auth_api.checkEmailExist(token);
            // if (res.data.exists) {
            //     // 邮箱存在，更新状态
            //     nav(`/auth/Forgot?email=${res.data.email}`)
            // } else {
            //     // 邮箱不存在，导航到另一个页面
            //     nav("/auth/FindAccount");
            // }
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: t("Error"), detail: t("SomethingWrong") });
            nav("/auth/FindAccount");
        }
    };


    const login = () => {
        nav("/auth/login")
    }
    return (
        <>
            <Toast ref={toast}/>
            <div className="h-full">
                <div className="flex items-baseline justify-center cursor-pointer">
                    <img src="/gitdata.ai-black-redpanda.png" alt="JZFS" className=" w-52"/>
                    {/*<b className=" text-4xl">GitDataAI</b>*/}
                </div>
                <h3 className="text-center mt-6 mb-4 font-bold cursor-pointer">{t("FindAccount")}</h3>
                <div>
                    <form className="flex flex-col items-center ">
                        <input onChange={(e) => Setuser((user) => ({...user, email: e.target.value}))}
                               value={user.email} type="email" placeholder={t("Enter") + t("Email")}
                               className="border border-[#8790a2] h-10 w-4/5 mt-2 mb-2 px-2"/>

                        <button type={"button"} onClick={checkEmailExist}
                                className="bg-[#f34d01e6] border border-[#8790a2] h-10 w-4/5"><span
                            className="text-white">{t("Search")}</span></button>

                    </form>
                </div>
                <div className="text-center mt-4 mb-5 cursor-pointer">
                    <span className="mr-1 hover:text-[#f34d01e6]"><a onClick={login}>{t("RemAccount")}</a></span>
                </div>
                <hr className="border-none h-px ml-auto mr-auto bg-[#c2c7d0] w-4/5"/>
                <div className="flex items-baseline justify-center mt-1 cursor-pointer">
                    <img src="/gitdata.ai-black-redpanda.png" alt="JZFS" className=" w-32"/>
                </div>
                <h3 className="text-center text-xs mb-2 cursor-pointer">{t("Connectivity")}</h3>
                <h3 className="text-center text-xs cursor-pointer">{t("Protection")} <a href="#" className="hover:text-[#f34d01e6]">{t("PrivacyPolicy")}</a>{t("And")}<a href="#" className="hover:text-[#f34d01e6]">{t("Service")}</a></h3>
            </div>
        </>
    );
};

export default SearchAccount;
