import React, { useEffect, useState } from "react"
import { ProgressBar } from "react-bootstrap";
import { useRouter } from "../../hooks/router";
import { version } from "../../api/interface";
const Loadingpage = ()  =>{
    const router = useRouter()
    const [loading,setLoading] = useState(0)
    const [ver,setVer] = useState({})
    const [isFirstVisit, setIsFirstVisit] = useState(true);

    const getversion = async ()=>{
        const response = await version.getVersion()
        setVer(response.data)
        return response
    }
    const to =  ()=>{
        router.push('/repository')
    }
  useEffect(() => {
    if (localStorage.getItem('hasVisited')) {
        setIsFirstVisit(false)
    }
  }, []);

    useEffect(()=>{
        getversion()
    },[])
    useEffect(()=>{
        if(loading >= 100){
            localStorage.setItem('hasVisited','true')
            setIsFirstVisit(false)
            setTimeout(()=>{
                to()
            },1000)
        }else if(loading<100){
            let randomNum = Math.floor(Math.random() * (5)) + 1;
            setTimeout(()=>{
                setLoading((loading+randomNum)>100 ? 100 :loading+randomNum)
            },1000)
        }
    },[loading])
    if (!isFirstVisit) {
        return (
            <div>
                loading...
            </div>
        );
      }
    return (
        <>
        <div className="welcome">
            <img src="/jiaozifs.png"/>
            <h1>Welcome to JiaoziFS Cloud</h1>
           <code>Get started with a fully functional playground environment and start data versioning at scale today!</code><br/> 
           <code>No deployment, installing, maintaining and scaling overhead.</code>
        </div>
      <div className="Progress">
            <div className="version">{loading>=80?<span>version: {ver.latest_version}</span>:<span>It's getting version from server now</span>}</div>
            <ProgressBar animated now={loading} />
      </div>
      </>
    );
  };
export default Loadingpage