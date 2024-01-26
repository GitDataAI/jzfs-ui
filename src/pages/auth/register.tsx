import React, { useState } from "react"
import Layout from "../../lib/components/layout"
import { useRouter } from "../../lib/hooks/router";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { users } from "../../lib/api/interface/index";
import { AlertError } from "../../lib/components/controls";

const RegisterForm = () => {
    const router = useRouter();
    const [RegisterError, setRegisterError] = useState<React.ReactElement | null>(null);
    const { next } = router.query;
    const reghandleclick = (e) =>{
        e.preventDefault();
        router.push('/auth/register')
    }
    const loghandleclick = (e) =>{
        e.preventDefault();
        router.push('/auth/login')
    }
    return(
            <Row className="justify-content-center align-items-center">
            <Col md={{offset: 2, span: 8}} className="login-box" >
            <Card className="login-display">
                    <Card.Body>
                        <div className="tittle">
                            <h1><img src="/pub/logo.png" alt="" /> JiaoziFS</h1>
                            <p><h1>企业级 dataspace 研发管理平台</h1></p>
                        </div>
                    </Card.Body>
            </Card>
            <div className="mobile-display"><img src="/pub/logo192.png" alt="" /><strong>JZFS</strong></div>
            <Card className="login-widget jiaozi-login register">
            <Card.Header> <a href="" onClick={loghandleclick}>Sign In</a> <a href="#" onClick={reghandleclick} className="active">Create Account</a></Card.Header>
                <Card.Body>
                    <Form onSubmit={async (e) => {
                        e.preventDefault()
                        const form = e.target as HTMLFormElement;
                        const username = form.elements.namedItem('username') as HTMLInputElement;
                        const password = form.elements.namedItem('password') as HTMLInputElement;
                        const email = form.elements.namedItem('email') as HTMLInputElement;
                        try {
                            await users.register({name: username.value,password:password.value,email:email.value})
                            setRegisterError(null);
                            router.push(next ? next : '/auth/login');
                        } catch(err) {
                            if(password.value.length<8)
                                    {setRegisterError(<span>{'The password must contain at least 8 characters'}</span>)
                                }else if(!email.value)
                                    {setRegisterError(<span>{'Please input your e-mail'}</span>)}
                        }
                    }}>
                        <Form.Group controlId="username" className="mb-3">
                            <Form.Control type="text" placeholder={"Access username"} autoFocus/>
                        </Form.Group>

                        <Form.Group controlId="password" className="mb-3">
                            <Form.Control type="password" placeholder={"Access password"}/>
                        </Form.Group>

                        <Form.Group controlId="email" className="mb-3">
                            <Form.Control type="email" placeholder={"Access email"}/>
                        </Form.Group>

                        {(!!RegisterError) && <AlertError error={RegisterError}/>}

                        <Button variant="primary" type="submit">Register</Button>
                    </Form>

                   
                </Card.Body>
            </Card>
        </Col>
    </Row>
    )
}

const RegisterPage = ()=>{
    return(
    <Layout logged={false}>
        <RegisterForm />
    </Layout>
    )
}
export default RegisterPage