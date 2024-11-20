import React, {ReactElement, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Auth_api} from "@/store/useUsers.tsx";
import Login from "@/app/auth/Login.tsx";

const Register = () => {
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
    const [Time,setTime] = useState("获取验证码")
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
                        alert("发送成功")
                        setisCountDown(true)
                    }else {
                        alert("发送失败:"+res.data.msg)
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
                    alert("验证码错误")
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
                    alert("注册失败:"+res.data.msg)
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
            <b className=" text-4xl">GitData</b>
        </div>
        <h3 className="text-center mt-6 mb-4 font-bold">注册以继续</h3>
        <div>
            <form className="flex flex-col items-center ">
                <input onChange={(x)=>{
                    handleEmailNext(x.target.value)
                }} type="text" placeholder="输入您的电子邮件地址" className="border border-[#8790a2] h-12 w-4/5 px-2 mt-2 mb-2"/>
                {
                    (Step===1 || Step === 2)?(
                        <div className="flex items-center h-12 w-4/5 mt-2 mb-2 showDiv ">
                            <input onChange={(e)=>InputCode(e.target.value)} type="text" placeholder="输入验证码" className="border border-[#8790a2] h-12 w-3/5 px-2 mt-2 mb-2"/>
                            <button onClick={handleSend} type={"button"} className="bg-[#3767e6] h-12 w-2/5"><span className="text-white">{
                                isCountDown ?(<>
                                    {CountDown}
                                </>):(<>
                                    发送验证码
                                </>)
                            }</span></button>
                        </div>
                    ):null
                }
                {
                    Step===2?(
                        <>
                            <input onChange={(x)=>{Setuser({...user,password:x.target.value})}} type="password" placeholder="请输入密码" className="border border-[#8790a2] h-12 w-4/5 px-2 mt-2 mb-2 showDiv"/>
                            <input onChange={(x)=>{Setuser({...user,passwordE:x.target.value})}} type="password" placeholder="请确认密码" className="border border-[#8790a2] h-12 w-4/5 px-2 mt-2 mb-2 showDiv"/>
                            <input onChange={(x)=>{Setuser({...user,username:x.target.value})}} type="text" placeholder="请输入用户名" className="border border-[#8790a2] h-12 w-4/5 px-2 mt-2 mb-2 showDiv"/>
                        </>
                    ):null
                }

                <button type={"button"} onClick={handleNext} className="bg-[#3767e6] h-12 w-4/5"><span className="text-white">注册</span></button>

                <h3 className="text-center text-[#616c84] mt-6 mb-4">或通过以下方式继续：</h3>
                {
                    Oauth.map((item)=>{
                        return item
                    })
                }
            </form>
        </div>
            <div className="text-center mt-4 mb-5">
                <span className="mr-1">已有 GitData.ai 帐户？<a onClick={login}>登录</a></span>
            </div>
            <hr className="border-none h-px ml-auto mr-auto bg-[#c2c7d0] w-4/5"/>
            <div className="flex items-baseline justify-center mt-5">
                <img src="/gitdata.ai.png" alt="JZFS" className=" w-4" />
                <strong className=" text-xl">GitData | Cloud</strong>
            </div>
            <h3 className="text-center text-xs mb-2">一个帐户可访问 GitData, JZFS, JZFlow 以及其他产品。</h3>
            <h3 className="text-center text-xs">此站点受 Cloudflare 的保护，且遵循 Google 隐私政策和服务条款。</h3>
        </div>
    </>
  );
};

export default Register;
