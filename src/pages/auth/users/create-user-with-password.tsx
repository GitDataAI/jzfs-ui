import Layout from "../../../lib/components/layout";
import React, {useRef, useState} from "react";
import {Navigate, Route} from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import {auth} from "../../../lib/api";
import {ActionGroup, ActionsBar, AlertError} from "../../../lib/components/controls";
import Button from "react-bootstrap/Button";
import {useRouter} from "../../../lib/hooks/router";

const TOKEN_PARAM_NAME = "token";
const EMAIL_PARAM_NAME = "email";

const CreateUserWithPasswordForm = ({token, email}:{token:string;email:string}) => {
    const router = useRouter();
    const [formValid, setFormValid] = useState<boolean>(false);
    const [pwdConfirmValid, setPwdConfirmValid] = useState<boolean | null>(null);
    const [reqActivateUserError, setReqActivateUserError] = useState<Error | null>(null);
    const newPwdField = useRef<HTMLInputElement>(null);
    const confirmPasswordField = useRef<HTMLInputElement>(null);
    const v1 = newPwdField.current? newPwdField.current.value :  '';
    const v2 = confirmPasswordField.current? confirmPasswordField.current.value : '';

    const onPasswordChange = () => {
        if (v1.length > 0 && v2.length > 0) {
            const isPasswordMatch = v1 === v2;
            setFormValid(isPasswordMatch);
            setPwdConfirmValid(isPasswordMatch);
        } else {
            setPwdConfirmValid(true);
        }
    };
    return (
        <Row>
            <Col md={{offset: 4, span: 4}}>
                <div className="invited-welcome-msg">
                    <div className="title">
                        Welcome to the JaizoiFS!
                    </div>
                    <div className="body">
                        You were invited to use JiaoziFS powered Pando Cloud!
                    </div>
                </div>
                <Card className="create-invited-user-widget">
                    <Card.Header>Activate User</Card.Header>
                    <Card.Body>
                        {/* 改密表单，但是类型“Auth”上不存在属性“updatePasswordByToken”。暂时搁置 */}
                        <Form id='activate-user' onSubmit={async (e) => {
                            e.preventDefault();
                            try {
                                await auth.updatePasswordByToken(token, e.target.password.value, email);
                                setReqActivateUserError(null);
                                router.push("/auth/login");
                            } catch (err) {
                                if(err)setReqActivateUserError(err);
                            }
                        }}>
                            <Form.Group controlId="email">
                                <Form.Control type="text" placeholder={email} disabled={true}/>
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Control type="password" placeholder="Password" ref={newPwdField} onChange={onPasswordChange}/>
                            </Form.Group>

                            <Form.Group controlId="confirmPassword">
                                <Form.Control type="password" placeholder="Confirm Password" ref={confirmPasswordField} onChange={onPasswordChange}/>
                                {pwdConfirmValid === false &&
                                <Form.Text className="text-danger">
                                    Your password and confirmation password do not match.
                                </Form.Text>
                                }
                            </Form.Group>

                            {(!!reqActivateUserError) && <AlertError error={reqActivateUserError}/>}
                        </Form>
                    </Card.Body>
                </Card>
                <ActionsBar>
                    <ActionGroup orientation="right">
                        <Button form='activate-user' type="submit" className="create-user" disabled={!formValid}>Create</Button>
                        <Button className="cancel-create-user" onClick={() => {router.push("/");}}>Cancel</Button>
                    </ActionGroup>
                </ActionsBar>
            </Col>
        </Row>
    );
}


export const ActivateInvitedUserPage = () => {

    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const token = params.get(TOKEN_PARAM_NAME);
    const invitedUserEmail = params.get(EMAIL_PARAM_NAME);

    return (
        <Layout logged={false}>
            {
                token&&invitedUserEmail ?
                    <CreateUserWithPasswordForm token={token} email={invitedUserEmail}/> :
                    <Route element={<Navigate to="/auth/login"/>} />
            }
        </Layout>
    );
};

export default ActivateInvitedUserPage;
