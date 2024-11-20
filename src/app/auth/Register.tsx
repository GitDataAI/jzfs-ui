import React, {ReactElement, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Auth_api} from "@/store/useUsers.tsx";
import Login from "@/app/auth/Login.tsx";
import {useTranslation} from "react-i18next";

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
    useEffect(()=>{
        setOauth([
            // <button className="border border-[#c2c7d0] h-12 w-4/5 mt-2 mb-2"><FcGoogle className="inline mr-2" size={"2rem"}/>Google</button>,
            // <button className="border border-[#c2c7d0] h-12 w-4/5 mt-2 mb-2"><FaApple className="inline mr-2" size={"2rem"}/>Apple</button>,
            // <button className="border border-[#c2c7d0] h-12 w-4/5 mt-2 mb-2"><FaSlack className="inline mr-2" size={"2rem"}/>Slack</button>,
        ])
    },[])
    const handleSend = () => {
        if(!isCountDown ){
            Auth_api.send(user.email)
                .then(res=>{
                    if (res.data.code === 200){
                        alert(t("Send")+t("Success"))
                        setisCountDown(true)
                    }else {
                        alert(t("Send")+t("Fail")+res.data.msg)
                    }
                })
        }
    }

    const validate = (code:string) => {
        Auth_api.verification(code)
            .then(res=>{
                if (res.data.code === 200){
                    setStep(2)
                }else {
                    alert(t("CaptchaError"))
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
        Auth_api.register({
            email:user.email,
            password:user.password,
            username:user.username
        })
            .then(res=>{
                if (res.data.code === 200){
                    nav("/auth/login")
                }else {
                    alert(t("RegistrationFailed")+res.data.msg)
                }
            })
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
                    return () =>{
                        clearTimeout(timer)
                    }
                }
            }, 1000)
        }
    }, [isCountDown,CountDown]);
    const login = () => {
        nav("/auth/login")
    }
  return (
    <>
    <div className="h-full">
        <div className="flex items-baseline justify-center">
            <img src="/gitdata.ai.png" alt="JZFS" className=" w-8" />
            <b className=" text-4xl">GitDataAI</b>
        </div>
        <h3 className="text-center mt-6 mb-4 font-bold">{t("RegisterContinue")}</h3>
        <div>
            <form className="flex flex-col items-center ">
                <input onChange={(x)=>{
                    handleEmailNext(x.target.value)
                }} type="text" placeholder={t("Enter")+t("Email")} className="border border-[#8790a2] h-10 w-4/5 mt-2 mb-2 px-2"/>
                {
                    (Step===1 || Step === 2)?(
                        <div className="flex items-center h-12 w-4/5 mt-2 mb-2 showDiv ">
                            <input onChange={(e)=>InputCode(e.target.value)} type="text" placeholder={t("Enter")+t("Captcha")} className="border border-[#8790a2] h-10 w-4/5 mt-2 mb-2 px-2"/>
                            <button onClick={handleSend} type={"button"} className="bg-[#3767e6] border border-[#8790a2] h-10 w-3/5 mt-2 mb-2 px-2"><span className="text-white">{
                                isCountDown ?(<>
                                    {CountDown}
                                </>):(<>
                                    {t("Send")+t("Captcha")}
                                </>)
                            }</span></button>
                        </div>
                    ):null
                }
                {
                    Step===2?(
                        <>
                            <input onChange={(x)=>{Setuser({...user,password:x.target.value})}} type="password" placeholder={t("Enter")+t("Password")} className="border border-[#8790a2] h-10 w-4/5 mt-2 mb-2 px-2 showDiv"/>
                            <input onChange={(x)=>{Setuser({...user,passwordE:x.target.value})}} type="password" placeholder={t("Confirm")} className="border border-[#8790a2] h-10 w-4/5 mt-2 mb-2 showDiv"/>
                            <input onChange={(x)=>{Setuser({...user,username:x.target.value})}} type="text" placeholder={t("Enter")+t("Username")} className="border border-[#8790a2] h-10 w-4/5 mt-2 mb-2 px-2 showDiv"/>
                        </>
                    ):null
                }

                <button type={"button"} onClick={handleNext} className="bg-[#3767e6] border border-[#8790a2] h-10 w-4/5 mt-2 mb-2 px-2"><span className="text-white">{t("Register")}</span></button>

                <h3 className="text-center text-[#616c84] mt-6 mb-4">{t("OrContinue")}</h3>
                {
                    Oauth.map((item)=>{
                        return item
                    })
                }
            </form>
        </div>
            <div className="text-center mt-4 mb-5">
                <span className="mr-1">{t("HaveAccount")}<a onClick={login}>{t("Login")}</a></span>
            </div>
            <hr className="border-none h-px ml-auto mr-auto bg-[#c2c7d0] w-4/5"/>
            <div className="flex items-baseline justify-center mt-5">
                <img src="/gitdata.ai.png" alt="JZFS" className=" w-4" />
                <strong className=" text-xl">GitDataAI | Cloud</strong>
            </div>
            <h3 className="text-center text-xs mb-2">{t("Connectivity")}</h3>
            <h3 className="text-center text-xs">{t("Protection")}</h3>
        </div>
    </>
  );
};

export default Register;
