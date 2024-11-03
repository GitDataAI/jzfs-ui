import {SubmitHandler, useForm} from "react-hook-form";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {useNavigate} from "react-router-dom";
import UseStore from "../../store/useStore.tsx";

type Input = {
    name: string,
    password: string,
    email: string
}
const Apply = () => {
    const {
        register,
        handleSubmit,
    } = useForm<Input>()
    const nav = useNavigate();
    const onSubmit: SubmitHandler<Input> = async (data) => {
        try {
            const store = await new UseStore().get();
            const result = await store.user_model.Apply(data.name,data.password,data.email);
            if (result){
                alert("Apply Successful")
                nav("/auth/login")
            }else {
                alert("Apply Failed")
            }
        }catch (e){
            alert(`Error: \`${e}\``)
        }
    }
    const Apply = () => nav("/auth/login")
    return(
        <>
            <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                <label>Name <InputText {...register("name")}/></label><br/><br/>
                <label>Password <InputText type={"password"} autoComplete={"current-password"} {...register("password")}/></label><br/><br/>
                <label>Email <InputText type={"email"} autoComplete={"email"} {...register("email")}/></label><br/><br/>
                <Button type={"submit"}>Apply</Button>
                <Button onClick={Apply} type={"button"} text>Login</Button>
            </form>
        </>
    )
}
export default Apply;