import {   Button, Card, Col, Form, Row } from "react-bootstrap"
import React, { useState } from "react";
import { useRouter } from "../../lib/hooks/router";

const Repolistsnav = () =>{
    const router = useRouter()
    const [fil, setFil] = useState('');
    
    const linkTo =(query:string)=>{
        setFil(query)
        router.push({ pathname: `/repositories/`, query: {fil:query} });
    }
    return(
        <Row className="sidebar">
        <Form className='flex Fast-navb'>
            <Col className="d-flex">
            <strong className="Navtittle">Top Repositories</strong>           
            </Col>
        <Card>
            <Card.Body className="Nav-Card">
                <Button onClick={()=>linkTo('') } className={fil==''?'active':''}>All</Button>
                <Button onClick={()=>linkTo('Public')} className={fil=='Public'?'active':''}>Public</Button>
                <Button onClick={()=>linkTo('Private')} className={fil=='Private'?'active':''}>Private</Button>
            </Card.Body>
        </Card>
        </Form>
        </Row>
    );
  }


export default Repolistsnav