import React from "react"
import { cache } from "../../../../lib/api";
import { Link } from "../../../../lib/components/nav";

import { RiGitRepositoryCommitsLine } from "react-icons/ri";


const EntryRow = ({repo, reference, entry}) => {

    
    
  
    const user = cache.get('user')
    
    let button;
      button = (
        <Link
        href={
          {
          pathname: '/repositories/:user/:repoId/commits/:commitId',
          params: {repoId: repo.name, commitId: entry.hash,user},
          query:{ref:reference.name,basedhash:entry.parent_hashes[0],message:entry.message,committer:entry.committer.name,commitDate:entry.committer.when
          }
      }}
      >
          {entry.message}
        </Link>
      )
  
    return (
      <>
        <tr className='Nav-file'>
          <span>
              <RiGitRepositoryCommitsLine />
            {button}
            </span>
        </tr>
      </>
    );
  }
export const Commitslist =({entrises,repo,reference})=>{

    return (
        <>
        {   
            entrises.map((entry)=>{
               return <EntryRow entry={entry} repo={repo} reference={reference} />
            })
        }
        </>
    )
}