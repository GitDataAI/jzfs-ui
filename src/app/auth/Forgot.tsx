import React, {ReactElement, useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Auth_api} from "@/store/useUsers.tsx";
import {useTranslation} from "react-i18next";
import {Toast} from "primereact/toast";
import {use} from "i18next";

// 定义接口
interface EmailPayload {
    to: string;
    subject: string;
    text: string;
}

interface EmailResponse {
    success: boolean;
    message: string;
}

const Forgot =()=>{
    const [t] = useTranslation("Auth")
    const [user,Setuser] = useState({
        email:"",
        password:"",
        passwordE:"",
        username: "",
        code: ""
    })
    const nav = useNavigate();
    const toast = useRef<Toast>(null)
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { email } = useParams<{ email: string }>();

    const handleNext = () => {
        Auth_api.updatePassword({
            email:email,
            password: user.password
        })
            .then(res=>{
                if (res.data.code === 200){
                    nav("/auth/login")
                }else {
                    toast.current?.show({severity:'error',summary:t("Failed"),detail:res.data.msg})
                    // alert(t("RegistrationFailed")+res.data.msg)
                }
            })
    }

    const handleCheckEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // 阻止表单默认提交行为
        // 执行邮箱存在性检查的逻辑...
    };

    const sendEmail = async () => {
        setSending(true);
        setError(null);

        try {
            const response = await fetch('http://your-backend.com/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: user.email, // 收件人邮箱
                    subject: 'Hello from React!', // 邮件主题
                    text: 'This is a test email from a React app.', // 邮件正文
                } as EmailPayload),
            });

            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}`);

            }

            const data: EmailResponse = await response.json();
            if (data.success) {
                toast.current?.show({severity:'success',summary:t("Success"),detail:t("Send")+t('Success')})
                setSent(true);
            } else {
                toast.current?.show({severity:'error',summary:t("Fail"),detail:t("Send")+t("Fail")})
                setError(data.message);
            }
        } catch (error: any) {
            setError(error.message);
        } finally {
            setSending(false);
        }
    };
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
                    <img src="/gitdata.ai-black-redpanda.png" alt="JZFS" className=" w-52" />
                    {/*<b className=" text-4xl">GitDataAI</b>*/}
                </div>
                <h3 className="text-center mt-6 mb-4 font-bold cursor-pointer">{t("ResetPass")}</h3>
                <div>
                    <form className="flex flex-col items-center " onSubmit={handleCheckEmail}>
                        <input onChange={(e)=>{
                            handleEmailNext(e.target.value)
                        }} type="email" value={user.email} placeholder={t("Enter")+t("Email")}  className="border border-[#8790a2] h-10 w-4/5 mt-2 mb-2 px-2"/>
                        <button type={"button"} onClick={sendEmail} className="bg-[#f34d01e6] border border-[#8790a2] h-10 w-4/5"><span className="text-white">{t("Send")+t('Email')}</span></button>
                    </form>
                </div>
                <div className="text-center mt-4 mb-5 cursor-pointer">
                    <span className="mr-1 hover:text-[#f34d01e6]"><a onClick={login}>{t("RemAccount")}</a></span>
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
}

export default Forgot;