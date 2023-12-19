import React, {useState} from "react";
import Layout from "../../lib/components/layout";
import {Button,Col,Form,Card,Row} from "react-bootstrap";
import {auth, AuthenticationError, setup, SETUP_STATE_INITIALIZED} from "../../lib/api";
import {AlertError} from "../../lib/components/controls"
import {useRouter} from "../../lib/hooks/router";
import {useAPI} from "../../lib/hooks/api";

interface LoginConfig {
    login_url: string;
    login_failed_message?: string;
    fallback_login_url?: Location | (string & Location);
    fallback_login_label?: string;
    login_cookie_names: string[];
    logout_url: Location | (string & Location);
}

const LoginForm = ({loginConfig}: {loginConfig: LoginConfig}) => {
    const router = useRouter();
    const [loginError, setLoginError] = useState<React.ReactElement | null>(null);
    const { next } = router.query;
    const reghandleclick = (e) =>{
        e.preventDefault();
        router.push('/auth/register')
    }
    const loghandleclick = (e) =>{
        e.preventDefault();
        router.push('/auth/login')
    }
    return (
        <Row className="justify-content-center align-items-center">
            <Col md={{offset: 5, span: 8}} >
                <Card className="login-widget jiaozi-login">
                <Card.Header> <a href="" onClick={loghandleclick} className="active">Sign In</a> <a href="#" onClick={reghandleclick}>Create Account</a></Card.Header>
                        <Card.Body>
                        <Form onSubmit={async (e) => {
                            e.preventDefault()
                            const form = e.target as HTMLFormElement;
                            const username = form.elements.namedItem('username') as HTMLInputElement;
                            const password = form.elements.namedItem('password') as HTMLInputElement;
                            try {
                                const response =  auth.login(username.value, password.value)
                                setLoginError(null);
                                console.log(response);
                                router.push(next ? next : '/repositories');
                            } catch(err) {
                                if (err instanceof AuthenticationError && err.status === 401) {
                                    const contents = {__html: `${loginConfig.login_failed_message}` ||
                                        "Credentials don't match."};
                                    setLoginError(<span dangerouslySetInnerHTML={contents}/>);
                                }
                            }
                        }}>
                            <Form.Group controlId="username" className="mb-3">
                                <Form.Control type="text" placeholder={"Access Key ID"} autoFocus/>
                            </Form.Group>

                            <Form.Group controlId="password" className="mb-3">
                                <Form.Control type="password" placeholder={"Secret Access Key"}/>
                            </Form.Group>

                            {(!!loginError) && <AlertError error={loginError}/>}

                            <Button variant="primary" type="submit">Login</Button>
                        </Form>
                        <div className={"mt-2 mb-1"}>
                            { loginConfig.fallback_login_url ?
                                <Button variant="link" className="text-secondary mt-2" onClick={async ()=> {
                                    loginConfig.login_cookie_names?.forEach(
                                        cookie => {
                                            document.cookie = `${cookie}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
                                        }
                                    );
                        if (loginConfig.fallback_login_url) 
                        {
                            window.location = loginConfig.fallback_login_url;
                        }                                }}>
                        {loginConfig.fallback_login_label || 'Try another way to login'}
                            </Button>
                                : ""
                            }
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}


const LoginPage = () => {
    const router = useRouter();
    const { response, error, loading } = useAPI(() => setup.getState());
    if (loading) {
        return null;
    }

    // if we are not initialized, or we are not done with comm prefs, redirect to 'setup' page
    if (!error && response && (response.state !== SETUP_STATE_INITIALIZED || response.comm_prefs_missing === true)) {
        router.push({pathname: '/setup', query: router.query,params:{}})
        return null;
    }
    const loginConfig = response?.login_config;
    if (router.query.redirected)  {
        if(!error && loginConfig?.login_url) {
            window.location = loginConfig.login_url;
            return null;
        }
        delete router.query.redirected;

        router.push({pathname: '/auth/login', query: router.query})
    }
    return (
        <Layout logged={false}>
            <LoginForm loginConfig={loginConfig}/>
        </Layout>
    );
};

export default LoginPage;
