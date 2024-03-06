import { FeedPersonIcon } from "@primer/octicons-react";
import {   Form, NavDropdown, Row } from "react-bootstrap"
import React from "react";
import { auth, cache } from "../../../../lib/api";
import { NavTree } from "./tree";


const Branchsnav = () =>{
    
    const NavUserInfo = () => {
        const user = cache.get("user")
        const logoutUrl = "/login"
    
    
        const NavBarTitle = () => {
            return (
            <>
                {/* {<div className="user-menu-notification-indicator"></div>} */}
                <FeedPersonIcon size={28} verticalAlign={"middle"} /> <strong >{user} </strong>
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
            </NavDropdown>
        );
    };
    
    return(
        <Row className="sidebar">
        <Form className='flex Fast-navb'>
        <NavUserInfo />    
        <NavTree></NavTree>  
        </Form>
        </Row>
    );
  }

  
export default Branchsnav