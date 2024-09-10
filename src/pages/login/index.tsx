import React, {useState} from "react";
import Layout from "../../lib/components/layout";
import {Button,Col,Form,Card,Row} from "react-bootstrap";
import {auth as Auth, cache,} from "../../lib/api";
import {AlertError} from "../../lib/components/controls"
import {useRouter} from "../../lib/hooks/router";
import { auth, users } from "../../lib/api/interface/index";
import loginback from "../../../pub/iteamm.png"
import loginback2 from "../../../pub/backdata.png"
// import {AiOutlineGithub,AiFillGitlab,AiFillGoogleCircle,AiFillTwitterCircle} from "react-icons/ai";
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';


const LoginForm = () => {
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();
    const [loginError, setLoginError] = useState<React.ReactElement | null>(null);
    const { next } = router.query;
    const reghandleclick = (e) =>{
        e.preventDefault();
        router.push('/register')
    }
    const loghandleclick = (e) =>{
        e.preventDefault();
        router.push('/login')
    }
    return (
        <Row className="justify-content-center align-items-center gx-0">
              <img src={loginback2} alt="" className="backname22"/>
              <img src={loginback} alt="" className="backname11"/>
            <Col md={{offset: 5, span: 7}} className="login-box" >
            <div className="jiaonamebox">
                <div className="itwrodname">
                <img src="/jiaozifs.png" alt="JiaoziFS" className="JiaoziFS"/><br />
                <strong className="Signtittle">Sign in To JiaoZiFS</strong>
                </div>
            <div className="wordname">In production systems with machine learning components, updates and experiments are frequent. New updates to models(data products) may be released every day or every few minutes, and different users may see the results of different models as part of A/B experiments or canary releases.</div>
            </div>
            <Card className="login-widget jiaozi-login">
                <Card.Header> <a href="" onClick={loghandleclick} className="active">Sign In</a> <a href="#" onClick={reghandleclick}>Create Account</a></Card.Header>
                        <Card.Body>
                        <Form onSubmit={async (e) => {
                             setLoading(true);
                             // 模拟异步操作
                             
                            e.preventDefault()
                            const form = e.target as HTMLFormElement;
                            const username = form.elements.namedItem('username') as HTMLInputElement;
                            const password = form.elements.namedItem('password') as HTMLInputElement;
                            setTimeout(async() => {
                                setLoading(false);
                             
                            if(!username.value)
                            {setLoginError(<span>{'Please input your username'}</span>)}
                               else if(!password.value)
                                {setLoginError(<span>{'Please input your password'}</span>)}
                            else if(password.value.length<8)
                                {setLoginError(<span>{'The password must contain at least 8 characters'}</span>)}
                            else{
                                try {
                                    const response = await auth.login({name:username.value,password:password.value})
                                        Auth.clearCurrentUser()
                                        cache.set('token', response.data.token)
                                        await users.getUserInfo().then((response)=>{
                                            cache.set('user', response.data.name)
                                            setLoginError(null);
                                            router.push(next ? next : '/repositories');
                                        })
                                } catch(err) {
                                    console.log(err);
                                    setLoginError(<span>{'Check your username or password'}</span>)
                                 }                   
                            } 
                        }, 1500);
                        }}>
                            <Form.Group controlId="username" className="mb-3">
                                <strong>Username</strong>
                                <Form.Control type="text" placeholder={"Access username"} autoFocus autoComplete="current-password"/>
                            </Form.Group>

                            <Form.Group controlId="password" className="mb-3">
                                <strong>Password</strong>
                                <Form.Control type="password" placeholder={"Access password"} autoComplete="current-password"/>
                            </Form.Group>
                            {(loginError) && <AlertError error={loginError}/>}

                            <LoadingButton style={{width:'25vw',marginTop:'2.5vh'}} loadingIndicator="Loading…" loading={loading} variant="contained" type="submit">Login</LoadingButton>
                            {/* <div className="waytologin">
                                <p>————Try another way to login————</p>
                                <div className="ways">
                                <div className="item">
                                <a href="#"><AiOutlineGithub /></a>
                                </div>
                                <div className="item">
                                <a href="#"><AiFillGitlab /></a>
                                </div>
                                <div className="item">
                                <a href="#"><AiFillGoogleCircle /></a>
                                </div>
                                <div className="item">
                                <a href="#"><AiFillTwitterCircle /></a>
                                </div>
                                </div>
                            </div> */}
                        </Form>
                    </Card.Body>
            </Card>
            </Col>
        </Row>
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
