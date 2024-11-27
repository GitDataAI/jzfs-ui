import React, {ReactElement, useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Auth_api} from "@/store/useUsers.tsx";
import Login from "@/app/auth/Login.tsx";
import {useTranslation} from "react-i18next";
import {Toast} from "primereact/toast";
import {EmailApi, UserApi} from "jzfs-ts-api/src";

const Register = () => {
    const [t] = useTranslation("Auth")
    const [Step,setStep] = useState(0)
    const [CountDown,setCountDown] = useState(60)
    const [isCountDown,setisCountDown] = useState(false)
    const [Oauth,setOauth] = useState<ReactElement<any, any>[]>([]);
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
    const n = new UserApi();
    const e = new EmailApi();
    useEffect(()=>{
        setOauth([
            // <button className="border border-[#c2c7d0] h-12 w-4/5 mt-2 mb-2"><FcGoogle className="inline mr-2" size={"2rem"}/>Google</button>,
            // <button className="border border-[#c2c7d0] h-12 w-4/5 mt-2 mb-2"><FaApple className="inline mr-2" size={"2rem"}/>Apple</button>,
            // <button className="border border-[#c2c7d0] h-12 w-4/5 mt-2 mb-2"><FaSlack className="inline mr-2" size={"2rem"}/>Slack</button>,
        ])
    },[])
    const handleSend = () => {
        if(!isCountDown ){
            e.SendCaptcha({
                email:user.email
            })
                .then(res=>{
                    if (res.data.code === 200){
                        toast.current?.show({severity:'success',summary:t("Success"),detail:t("Send")+t('Success')})
                        setisCountDown(true)
                    }else {
                        toast.current?.show({severity:'error',summary:t("Fail"),detail:t("Send")+t("Fail")})
                    }
                })
        }
    }

    const validate = (code:string) => {
        e.CheckCaptcha({
            email: user.email,
            code: code
        })
            .then(res=>{
                if (res.data.code === 200){
                    setStep(2)
                }else {
                    toast.current?.show({severity:'error',summary:t("Fail"),detail:t("CaptchaError")})
                }
            })
    }
      const InputCode = (code: string) => {
        Setuser({...user,code:code})
        if (code.length === 6){
            validate(code);
        }
    }
    const handleNext = () => {
        if(user.password ===user.passwordE){
            n.Apply({
                email:user.email,
                password:user.password,
                username:user.username
            })
                .then(res=>{
                    if (res.data.code === 200){
                        nav("/auth/login")
                    }else {
                        toast.current?.show({severity:'error',summary:t("RegistrationFailed"),detail:res.data.msg})
                    }
                })
        }else{
            toast.current?.show({severity:'error',summary:t("Failed"),detail:t("InvalidConfirmPass")})
        }
    }
    const handleEmailNext = (e:string) => {
        Setuser({...user,email:e})
        if (Step === 0){
            setStep(1)
        }
    }
    useEffect(() => {
        if (isCountDown){
            const timer = setTimeout(() => {
                setCountDown(CountDown - 1)
                if(CountDown == 0){
                    setisCountDown(false)
                }
            }, 1000)
            return () =>{
                clearTimeout(timer)
            }

        }
        setCountDown(60)
    }, [isCountDown,CountDown]);
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
            <h3 className="text-center mt-6 mb-4 font-bold cursor-pointer">{t("RegisterContinue")}</h3>
            <div>
                <form className="flex flex-col items-center ">
                    <input onChange={(x) => {
                        handleEmailNext(x.target.value)
                    }} type="text" placeholder={t("Enter") + t("Email")}
                           className="border border-[#8790a2] h-10 w-4/5 mt-2 mb-2 px-2"/>
                    {
                        (Step === 1 || Step === 2) ? (
                            <div className="flex items-center h-12 w-4/5 mt-2 mb-2 showDiv ">
                                <input onChange={(e) => InputCode(e.target.value)} type="text"
                                       placeholder={t("Enter") + t("Captcha")}
                                       className="border border-[#8790a2] h-10 w-4/5 mt-2 mb-2 px-2"/>
                                <button onClick={handleSend} type={"button"}
                                        className="bg-[#f34d01e6] border border-[#8790a2] h-10 w-3/5 mt-2 mb-2 px-2"><span
                                    className="text-white">{
                                    isCountDown ? (<>
                                        {CountDown}
                                    </>) : (<>
                                        {t("Send") + t("Captcha")}
                                    </>)
                                }</span></button>
                            </div>
                        ) : null
                    }
                    {
                        Step === 2 ? (
                            <>
                                <input onChange={(x) => {
                                    Setuser({...user, password: x.target.value})
                                }} type="password" placeholder={t("Enter") + t("Password")}
                                       className="border border-[#8790a2] h-10 w-4/5 mt-2 mb-2 px-2 showDiv"/>
                                <input onChange={(x) => {
                                    Setuser({...user, passwordE: x.target.value})
                                }} type="password" placeholder={t("ConfirmP")}
                                       className="border border-[#8790a2] h-10 w-4/5 mt-2 mb-2 px-2 showDiv"/>
                                <input onChange={(x) => {
                                    Setuser({...user, username: x.target.value})
                                }} type="text" placeholder={t("Enter") + t("Username")}
                                       className="border border-[#8790a2] h-10 w-4/5 mt-2 mb-2 px-2 showDiv"/>
                            </>
                        ) : null
                    }

                    <button type={"button"} onClick={()=>{
                        if (Step === 2) {
                            handleNext()
                        }
                    }}
                            className="bg-[#f34d01e6] border border-[#8790a2] h-10 w-4/5"><span
                        className="text-white">{t("Register")}</span></button>

                    <h3 className="text-center text-[#616c84] mt-6 mb-4 cursor-pointer">{t("OrContinue")}</h3>
                    {
                        Oauth.map((item) => {
                            return item
                        })
                    }
                </form>
            </div>
            <div className="text-center mt-4 mb-5 cursor-pointer">
                <span className="mr-1"><a onClick={login}
                                          className="hover:text-[#f34d01e6]">{t("HaveAccount")}{t("Login")}</a></span>
            </div>
            <hr className="border-none h-px ml-auto mr-auto bg-[#c2c7d0] w-4/5"/>
            <div className="flex items-baseline justify-center mt-1 cursor-pointer">
                <img src="/gitdata.ai-black-redpanda.png" alt="JZFS" className=" w-32"/>
                {/*<strong className=" text-xl">GitDataAI</strong>*/}
            </div>
            <h3 className="text-center text-xs mb-2 cursor-pointer">{t("Connectivity")}</h3>
            <h3 className="text-center text-xs cursor-pointer">{t("Protection")} <a href="#" className="hover:text-[#f34d01e6]">{t("PrivacyPolicy")} </a>{t("And")} <a href="#" className="hover:text-[#f34d01e6]">{t("Service")}</a></h3>
        </div>
    </>
  );
};

export default Register;
