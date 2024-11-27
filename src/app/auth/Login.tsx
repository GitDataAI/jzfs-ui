import React, {ReactElement, useEffect, useRef, useState, useTransition} from "react";
import {Auth_api} from "@/store/useUsers.tsx";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import SearchAccount from "@/app/auth/SearchAccount.tsx";
import { UserApi } from "@/apis"
import {Toast} from "primereact/toast";
import PrivacyPolicy from "../policy/PrivacyPolicy.tsx"
import TermsOfService from "@/app/policy/TermsOfService.tsx";

const Login = () => {
    const [t] = useTranslation("Auth")
    const [inputValue, setInputValue] = useState(''); // 用于存储输入的邮箱或用户名
    const [inputType, setInputType] = useState(''); // 用于存储输入类型，'email' 或 'username'
    const [Oauth,setOauth] = useState<ReactElement<any, any>[]>([]);
    const [user,Setuser] = useState({
        username:"",
        email:"",
        password:""
    })
    const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false); // 控制隐私政策弹窗的状态
    const [isTermsOpen, setIsTermsOpen] = useState(false);
    const n = new UserApi();
    const toast = useRef<Toast>(null)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    const nav = useNavigate();
    useEffect(()=>{
        setOauth([
            // <button className="border border-[#c2c7d0] h-12 w-4/5 mt-2 mb-2"><FcGoogle className="inline mr-2" size={"2rem"}/>Google</button>,
            // <button className="border border-[#c2c7d0] h-12 w-4/5 mt-2 mb-2"><FaApple className="inline mr-2" size={"2rem"}/>Apple</button>,
            // <button className="border border-[#c2c7d0] h-12 w-4/5 mt-2 mb-2"><FaSlack className="inline mr-2" size={"2rem"}/>Slack</button>,
        ])
    },[])
    const LoginEmail = () => {
        n.LoginEmail({
            email:user.email,
            password:user.password
        })
            .then(res=>{
                if (res.data.code === 200){
                    nav("/")
                }else {
                    console.error(res)
                }
            })
    }

    const LoginName = () => {
        n.LoginName({
            username:user.username,
            password:user.password
        })
            .then(res=>{
                if (res.data.code === 200){
                    nav("/")
                }else {
                    console.error(res)
                }
            })
    }
    const Next = () => {
        if (inputType === 'username'){
            LoginName()
        }else if (inputType === 'email'){
            LoginEmail();
        }
        else{
            toast.current?.show({severity:'error',summary:t("Failed"),detail:t("LoginFail")})
        }
    }
    const HandleInputChange = (e:string)  => {
        const value = e
        setInputValue(value); // 更新输入值状态

        // 判断输入值是邮箱还是用户名
        if (emailRegex.test(value)) {
            setInputType('email');
            user.email=value// 设置输入类型为邮箱
        } else if (usernameRegex.test(value)) {
            setInputType('username'); // 设置输入类型为用户名
            user.username=value
        } else {
            setInputType(''); // 未知类型
        }
    }

    const handlePolicyModalOpen = () => {
        setIsPolicyModalOpen(true);
    };

    const handlePolicyModalClose = () => {
        setIsPolicyModalOpen(false);
    };

    const handleTermsOpen = () => {
        setIsTermsOpen(true);
    };

    const handleTermsClose = () => {
        setIsTermsOpen(false);
    };

    const apply = () => {
        nav("/auth/apply")
    }

    const SearchAccount = () =>{
        nav("/auth/SearchAccount")
    }

    return (
        <>
            <Toast ref={toast}/>
            <div className="h-full ">
                <div className="flex items-baseline justify-center cursor-pointer">
                    <img src="/gitdata.ai-black-redpanda.png" alt="JZFS" className=" w-52" />
                    {/*<b className=" text-4xl">GitDataAI</b>*/}
                </div>
                <h3 className="text-center mt-6 mb-4 font-bold cursor-pointer">{t("LoginContinue")}</h3>
                <div>
                    <form className="flex flex-col items-center ">
                        <input onChange={(e)=>{HandleInputChange(e.target.value)}} type="text" placeholder={t("Enter")+t("Username")+'/'+t("Email")} className="border border-[#8790a2] h-10 w-4/5 mt-2 mb-2 px-2"/>
                        <input value={user.password} onChange={(x)=>{Setuser({...user,password:x.target.value})}} type="password" placeholder={t("Enter")+t("Password")} autoComplete={"current-password"} className="border border-[#8790a2] h-10 w-4/5 mt-2 mb-2 px-2"/>
                        <button type={"button"} onClick={Next} className="bg-[#f34d01e6] h-10 w-4/5"><span className="text-white">{(t("Login"))}</span></button>
                        <h3 className="text-center text-[#616c84] mt-6 mb-4 cursor-pointer">{t("OrContinue")}</h3>
                        {
                            Oauth.map((value)=>{
                                return value
                            })
                        }
                    </form>
                </div>
                <div className="text-center mt-4 mb-5 cursor-pointer">
                    <span className="mr-1 hover:text-[#f34d01e6]"><a onClick={SearchAccount}>{t("ForgotPass")}</a> </span>
                    <span className="mr-1">• </span>
                    <span onClick={apply} className="hover:text-[#f34d01e6]">{t("CreateAccount")}</span>
                </div>
                <hr className="border-none h-px ml-auto mr-auto bg-[#c2c7d0] w-4/5"/>
                <div className="flex items-baseline justify-center mt-1 cursor-pointer">
                    <img src="/gitdata.ai-black-redpanda.png" alt="JZFS" className=" w-32" />
                </div>
                <h3 className="text-center text-xs mb-2 cursor-pointer">{t("Connectivity")}</h3>
                <h3 className="text-center text-xs cursor-pointer">{t("Protection")} <a href="#" className="hover:text-[#f34d01e6] " onClick={handlePolicyModalOpen}>{t("PrivacyPolicy")}</a> {t("And")} <a href="#" className="hover:text-[#f34d01e6]" onClick={handleTermsOpen}>{t("Service")}</a></h3>
            </div>
            <PrivacyPolicy isOpen={isPolicyModalOpen} onClose={handlePolicyModalClose} />
            <TermsOfService isOpen={isTermsOpen} onClose={handleTermsClose} />
        </>
    );
};

export default Login;
