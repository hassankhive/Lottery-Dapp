import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import StatsContainer from './StatsContainer';
import Participant from './Participant';
import { ethers } from 'ethers';

const Lottery = ({contract}) => {
  const [isOwner, setIsOwner] = useState(false);
  const [joinFee, setJoinFee] = useState(0);
  const [joinLimit, setJoinLimit] = useState(0);
  const [participants, setParticipants] = useState([]);
  const [participantCount, setParticipantCount] = useState(0);
  const [winner, setWinner] = useState('');

  useEffect(() => {
    const Init = async () => {
      setIsOwner(await contract.isOwner());

      const fee = ethers.utils.formatEther(ethers.BigNumber.from(await contract.joiningFee()));
      const limit = await contract.participantsLimit();
      setJoinFee(fee);
      setJoinLimit(limit.toNumber());
      setParticipantCount((await contract.getParticipantsCount()).toNumber());
      
      const winnerAnnounced = await contract.winnerAnnounced();
      if(winnerAnnounced)setWinner(await contract.getWinner());
      if(isOwner) setParticipants(await contract.getParticipants());
    }

    if(contract) Init();
  }, [contract, isOwner]);

  return (
    <div className='text-white flex flex-col items-center gap-3'>
       <h1 className='text-[50px]'>Lottery Details</h1>
       
       <StatsContainer title={"Winner:"} value={winner}/>

       <br/>
       
       <StatsContainer title={"Participation Fee:"} value={joinFee + " eth"}/>
       <StatsContainer title={"Participant Limit:"} value={joinLimit}/>
       <StatsContainer title={"Participants Joined:"} value={participantCount}/>

       <br/>

       {
        isOwner && (
          <>
            <h1 className='text-[30px]'>Participants</h1>
            {
              participants.map((participant, index) => {
                return <StatsContainer key={index} title={`Participant ${index} : `} value={participant}/>
              })
            }
          </>
        )
       }
    </div>
  )
}

export default Lottery