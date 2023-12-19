import React, { useState } from "react"
import Layout from "../../lib/components/layout"
import { useRouter } from "../../lib/hooks/router";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { AuthenticationError, auth } from "../../lib/api";
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
            <Col md={{offset: 5, span: 8}} >
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
                            auth.register({username: username.value,password:password.value,email:email.value})
                            setRegisterError(null);
                            router.push(next ? next : '/auth/login');
                        } catch(err) {
                            if (err instanceof AuthenticationError && err.status === 401) {
                                const contents = {__html: `${loginConfig.login_failed_message}` ||
                                    "Credentials don't match."};
                                    setRegisterError(<span dangerouslySetInnerHTML={contents}/>);
                            }
                        }
                    }}>
                        <Form.Group controlId="username" className="mb-3">
                            <Form.Control type="text" placeholder={"Access Key ID"} autoFocus/>
                        </Form.Group>

                        <Form.Group controlId="password" className="mb-3">
                            <Form.Control type="password" placeholder={"Secret Access Key"}/>
                        </Form.Group>

                        <Form.Group controlId="email" className="mb-3">
                            <Form.Control type="email" placeholder={"Secret email"}/>
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