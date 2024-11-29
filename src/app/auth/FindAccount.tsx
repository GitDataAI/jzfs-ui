import React, {ReactElement, useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Auth_api} from "@/store/useUsers.tsx";
import Login from "@/app/auth/Login.tsx";
import {useTranslation} from "react-i18next";
import {Toast} from "primereact/toast";

const FindAccount = () => {
    const [t] = useTranslation("Auth")
    const [user,Setuser] = useState({
        email:"",
        password:"",
        passwordE:"",
        username: "",
        code: ""
    })
    const [Time,setTime] = useState(t("Get")+t("Captcha"))
    const nav = useNavigate();
    const toast = useRef<Toast>(null)

    const handleNext = () => {
        // Auth_api.register({
        //     email:user.email,
        //     password:user.password,
        //     username:user.username
        // })
        //     .then(res=>{
        //         if (res.data.code === 200){
        //             nav("/auth/login")
        //         }else {
        //             toast.current?.show({severity:'error',summary:t("RegistrationFailed"),detail:res.data.msg})
        //             // alert(t("RegistrationFailed")+res.data.msg)
        //         }
        //     })
    }
    const handleEmailNext = (e:string) => {
        Setuser({...user,email:e})
    }
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
                <h3 className="text-center mt-6 mb-4 font-bold cursor-pointer">{t("ReAccount")}</h3>
                <div>
                    <form className="flex flex-col items-center ">
                        <input onChange={(x) => {
                            handleEmailNext(x.target.value)
                        }} type="text" placeholder={t("Enter") + t("Email")}
                               className="border border-[#8790a2] h-10 w-4/5 mt-2 mb-2 px-2"/>

                        <input onChange={(x) => {
                            Setuser({...user, password: x.target.value})
                        }} type="password" placeholder={t("Enter") + t("Tel")}
                               className="border border-[#8790a2] h-10 w-4/5 mt-2 mb-2 px-2"/>
                        <input onChange={(x) => {
                            Setuser({...user, username: x.target.value})
                        }} type="text" placeholder={t("Enter") + t("Username")}
                               className="border border-[#8790a2] h-10 w-4/5 mt-2 mb-2 px-2"/>

                        <button type={"button"} onClick={handleNext}
                                className="bg-[#f34d01e6] border border-[#8790a2] h-10 w-4/5"><span
                            className="text-white">{t("Confirm")}</span></button>

                    </form>
                </div>
                <div className="text-center mt-4 mb-5 cursor-pointer">
                    <span className="mr-1 hover:text-[#f34d01e6]"><a onClick={login}>{t("RemAccount")}</a></span>
                </div>
                <hr className="border-none h-px ml-auto mr-auto bg-[#c2c7d0] w-4/5"/>
                <div className="flex items-baseline justify-center mt-1 cursor-pointer">
                    <img src="/gitdata.ai-black-redpanda.png" alt="JZFS" className=" w-32"/>
                    {/*<strong className=" text-xl">GitDataAI</strong>*/}
                </div>
                <h3 className="text-center text-xs mb-2 cursor-pointer">{t("Connectivity")}</h3>
                <h3 className="text-center text-xs cursor-pointer">{t("Protection")} <a href="#" className="hover:text-[#f34d01e6]">{t("PrivacyPolicy")}</a>{t("And")}<a href="#" className="hover:text-[#f34d01e6]">{t("Service")}</a></h3>
            </div>
        </>
    );
};

export default FindAccount;