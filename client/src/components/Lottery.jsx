import React from 'react'
import { useParams } from 'react-router-dom'

const Lottery = () => {
    const {isOwner} = useParams();

  return (
    <div className='text-white flex flex-col items-center gap-3'>
       <h1 className='text-[50px]'>Lottery Details</h1>
       
       <StatsContainer title={"Participation Fee:"} value={"3 eth"}/>
       <StatsContainer title={"Participant Limit:"} value={"03"}/>
       <StatsContainer title={"Participants Joined:"} value={"01"}/>

       <br/>

       <StatsContainer title={"Winner:"} value={"Null"}/>

       {
        (isOwner) && <button>Announce Winner</button>
       }
    </div>
  )
}

const StatsContainer = ({title, value}) => {
    return <div className='flex gap-4'>
        <h3>{title}</h3>
        <h3 className='text-yellow-400'>{value}</h3>
    </div>
}

export default Lottery