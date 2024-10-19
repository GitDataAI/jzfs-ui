import React, { useState } from "react"
import Layout from "../../lib/components/layout"
import { useRouter } from "../../lib/hooks/router";
import {users} from "../../lib/api/interface";
import "daisyui/dist/full.css"



const RegisterForms = () => {
    const [Up,setUp] = useState({
        u: "",
        p: "",
        e: ""
    })
    const [tips,setips] = useState({
        u: "",
        p: "",
        e: ""
    })
    const router = useRouter();
    const { next } = router.query;
    const loghandleclick = (e: { preventDefault: () => void; }) =>{
        e.preventDefault();
        router.push('/login')
    }

    async function Register(){
        try {
            await users.register({name: Up.u,password:Up.p,email:Up.e})
            router.push(next ? next : '/login');
        } catch(err) {
            console.log(err)
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

                            if (Up.p.length < 8){
                                setips({
                                    ...tips,
                                    p: "The password must contain at least 8 characters"
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

                    <label>
                        <input onChange={(x) => {
                            setUp({
                                ...Up,
                                e: x.target.value
                            })

                        }} onBlur={()=>{
                            const lpp = document.getElementById("lpe")!;
                            lpp.classList.remove("input-success");
                            lpp.classList.remove("input-error");

                            if (Up.e === ""){
                                setips({
                                    ...tips,
                                    e: "Please enter your email"
                                })
                                lpp.classList.add("input-error");
                            }else {
                                setips({
                                    ...tips,
                                    e: ""
                                })
                                lpp.classList.add("input-success");
                            }

                        }} id={"lpe"} placeholder={"email"} className={"input input-bordered w-full max-w-xs"}
                               type={"email"} autoComplete={"email"}/><br/>
                        <span>{tips.e}</span>
                    </label>


                    <button type={"button"} onClick={Register} className={"btn max-w-xs w-full absolute btn-active btn-accent"}>Apply</button>
                    <br/>
                    <br/>
                    <span>or</span>
                    <br/>
                    <button type={"button"} onClick={loghandleclick} className={"btn max-w-xs w-full absolute"}>Login</button>

                </form>

            </div>
        </div>
    )
}
const RegisterPage = ()=>{
    return(
    <Layout logged={false}>
        <RegisterForms />
    </Layout>
    )
}
export default RegisterPage