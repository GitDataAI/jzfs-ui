import React, { useEffect } from 'react';
import {IndexPage} from './pages';

function App() {
  useEffect(()=>{
    return(()=>{
      console.log('testing');
      
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
