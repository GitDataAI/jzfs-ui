import React, {ReactElement, useEffect, useState, useTransition} from "react";
import {Auth_api} from "@/store/useUsers.tsx";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";


const Login = () => {
    const [t] = useTranslation("Auth")
    const [Step,setStep] = useState(0)
    const [Oauth,setOauth] = useState<ReactElement<any, any>[]>([]);
    const [user,Setuser] = useState({
        email:"",
        password:""
    })
    const nav = useNavigate();
    useEffect(()=>{
        setOauth([
            // <button className="border border-[#c2c7d0] h-12 w-4/5 mt-2 mb-2"><FcGoogle className="inline mr-2" size={"2rem"}/>Google</button>,
            // <button className="border border-[#c2c7d0] h-12 w-4/5 mt-2 mb-2"><FaApple className="inline mr-2" size={"2rem"}/>Apple</button>,
            // <button className="border border-[#c2c7d0] h-12 w-4/5 mt-2 mb-2"><FaSlack className="inline mr-2" size={"2rem"}/>Slack</button>,
        ])
    },[])
    const Login = () => {
           Auth_api.login({
               username:user.email,
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
        if (Step === 0){
            setStep(Step+1)
        }else if (Step === 1){
            Login();
        }
    }
    const InputEmail = (e: string) => {
        Setuser({...user,email:e})
        if (Step === 1){
            setStep(0)
            Setuser({...user,password:""})
        }
    }
    const apply = () => {
        nav("/auth/apply")
    }

    const forgot = () =>{
        nav("/auth/forgot")
    }

  return (
    <>
    <div className="h-full ">
        <div className="flex items-baseline justify-center cursor-pointer">
            <img src="/gitdata.ai-black-redpanda.png" alt="JZFS" className=" w-52" />
            {/*<b className=" text-4xl">GitDataAI</b>*/}
        </div>
        <h3 className="text-center mt-6 mb-4 font-bold cursor-pointer">{t("LoginContinue")}</h3>
        <div>
            <form className="flex flex-col items-center ">
                <input onChange={(x)=>{InputEmail(x.target.value)}} type="text" placeholder={t("Enter")+t("Username")+'/'+t("Email")} className="border border-[#8790a2] h-10 w-4/5 mt-2 mb-2 px-2"/>
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
            <span className="mr-1 hover:text-[#f34d01e6]"><a onClick={forgot}>{t("ForgotPass")}</a> </span>
            <span className="mr-1">• </span>
            <span onClick={apply} className="hover:text-[#f34d01e6]">{t("CreateAccount")}</span>
        </div>
        <hr className="border-none h-px ml-auto mr-auto bg-[#c2c7d0] w-4/5"/>
        <div className="flex items-baseline justify-center mt-1 cursor-pointer">
            <img src="/gitdata.ai-black-redpanda.png" alt="JZFS" className=" w-32" />
            {/*<strong className=" text-xl">GitDataAI</strong>*/}
        </div>
        <h3 className="text-center text-xs mb-2 cursor-pointer">{t("Connectivity")}</h3>
        <h3 className="text-center text-xs cursor-pointer">{t("Protection")}<a href="#" className="hover:text-[#f34d01e6]">{t("PrivacyPolicy")}</a>{t("And")}<a href="#" className="hover:text-[#f34d01e6]">{t("Service")}</a></h3>
        </div>
    </>
  );
};

export default Login;
