import {   Col, Form, Row } from "react-bootstrap"
import { cache} from "../../lib/api";
import React, { useState } from "react";
import { useRouter } from "../../lib/hooks/router";
import { useAPIWithPagination } from "../../lib/hooks/api";
import { users } from "../../lib/api/interface/index";
import { AlertError, Loading } from "../../lib/components/controls";
import {Link} from "../../lib/components/nav";
import { Repository } from "../../lib/api/interface/Api";
const RepositoryList = ({refresh}:{refresh:boolean}) => {
    const router = useRouter()
    const user = cache.get('user')
    if(user){
    const {results, loading, error} = useAPIWithPagination( async() => {
            return  await users.listRepository(user)
 
    }, [refresh]);
    if (loading) return <Loading/>;
    if (error) { 
        return <AlertError error={error}/>;}
        if(results){
            return (
                <div>
                    {
                        results.map((repo:Repository)=>{
                            return(
                        <Row key={repo.id}>
                            <Col style={{marginLeft:"22px"}}>
                                            <Link href={{
                                                pathname: `/repositories/:user/:repoId/objects`,
                                                params: {repoId: repo.name,user},
                                            }}>
                                                <span><img src="/jiaozifs3.png" alt="" />{user+'/'}{repo.name}</span>
                                            </Link>
                            </Col>
                        </Row>
                            )
                        })
                    }
                </div>
            );}
    }else{
        router.push('/login')
    }

};

const Repolistsnav = () =>{
    const [refresh, setRefresh] = useState(false);
  
    return(
        <Row className="sidebar">
        <Form className='flex Fast-navb'>
            <Col className="d-flex">
            <strong style={{marginLeft:'20px',lineHeight:'30px'}}>Top Repositories</strong>           
            </Col>
          <RepositoryList
                    refresh={refresh}
                    />
        </Form>
        </Row>
    );
  }


export default Repolistsnav