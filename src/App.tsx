import React, { useEffect } from 'react';
import {IndexPage} from './pages';

function App() {
  useEffect(()=>{
    return(()=>{      
      localStorage.removeItem('hasVisited')
    })
  },[])
  
  return (
    <>
    <IndexPage />
    </>
  )
}

export default App
