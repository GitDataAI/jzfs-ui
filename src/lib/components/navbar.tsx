import React from "react";
import {auth, cache} from "../api";
import {useRouter} from "../hooks/router";
import {Link} from "./nav";
import {Navbar, Nav, NavDropdown} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {FeedPersonIcon} from "@primer/octicons-react";
import { TopNavLinkProps } from "./interface/comp_interface";
import './style/index.scss'


const NavUserInfo = () => {
    const user = cache.get("user")
    const logoutUrl = "/auth/login"


    const NavBarTitle = () => {
        return (
        <>
            {<div className="user-menu-notification-indicator"></div>}
            <FeedPersonIcon size={28} verticalAlign={"middle"}/>
        </>
        )
    }
    return (
        <NavDropdown title={<NavBarTitle />} className="navbar-username" align="end">
            <NavDropdown.Item
                onClick={async()=> {
                    auth.clearCurrentUser();
                    window.location = logoutUrl;
                    await auth.logout();
                }}>
                Logout
            </NavDropdown.Item>
            <NavDropdown.Divider/>
            {<>
            <NavDropdown.Item disabled={true}>
                <small>JiaoziFS</small>
            </NavDropdown.Item></>}
        </NavDropdown>
    );
};

const TopNavLink: React.FC<TopNavLinkProps> = ({ href, children }) => {
    const router = useRouter();
    const isActive = (prefix:string) => router.route.indexOf(prefix) === 0;
    
    return (
        <Link component={Nav.Link} active={isActive(href)} href={href}>
            {children}
        </Link>
    );
};

const TopNav = ({logged = true}) => {
    if (!logged) {
        return (
            <Navbar variant="dark" expand="md">
            <Container fluid={true}>
            {/* <div className="jiaozi-nav">
                <a href=""><img style={{width:"30px"}} src="/pub/logo192.png" /></a>
                </div> */}
            {/* <div className="jiaozi-btncol">
                <Button><div className="jiaozi-btndiv" ><AiFillRedditSquare /><span>Discord</span></div></Button>
                <Button><div className="jiaozi-btndiv"><AiFillGithub /><span><AiOutlineStar /> 15.9k</span></div></Button>
                <Button><span style={{ backgroundColor : "#f1f3f8"}}> <a href="/127.0.0.1.3000/auth" target="_blank">Sign in <br /> &nbsp;</a></span></Button>                
                </div> */}
            </Container>
            </Navbar>
        );
    }
    return (
        <Navbar variant="dark" bg="dark" expand="md">
            <Container fluid={true}>
                <Link component={Navbar.Brand} href="/">
                    <img src="/jiaozifs3.png" alt="JiaoziFS" className="logo"/>
                </Link>

                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">

                    <Nav className="me-auto my-2 my-lg-0"
                         style={{ maxHeight: '100px' }}
                         navbarScroll>
                        <TopNavLink href="/repositories">Repositories</TopNavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default TopNav;
