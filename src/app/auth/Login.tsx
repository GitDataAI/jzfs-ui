import {SubmitHandler, useForm} from "react-hook-form";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {useNavigate} from "react-router-dom";
import {UsersModule} from "../../store/module/UsersModule.tsx";

type Input = {
    name: string,
    password: string,
}
const Login = () => {
    const {
        register,
        handleSubmit,
    } = useForm<Input>()
    const nav = useNavigate();
    const onSubmit: SubmitHandler<Input> = async (data) => {
        try {
            const module = new UsersModule();
            const result = await module.Login(data.name, data.password);
            console.log(result)
            if (result){
                nav("/repo")
                await module.GetUserInfo();
            }else {
                alert("Login Failed")
            }
            module.Save();
        }catch (e) {
            alert(`Error: \`${e}\``)
        }
    }
    const Apply = () => nav("/auth/apply")
    return(
      <>
          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
              <label>Name <InputText autoComplete={"username"} {...register("name")}/></label><br/><br/>
              <label>Password <InputText type={"password"} autoComplete={"current-password"} {...register("password")}/></label><br/><br/>
              <Button type={"submit"}>Login</Button>
              <Button onClick={Apply} type={"button"} text>Apply</Button>
          </form>
      </>
    )
}
export default Login;