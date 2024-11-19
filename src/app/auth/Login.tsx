import React, {ReactElement, useEffect, useState, useTransition} from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple,FaSlack,FaMicrosoft } from "react-icons/fa";
import useUsers, {Auth_api} from "@/store/useUsers.tsx";
import {useNavigate} from "react-router-dom";

const Login = () => {
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
  return (
    <>
    <div className="h-full">
        <div className="flex items-baseline justify-center">
            <img src="/gitdata.ai.png" alt="JZFS" className=" w-8" />
            <b className=" text-4xl">GitDataAI</b>
        </div>
        <h3 className="text-center mt-6 mb-4 font-bold ">登录以继续</h3>
        <div>
            <form className="flex flex-col items-center ">
                <input onChange={(x)=>{InputEmail(x.target.value)}} type="text" placeholder="输入您的用户名" className="border border-[#8790a2] h-10 w-4/5 mt-2 mb-2 px-2"/>
                {
                    Step==1?(
                        <>
                            <input value={user.password} onChange={(x)=>{Setuser({...user,password:x.target.value})}} type="password" placeholder="输入您的密码" autoComplete={"current-password"} className="border border-[#8790a2] h-10 w-4/5 mt-2 mb-2 px-2"/>
                        </>
                    ):null
                }
                <button type={"button"} onClick={Next} className="bg-[#3767e6] h-10 w-4/5"><span className="text-white">{Step==0?("继续"):("登录")}</span></button>
                <h3 className="text-center text-[#616c84] mt-6 mb-4">或通过以下方式继续：</h3>
                {
                    Oauth.map((value)=>{
                        return value
                    })
                }
            </form>
        </div>
        <div className="text-center mt-4 mb-5">
            <span className="mr-1">无法登录？</span>
            <span className="mr-1">• </span>
            <span onClick={apply}>创建帐户</span>
        </div>
        <hr className="border-none h-px ml-auto mr-auto bg-[#c2c7d0] w-4/5"/>
        <div className="flex items-baseline justify-center mt-5">
            <img src="/gitdata.ai.png" alt="JZFS" className=" w-4" />
            <strong className=" text-xl">GitDataAI | Cloud</strong>
        </div>
        <h3 className="text-center text-xs">一个帐户可访问 GitData, JZFS, JZFlow 以及其他产品。</h3>
        </div>
    </>
  );
};

export default Login;
