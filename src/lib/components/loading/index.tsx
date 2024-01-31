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

  useEffect(() => {
    if (localStorage.getItem('hasVisited')) {
        setIsFirstVisit(false)
    }else{
        localStorage.setItem('hasVisited','false')
    }
  }, []);

    useEffect(()=>{
        getversion()
    },[])
    useEffect(()=>{
        if(loading == 100){
            setTimeout(()=>{
                router.push('/repository')
                setLoading(100)
            },3000)
        }else if(ver.api_version){
            setLoading(100)
        }else if(loading<100){
            let randomNum = Math.floor(Math.random() * (3)) + 1;
            setTimeout(()=>{
                setLoading((loading+randomNum)>100 ? 100 :loading+randomNum)
            },500)
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
            <img src="/pub/jiaozifs.png"/>
            <h1>Welecome to Jiazozi FS Cloud</h1>
           <h2><code>For data security, please be patient and wait for the environment check to complete.</code></h2>
        </div>
      <div className="Progress">
            {ver?<strong className="version">version:{ver.api_version}</strong>:<strong className="version">It's getting version from server now</strong>}
            <ProgressBar animated now={loading} />
      </div>
      </>
    );
  };
export default Loadingpage