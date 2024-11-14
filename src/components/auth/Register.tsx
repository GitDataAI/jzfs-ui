import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple,FaSlack,FaMicrosoft } from "react-icons/fa";

const Register = () => {
  return (
    <>
    <div className="h-full">
        <div className="flex items-baseline justify-center">
            <img src="/gitdata.ai.png" alt="JZFS" className=" w-8" />
            <strong className=" text-5xl">JzConsole</strong>
        </div>
        <h3 className="text-center mt-6 mb-4 font-bold">注册以继续</h3>
        <div>
            <form className="flex flex-col items-center ">
                <input type="text" placeholder="输入您的电子邮件地址" className="border border-[#8790a2] h-10 h-min w-4/5 mt-2 mb-2"/>
                <button className="bg-[#3767e6] h-10 h-min w-4/5"><span className="text-white">注册</span></button>
                <h3 className="text-center text-[#616c84] mt-6 mb-4">或通过以下方式继续：</h3>
                <button className="border border-[#c2c7d0] h-10 h-min w-4/5 mt-2 mb-2"><FcGoogle className="inline mr-2" size={"2rem"}/>Google</button>
                <button className="border border-[#c2c7d0] h-10 h-min w-4/5 mt-2 mb-2"><FaMicrosoft className="inline mr-2" size={"2rem"}/>Microsoft</button>
                <button className="border border-[#c2c7d0] h-10 h-min w-4/5 mt-2 mb-2"><FaApple className="inline mr-2" size={"2rem"}/>Apple</button>
                <button className="border border-[#c2c7d0] h-10 h-min w-4/5 mt-2 mb-2"><FaSlack className="inline mr-2" size={"2rem"}/>Slack</button>
            </form>
        </div>
            <div className="text-center mt-4 mb-5">
                <span className="mr-1">已有 Atlassian 帐户？登录</span>
            </div>
            <hr className="border-none h-px ml-auto mr-auto bg-[#c2c7d0] w-4/5"/>
            <div className="flex items-baseline justify-center mt-5">
                <img src="/gitdata.ai.png" alt="JZFS" className=" w-4" />
                <strong className=" text-xl">JzConsole</strong>
            </div>
            <h3 className="text-center text-xs mb-2">一个帐户可访问 Jira, Confluence, Trello 以及其他产品。</h3>
            <h3 className="text-center text-xs">此站点受 reCAPTCHA 的保护，且遵循 Google 隐私政策和服务条款。</h3>
        </div>
    </>
  );
};

export default Register;
