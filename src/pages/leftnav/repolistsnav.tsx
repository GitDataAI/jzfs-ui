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
                <Button disabled onClick={()=>linkTo('Sources')} className={fil=='Sources'?'active':''}>Sources</Button>
                <Button disabled onClick={()=>linkTo('Forks')} className={fil=='Forks'?'active':''}>Forks</Button>
                <Button disabled onClick={()=>linkTo('Archived')} className={fil=='Archived'?'active':''}>Archived</Button>
                <Button disabled onClick={()=>linkTo('Mirrors')} className={fil=='Mirrors'?'active':''}>Mirrors</Button>
                <Button disabled onClick={()=>linkTo('Templates')} className={fil=='Templates'?'active':''}>Templates</Button>
            </Card.Body>
        </Card>
        </Form>
        </Row>
    );
  }


export default Repolistsnav