import React, { useEffect, useRef, useState } from 'react'
import Input from './Input';
import Button from './Button';
import StatsContainer from './StatsContainer';
import { ethers } from 'ethers';

const Owner = ({contract}) => {
  const [lotteryCreated, setLotteryCreated] = useState(false);
  const [canAnnounceWinner, setCanAnnounceWinner] = useState(false);
  const [winnerAnnounced, setWinnerAnnounced] = useState(false);

  const joiningFeeInput = useRef(null);
  const participantLimitInput = useRef(null);

  const createLottery = async () => {
    const joinFee = joiningFeeInput.current.value;
    const joinLimit = participantLimitInput.current.value;
    if(joinFee <= 0){
      alert("Join fee should be greater tha 0");
      return;
    }
    if(joinLimit <= 0)
    {
      alert("Participant limit should be greater than 0");
      return;
    }
    const joinFeeInWei = ethers.utils.parseEther(joinFee.toString());
    const transaction = await contract.createLottery(joinFeeInWei, joinLimit);
    const receipt = await transaction.wait();

    if(receipt.status == 1)
    {
      setLotteryCreated(true);
    }
    else
    {
      console.error("Lottery creation failed! " + receipt);
    }
  }
  const announceWinner = async () => {

  }

  useEffect(() => {
    const init = async ()=>{
      if(contract)
      {
        setLotteryCreated(await contract.lotteryCreated());
        setWinnerAnnounced(await contract.winnerAnnounced());

        const joinLimit = (await contract.participantsLimit()).toNumber;
        const participants = await contract.getParticipants();

        setCanAnnounceWinner(participants.length >= joinLimit);
      }
    }

    init();
  },[contract]);

  return (
    <>
        <div className='flex flex-col gap-2 items-center text-white'>
            <h1 className='text-[50px]'>Owner</h1>
            
            {
              !lotteryCreated && (
                <>
                  <Input ref={joiningFeeInput} type={'number'} placeholder={'Enter joining fee'}/>
                  <Input ref={participantLimitInput} type={'number'} placeholder={'Enter Participant Limit'}/>
                  <Button onClick={createLottery} text={'Create Lottery'}/>
                </>
              )
            }
            {
              lotteryCreated && !canAnnounceWinner && (
                <StatsContainer title={"Wait for all the participants to join!"}/>
              )
            }
            {
              lotteryCreated && canAnnounceWinner && !winnerAnnounced && (
                <Button onClick={announceWinner} text={'Announce Winner'}/>
              )
            }
            {
              lotteryCreated && canAnnounceWinner && winnerAnnounced && (
                <StatsContainer title={"Winner Announced! "} value={"Check Lottery Stats"} />
              )
            }
        </div>
    </>
  )
}

export default Owner