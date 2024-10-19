import React, {useState} from "react";
import Layout from "../../lib/components/layout";
import {auth as Auth, cache,} from "../../lib/api";
import {useRouter} from "../../lib/hooks/router";
import { auth, users } from "../../lib/api/interface";
// import {AiOutlineGithub,AiFillGitlab,AiFillGoogleCircle,AiFillTwitterCircle} from "react-icons/ai";
import "daisyui/dist/full.css"


const LoginForm = () => {
    const [Up,setUp] = useState({
        u: "",
        p: "",
    })
    const [tips,setips] = useState({
        u: "",
        p: "",
    })
    const router = useRouter();
    const { next } = router.query;
    const reghandleclick = (e: { preventDefault: () => void; }) =>{
        e.preventDefault();
        router.push('/register')
    }

    async function Login(){
        try{
            const response = await auth.login({name:Up.u,password:Up.p})
            Auth.clearCurrentUser();
            cache.set('token', response.data.token)
            await users.getUserInfo().then((response)=>{
                cache.set('user', response.data.name)
                router.push(next ? next : '/repositories');
            })
        } catch(err) {
            console.log(err);
        }
    }
    return(
        <div className={"login"}>
            <div className="login-page-header">
                <img src="/jiaozifs.png" alt="JZFS"/><strong>JzConsole</strong>
            </div>
            <div className={"login-window"}>
                <h3>WelCome To JzConsole</h3>
                <h5>Simplicity, Elasticity, Security and Low Cost.</h5>
                <form className={"login-form-input"}>
                    <label>
                        <input onChange={(x)=>{
                            setUp({
                                ...Up,
                                u: x.target.value
                            })
                        }} onBlur={()=>{
                            const lpp = document.getElementById("lpu")!;
                            lpp.classList.remove("input-success");
                            lpp.classList.remove("input-error");

                            if (Up.u === ""){
                                setips({
                                    ...tips,
                                    u: "Please enter your username"
                                })
                                lpp.classList.add("input-error");
                            }else {
                                setips({
                                    ...tips,
                                    u: ""
                                })
                                lpp.classList.add("input-success");
                            }

                        }} id={"lpu"} placeholder={"Username"} className={"input input-bordered w-full max-w-xs"} autoComplete={"current-password"}/>
                        <br/>
                        <span>{tips.u}</span>
                    </label>
                    <label>
                        <input onChange={(x) => {
                            setUp({
                                ...Up,
                                p: x.target.value
                            })

                        }} onBlur={()=>{
                            const lpp = document.getElementById("lpp")!;
                            lpp.classList.remove("input-success");
                            lpp.classList.remove("input-error");

                            if (Up.p === ""){
                                setips({
                                    ...tips,
                                    p: "Please enter your password"
                                })
                                lpp.classList.add("input-error");
                            }else {
                                setips({
                                    ...tips,
                                    p: ""
                                })
                                lpp.classList.add("input-success");
                            }

                        }} id={"lpp"} placeholder={"password"} className={"input input-bordered w-full max-w-xs"}
                               type={"password"} autoComplete={"current-password"}/><br/>
                        <span>{tips.p}</span>
                    </label>

                    <button type={"button"} onClick={Login} className={"btn max-w-xs w-full absolute btn-active btn-accent"}>Login</button>
                    <br/>
                    <br/>
                    <span>or</span>
                    <br/>
                    <button type={"button"} onClick={reghandleclick} className={"btn max-w-xs w-full absolute"}>Apply</button>

                </form>

            </div>
        </div>
    )
}

const LoginPage = () => {
    return (
        <Layout logged={false}>
        <LoginForm/>
        </Layout>
    );
};

export default LoginPage;
