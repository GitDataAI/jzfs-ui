import React from "react"
import { cache } from "../../../../lib/api";
import { Link } from "../../../../lib/components/nav";

import { FaCodeBranch } from "react-icons/fa6";


const EntryRow = ({repo, entry}) => {
  const user = cache.get('user')
    
  let button;
    button = (
      <Link 
      href={{
          pathname: '/repositories/:user/:repoId/objects',
          params: {repoId: repo.name,user},
          query: {ref: entry.name}
      }}
      >
          {entry.name}
      </Link>
    )

  return (
    <>
      <tr className='Nav-file'>
        <span>
            <FaCodeBranch />
          {button}
          </span>
      </tr>
    </>
  );
}
export const Objectlist =({entrises,repo})=>{
  
    return (
        <>
        {   
            entrises.results.map((entry)=>{
               return <EntryRow entry={entry} repo={repo} />
            })
        }
        </>
    )
}